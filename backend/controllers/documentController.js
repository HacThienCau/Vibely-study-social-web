const Document = require("../model/Document");
const Level = require("../model/Level");
const Subject = require("../model/Subject");
const response = require("../utils/responseHandler");
const User = require("../model/User");

// Tạo cấp học (Level)
const createLevel = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) return response(res, 400, "Tên cấp học không được để trống");

        const existingLevel = await Level.findOne({ name });
        if (existingLevel) return response(res, 400, "Cấp học này đã tồn tại");

        const newLevel = new Level({ name });
        await newLevel.save();
        return response(res, 201, "Tạo cấp học thành công", newLevel);
    } catch (error) {
        console.error("Lỗi khi tạo cấp học:", error);
        return response(res, 500, "Lỗi khi tạo cấp học", error.message);
    }
};

// Tạo môn học (Subject)
const createSubject = async (req, res) => {
    try {
        const { name, levelId } = req.body;
        if (!name || !levelId) return response(res, 400, "Tên môn học và cấp học là bắt buộc");

        const level = await Level.findById(levelId);
        if (!level) return response(res, 404, "Không tìm thấy cấp học");

        const existingSubject = await Subject.findOne({ name, level: levelId });
        if (existingSubject) return response(res, 400, "Môn học này đã tồn tại cho cấp học này");

        const newSubject = new Subject({ name, level: levelId });
        await newSubject.save();
        return response(res, 201, "Tạo môn học thành công", newSubject);
    } catch (error) {
        console.error("Lỗi khi tạo môn học:", error);
        return response(res, 500, "Lỗi khi tạo môn học", error.message);
    }
};

// Tạo tài liệu mới
const createDocument = async (req, res) => {
    try {
        const { level, subject, ...documentData } = req.body;

        const levelDoc = await Level.findById(level);
        if (!levelDoc) return response(res, 400, "Cấp học không hợp lệ");

        const subjectDoc = await Subject.findById(subject);
        if (!subjectDoc) return response(res, 400, "Môn học không hợp lệ");

        const newDocument = new Document({
            ...documentData,
            level: levelDoc._id,
            subject: subjectDoc._id
        });

        await newDocument.save();

        // Populate thêm thông tin `name` của level và subject
        const populatedDocument = await Document.findById(newDocument._id)
            .populate("level", "name")
            .populate("subject", "name");
        
        return response(res, 201, "Tạo tài liệu thành công", populatedDocument);
    } catch (error) {
        console.error("Lỗi khi tạo tài liệu:", error);
        return response(res, 400, "Tạo tài liệu thất bại", error.message);
    }
};

// Lấy danh sách cấp học
const getLevels = async (req, res) => {
    try {
        const levels = await Level.find().select("name");
        return response(res, 200, "Lấy danh sách cấp học thành công", levels);
    } catch (error) {
        console.error("Lấy danh sách cấp học thất bại:", error);
        return response(res, 500, "Lấy danh sách cấp học thất bại", error.message);
    }
};

// Lấy danh sách môn học theo cấp học
const getSubjectsByLevel = async (req, res) => {
    try {
        const { levelId } = req.params;
        const subjects = await Subject.find({ level: levelId }).select("name");

        return response(res, 200, "Lấy danh sách môn học thành công", subjects);
    } catch (error) {
        console.error("Lấy danh sách môn học thất bại:", error);
        return response(res, 500, "Lấy danh sách môn học thất bại", error.message);
    }
};

// Lấy danh sách tài liệu theo điều kiện lọc
const getFilteredDocuments = async (req, res) => {
    try {
        const { query, level, subject } = req.query;
        let filter = {};

        if (level && level !== "Tất cả các cấp") filter.level = level;
        if (subject && subject !== "Tất cả các môn") filter.subject = subject;
        if (query) filter.title = { $regex: query, $options: "i" };

        const documents = await Document.find(filter)
            .populate("level", "name")
            .populate("subject", "name");

        return response(res, 200, "Lấy danh sách tài liệu thành công", documents);
    } catch (error) {
        console.error("Lỗi khi lấy danh sách tài liệu:", error);
        return response(res, 500, "Lấy danh sách tài liệu thất bại", error.message);
    }
};


// Lấy tài liệu theo ID
const getDocumentById = async (req, res) => {
    try {
        const document = await Document.findById(req.params.id)
            .populate("level", "name")
            .populate("subject", "name");

        if (!document) return response(res, 404, "Không tìm thấy tài liệu");

        return response(res, 200, "Lấy tài liệu theo ID thành công", document);
    } catch (error) {
        console.error("Lấy tài liệu thất bại:", error);
        return response(res, 500, "Lấy tài liệu thất bại", error.message);
    }
};

// Cập nhật tài liệu
const updateDocument = async (req, res) => {
    try {
        const { level, subject, ...updateData } = req.body;

        if (level) {
            const levelDoc = await Level.findById(level);
            if (!levelDoc) return response(res, 400, "Cấp học không hợp lệ");
            updateData.level = levelDoc._id;
        }

        if (subject) {
            const subjectDoc = await Subject.findById(subject);
            if (!subjectDoc) return response(res, 400, "Môn học không hợp lệ");
            updateData.subject = subjectDoc._id;
        }

        const updatedDocument = await Document.findByIdAndUpdate(req.params.id, updateData, { new: true })
            .populate("level", "name")
            .populate("subject", "name");

        if (!updatedDocument) return response(res, 404, "Không tìm thấy tài liệu");

        return response(res, 200, "Cập nhật tài liệu thành công", updatedDocument);
    } catch (error) {
        console.error("Cập nhật tài liệu thất bại:", error);
        return response(res, 500, "Cập nhật tài liệu thất bại", error.message);
    }
};

// Xóa tài liệu
const deleteDocument = async (req, res) => {
    try {
        const deletedDocument = await Document.findByIdAndDelete(req.params.id);
        if (!deletedDocument) return response(res, 404, "Không tìm thấy tài liệu");

        return response(res, 200, "Xóa tài liệu thành công");
    } catch (error) {
        console.error("Xóa tài liệu thất bại:", error);
        return response(res, 500, "Xóa tài liệu thất bại", error.message);
    }
};

// Lưu tài liệu
const saveDocument = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { documentId } = req.body;

        if (!documentId) {
            return res.status(400).json({ message: "Thiếu documentId" });
        }

        // Tìm user theo ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Người dùng không tồn tại" });
        }

        // Kiểm tra nếu tài liệu đã được lưu
        if (user.savedDocuments.includes(documentId)) {
            return res.status(400).json({ message: "Tài liệu đã được lưu trước đó" });
        }

        // Thêm documentId vào danh sách savedDocuments
        user.savedDocuments.push(documentId);
        await user.save();

        res.status(200).json({ message: "Lưu tài liệu thành công", savedDocuments: user.savedDocuments });
    } catch (error) {
        console.error("Lỗi khi lưu tài liệu:", error);
        res.status(500).json({ message: "Lỗi server" });
    }
};

module.exports = {
    getFilteredDocuments,
    createDocument,
    getDocumentById,
    updateDocument,
    deleteDocument,
    getLevels,
    getSubjectsByLevel,
    createLevel,
    createSubject,
    saveDocument
};