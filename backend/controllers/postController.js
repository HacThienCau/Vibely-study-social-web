const { uploadFileToCloudinary } = require("../config/cloudinary");
const Post = require("../model/Post");
const response = require("../utils/responseHandler");

const createPost = async (req, res) => {
    try {
        const userId = req.user.userId;        
        const { content } = req.body;
        const file = req.file;
        let mediaUrl = null;
        let mediaType = null;

        // Kiểm tra nếu có file thì upload lên Cloudinary
        if (file) {
            const uploadResult = await uploadFileToCloudinary(file);
            if (!uploadResult || !uploadResult.secure_url) {
                return response(res, 400, "Lỗi khi tải lên tệp.");
            }

            mediaUrl = uploadResult.secure_url;
            mediaType = file.mimetype.startsWith("video") ? "video" : "image";
        }

        // Tạo bài viết mới với các thông số ban đầu
        const newPost = new Post({
            user: userId,
            content,
            mediaUrl,
            mediaType,
            reactionCount: 0,
            commentCount: 0,
            shareCount: 0,
            reactionStats: {
                like: 0,
                love: 0,
                haha: 0,
                wow: 0,
                sad: 0,
                angry: 0
            }
        });

        await newPost.save();
        return response(res, 201, "Tạo bài viết thành công", newPost);

    } catch (error) {
        console.error("Lỗi khi tạo bài viết:", error);
        return response(res, 500, "Tạo bài viết thất bại", error.message);
    }
};

//Lấy tất cả bài viết
const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
        .sort({ createdAt: -1 })
        .populate("user", "_id username profilePicture email")
        .populate({
            path: 'comments.user',
            select: 'username profilePicture'
        })
        return response(res, 200, "Lấy tất cả bài viết thành công", posts);
    } catch (error) {
        console.error("Lỗi khi lấy tất cả bài viết:", error);
        return response(res, 500, "Lấy tất cả bài viết thất bại", error.message);
    }
};

//Lấy bài viết theo ID người dùng
const getPostByUserId = async (req, res) => {
    const userId = req.params.id;
    try{
        if (!userId) {
            return response(res, 400, "Yêu cầu mã người dùng để lấy bài viết");
        }
        const posts = await Post.find({ user: userId })
        .sort({ createdAt: -1 })
        .populate("user", "_id username profilePicture email")
        .populate({
            path: 'comments.user',
            select: 'username profilePicture'
        })
        return response(res, 200, "Lấy bài viết theo ID người dùng thành công", posts);
    }
    catch (error) {
        console.error("Lỗi khi lấy bài viết theo ID người dùng:", error);
        return response(res, 500, "Lấy bài viết theo ID người dùng thất bại", error.message);
    }
}

// React bài viết
const reactPost = async (req, res) =>
{
    const {postId} = req.params;
    const userId = req.user.userId;
    const {type} = req.body;
    try{
        const post = await Post.findById(postId);
        if(!post) return response(res, 404, "Không tìm thấy bài viết");
            // Tìm reaction của user nếu có
            const existingReactionIndex = post.reactions.findIndex(r => r.user.toString() === userId);
            let action = "";
    
            if (existingReactionIndex !== -1) {
                // Nếu đã react, kiểm tra loại reaction
                const existingReaction = post.reactions[existingReactionIndex];
    
                if (existingReaction.type === type) {
                    // Nếu reaction giống nhau => bỏ reaction
                    post.reactions.splice(existingReactionIndex, 1);
                    post.reactionStats[type] = Math.max(0, post.reactionStats[type] - 1);
                    action = "Bỏ reaction thành công";
                } else {
                    // Nếu khác => đổi sang loại mới
                    post.reactionStats[existingReaction.type] = Math.max(0, post.reactionStats[existingReaction.type] - 1);
                    post.reactions[existingReactionIndex].type = type;
                    post.reactionStats[type] += 1;
                    action = "Cập nhật reaction thành công";
                }
            } else {
                // Nếu chưa react => thêm mới
                post.reactions.push({ user: userId, type });
                post.reactionStats[type] += 1;
                action = "Thêm reaction thành công";
            }
    
            const updatedPost = await post.save();
            return response(res, 200, action, updatedPost);
    }
    catch(error) {
        console.error("Lỗi khi thích bài viết:", error);
        return response(res, 500, "Thích bài viết thất bại", error.message);
    }
}

//Bình luận bài viết
const addCommentToPost = async (req, res) => {
    const { postId } = req.params;
    const userId = req.user.userId;
    const { text } = req.body;

    try {
        const post = await Post.findById(postId);
        if (!post) return response(res, 404, "Không tìm thấy bài viết");

        post.comments.push({ user: userId, text });
        post.commentCount += 1;

        await post.save();
        return response(res, 201, "Bình luận bài viết thành công", post);
    } catch (error) {
        console.error("Lỗi khi bình luận bài viết:", error);
        return response(res, 500, "Bình luận bài viết thất bại", error.message);
    }
};

//Chia sẻ bài viết
const sharePost = async (req, res) => {
    const { postId } = req.params;
    const userId = req.user.userId;

    try {
        const post = await Post.findById(postId);
        if (!post) return response(res, 404, "Không tìm thấy bài viết");

       const hasShared = post.share.includes(userId);
       if (!hasShared) {
           post.share.push(userId);
       }
       post.shareCount += 1;
       await post.save();
       return response(res, 200, "Chia sẻ bài viết thành công", post);
    } catch (error) {
        console.error("Lỗi khi chia sẻ bài viết:", error);
        return response(res, 500, "Chia sẻ bài viết thất bại", error.message);
    }
}

module.exports = { createPost, getAllPosts, getPostByUserId, reactPost, addCommentToPost, sharePost };
