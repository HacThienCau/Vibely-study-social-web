const { uploadFileToCloudinary } = require("../config/cloudinary");
const User = require("../model/User");
const Bio = require("../model/UserBio");
const response = require("../utils/responseHandler");



// const createOrUpdateUserBio = async(req,res) =>{
//     try {
//         const {userId} = req.params;
//         const {bioText,liveIn,relationship,workplace,education,phone,hometown} = req.body;

//         let bio = await Bio.findOneAndUpdate(
//             {user:userId},
//             {
//                 bioText,
//                 liveIn,
//                 relationship,
//                 workplace,
//                 education,
//                 phone,
//                 hometown
//             },
//             {new : true, runValidators:true},
//         )

//         // Nếu không có thông tin bio thì tạo mới
//         if(!bio){
//             bio = new Bio({
//                 user:userId,
//                 bioText,
//                 liveIn,
//                 relationship,
//                 workplace,
//                 education,
//                 phone,
//                 hometown
//             })

//             await bio.save();
//             await User.findByIdAndUpdate(userId,{bio: bio._id})
//         }

//         return response(res,201, 'Tạo mới hoặc cập nhật tiểu sử thành công',bio)

//     } catch (error) {
//         console.log(error)
//         return response(res,500,'Lỗi máy chủ nội bộ',error.message)
//     }
// }

const createOrUpdateUserBio = async(req,res) =>{
    try {
        const {userId} = req.params;
        const {motto,liveIn,workplace,education,hometown} = req.body;

        let bio = await Bio.findOneAndUpdate(
            {user:userId},
            {
                motto,
                liveIn,
                workplace,
                education,
                hometown
            },
            {new : true, runValidators:true},
        )

        // Nếu không có thông tin bio thì tạo mới
        if(!bio){
            bio = new Bio({
                user:userId,
                motto,
                liveIn,
                workplace,
                education,
                hometown
            })

            await bio.save();
            await User.findByIdAndUpdate(userId,{bio: bio._id})
        }

        return response(res,201, 'Tạo mới hoặc cập nhật tiểu sử thành công',bio)

    } catch (error) {
        console.log(error)
        return response(res,500,'Lỗi máy chủ nội bộ',error.message)
    }
}

const updateCoverPicture = async(req, res) =>{
    try {
        const {userId} = req.params;
        const file = req.file;
        let coverPicture = null;

        if(file){
            const uploadResult = await uploadFileToCloudinary(file)
            coverPicture = uploadResult.secure_url
        }

        if(!coverPicture){
            return response(res,400, 'Không thể tải ảnh bìa lên')
        }

        // Cập nhật ảnh bìa cho người dùng
        await User.updateOne(
            {_id:userId},
            {
                $set:{
                    coverPicture,
                },
            }
        )
        const updateUser = await User.findById(userId)

        if(!updateUser){
           return response(res,404, 'Không tồn tại người dùng với id này')
        }

        return response(res,200, 'Cập nhật ảnh bìa thành công',updateUser)
    } catch (error) {
        console.log(error)
        return response(res,500,'Lỗi máy chủ nội bộ',error.message)
    }
}



const updateUserProfile = async(req, res) =>{
    try {
        const {userId} = req.params;
        const {username,gender,dateOfBirth} = req.body;
        const file = req.file;
        let profilePicture = null;

        if(file){
            const uploadResult = await uploadFileToCloudinary(file)
            profilePicture = uploadResult.secure_url
        }

       

        // Cập nhật hồ sơ người dùng với ảnh đại diện
        await User.updateOne(
            {_id:userId},
            {
                $set:{
                    username,
                    gender,
                    dateOfBirth,
                    ...(profilePicture && {profilePicture})
                },
            }
        )

        const updateUser = await User.findById(userId)

        if(!updateUser){
            return response(res,404, 'Không tồn tại người dùng với id này')
        }

        return response(res,200, 'Cập nhật hồ sơ người dùng thành công',updateUser)
    } catch (error) {
        console.log(error)
        return response(res,500,'Lỗi máy chủ nội bộ',error.message)
    }
}

module.exports= {
    createOrUpdateUserBio,
    updateCoverPicture,
    updateUserProfile
}