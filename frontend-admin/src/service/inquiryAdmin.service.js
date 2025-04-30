import axiosInstance from './urlAdmin.service';

// Lấy danh sách câu hỏi từ người dùng
export const getInquiries = async (query = '', status = '') => {
    try {
        let url = `/admin/inquiry?`;
        if (query) url += `query=${query}&`;
        if (status) url += `status=${status}`;

        const response = await axiosInstance.get(url);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Lấy chi tiết câu hỏi từ người dùng theo ID
export const updateInquiry = async (inquiryId, data) => {
    try {
        const response = await axiosInstance.put(
            `/admin/inquiry/${inquiryId}`,
            data
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Xóa câu hỏi từ người dùng theo ID
export const deleteInquiry = async (inquiryId) => {
    try {
        const response = await axiosInstance.delete(
            `/admin/inquiry/${inquiryId}`
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}; 