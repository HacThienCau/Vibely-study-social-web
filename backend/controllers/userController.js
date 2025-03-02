const User = require("../model/User");
const response = require("../utils/responseHandler");

// Theo dõi người dùng
const followUser =  async(req,res) =>{
    const {userIdToFollow} = req.body;
    const userId = req?.user?.userId;

    //Ngăn người dùng theo dõi chính mình
    if(userId === userIdToFollow){
        return response(res,400,'Bạn không được phép theo dõi chính mình');
    }
    try {
        const userToFollow = await User.findById(userIdToFollow)
        const currentUser = await User.findById(userId);

        // Kiểm tra cả hai người dùng có tồn tại trong cơ sở dữ liệu không
        if(!userToFollow || !currentUser){
            return response(res,404,'Người dùng không tồn tại')
        }

        // Kiểm tra xem currentUser đã theo dõi userToFollow chưa
        if(currentUser.followings.includes(userIdToFollow)){
            return response(res,404, 'Bạn đã theo dõi người dùng này');
        }

        // Thêm người dùng vào danh sách theo dõi của người dùng hiện tại
        currentUser.followings.push(userIdToFollow);

        // Thêm id currentUser vào danh sách người theo dõi của userToFollow
        userToFollow.followers.push(currentUser)

        // Cập nhật số lượng người theo dõi và người đang theo dõi
        currentUser.followingCount +=1;
        userToFollow.followerCount +=1;

        // Lưu thay đổi của currentUser và userToFollow
        await currentUser.save()
        await userToFollow.save()
        
        return response(res,200,'Theo dõi người dùng thành công')

    } catch (error) {
        return response(res, 500, 'Lỗi máy chủ nội bộ', error.message)
    }
}

// Bỏ theo dõi người dùng
const unfollowUser =  async(req,res) =>{
    const {userIdToUnfollow} = req.body;
    const userId = req?.user?.userId;

    //Ngăn người dùng bỏ theo dõi chính mình
    if(userId === userIdToUnfollow){
        return response(res,400,'Bạn không được phép bỏ theo dõi chính mình');
    }
    try {
        const userToUnfollow = await User.findById(userIdToUnfollow)
        const currentUser = await User.findById(userId);

        // Kiểm tra cả hai người dùng có tồn tại trong cơ sở dữ liệu không
        if(!userToUnfollow || !currentUser){
            return response(res,404,'Người dùng không tồn tại')
        }

        // Kiểm tra xem currentUser đã theo dõi userToUnfollow chưa
        if(!currentUser.followings.includes(userIdToUnfollow)){
            return response(res,404, 'Bạn chưa theo dõi người dùng này');
        }

        // Xóa người dùng khỏi danh sách theo dõi và cập nhật số lượng người theo dõi
        currentUser.followings = currentUser.followings.filter(id => id.toString() !== userIdToUnfollow)
        userToUnfollow.followers = userToUnfollow.followers.filter(id => id.toString() !== userId)

        // Cập nhật số lượng người theo dõi và người đang theo dõi
        currentUser.followingCount -=1;
        userToUnfollow.followerCount -=1;

        // Lưu thay đổi của currentUser và userToUnfollow
        await currentUser.save()
        await userToUnfollow.save()
        
        return response(res,200,'Bỏ theo dõi người dùng thành công')

    } catch (error) {
        return response(res, 500, 'Lỗi máy chủ nội bộ', error.message)
    }
}

// Xóa lời mời kết bạn
const deleteUserFromRequest = async (req, res) => {
    try {
        const loggedInUserId = req.user.userId;
        const {requestSenderId} = req.body;

        const requestSender = await User.findById(requestSenderId)
        const loggedInUser = await User.findById(loggedInUserId);

        // Kiểm tra xem requestSender và loggedInUser có tồn tại không
        if(!requestSender || !loggedInUser){
            return response(res,404,'Người dùng không tồn tại')
        }

        // Kiểm tra xem người gửi yêu cầu có theo dõi người đăng nhập không
        const isRequestSend = requestSender.followings.includes(loggedInUserId)

        if(!isRequestSend){
            return response(res, 404, 'Không tìm thấy yêu cầu kết bạn')
        }

        // Xóa id của người đăng nhập khỏi danh sách theo dõi của người gửi yêu cầu
        requestSender.followings = requestSender.followings.filter(user => user.toString() !== loggedInUserId)

        // Xóa id người gửi yêu cầu khỏi danh sách người theo dõi của người đăng nhập
        loggedInUser.followers = loggedInUser.followers.filter(user => user.toString() !== requestSenderId)

        // Cập nhật số lượng người theo dõi và người đang theo dõi
        loggedInUser.followerCount = loggedInUser.followers.length;
        requestSender.followingCount= requestSender.followings.length
        
        // Lưu thay đổi của 2 người dùng
        await loggedInUser.save()
        await requestSender.save()

        return response(res,200,`Lời mời kết bạn từ ${requestSender.username} đã bị xóa`)

    } catch (error) {
        return response(res, 500, 'Lỗi máy chủ nội bộ', error.message)
    }
}

// Lấy tất cả lời mời kết bạn của người dùng
const getAllFriendsRequest = async (req, res) => {
    try {
        const loggedInUserId = req.user.userId;

        // Tìm người dùng đăng nhập và lấy danh sách người theo dõi và người đang theo dõi của họ
        const loggedInUser = await User.findById(loggedInUserId).select('followers followings')
        if(!loggedInUser){
            return response(res, 404, 'Người dùng không tồn tại')
        }

        // Tìm người dùng theo dõi người dùng đăng nhập nhưng không được theo dõi lại
        const userToFollowBack = await User.find({
            _id:{
                $in:loggedInUser.followers, // người theo dõi người đăng nhập
                $nin: loggedInUser.followings // trừ người đã được người đăng nhập theo dõi lại
            }
        }).select('username profilePicture email followerCount');

        return response(res,200, 'Lấy tất cả lời mời kết bạn thành công', userToFollowBack)

    } catch (error) {
        return response(res, 500, 'Lỗi máy chủ nội bộ', error.message)
    }
}

// Lấy tất cả đề xuất kết bạn của người dùng
const getAllUserForRequest = async (req, res) => {
    try {
        const loggedInUserId = req.user.userId;

        // Tìm người dùng đăng nhập và lấy danh sách người theo dõi và người đang theo dõi của họ
        const loggedInUser = await User.findById(loggedInUserId).select('followers followings')
        if(!loggedInUser){
            return response(res, 404, 'Người dùng không tồn tại')
        }

        // Tìm người dùng không phải là người theo dõi hoặc người đang theo dõi của người dùng đăng nhập
        const userForFriendRequest = await User.find({
            _id:{
                $ne:loggedInUser, // không phải là người đăng nhập
                $nin: [...loggedInUser.followings, ...loggedInUser.followers] // loại trừ cả hai danh sách
            }
        }).select('username profilePicture email followerCount');

        return response(res,200, 'Lấy tất cả đề xuất kết bạn thành công', userForFriendRequest)

    } catch (error) {
        return response(res, 500, 'Lỗi máy chủ nội bộ', error.message)
    }
}

// Xây dựng API để lấy danh sách bạn chung
const getAllMutualFriends = async (req, res) => {
    try {
        const loggedInUserId = req.user.userId;

        // Tìm người dùng đăng nhập và lấy danh sách người theo dõi và người đang theo dõi của họ
        const loggedInUser = await User.findById(loggedInUserId)
        .select('followers followings')
        .populate('followings', 'username profilePicture email followerCount followingCount')
        .populate('followers','username profilePicture email followerCount followingCount')

        if(!loggedInUser){
           return response(res, 404, 'Người dùng không tồn tại')
        }

        // Tạo một tập hợp id người dùng mà người đăng nhập đang theo dõi
        const followingUserId = new Set(loggedInUser.followings.map(user => user._id.toString()))

        // Lọc người theo dõi của người đăng nhập để chỉ lấy những người được theo dõi bởi người đăng nhập
        const mutualFriends = loggedInUser.followers.filter(follower => 
            followingUserId.has(follower._id.toString())
        )

        return response(res,200, 'Lấy danh sách bạn chung thành công', mutualFriends)

   } catch (error) {
        return response(res, 500, 'Lỗi máy chủ nội bộ', error.message)
   }
}

// Lấy tất cả người dùng để tìm kiếm hồ sơ
const getAllUser = async(req, res) =>{
    try {
        const users = await User.find().select('username profilePicture email followerCount')
        return response(res,200, 'Lấy tất cả người dùng thành công',users)
    } catch (error) {
        return response(res, 500, 'Lỗi máy chủ nội bộ', error.message)
    }
}

// Kiểm tra xem người dùng đã đăng nhập chưa
const checkUserAuth = async(req, res) =>{
    try {
        const userId = req?.user?.userId;
        if(!userId) return response(res,404, 'Chưa xác thực! Vui lòng đăng nhập trước khi truy cập vào dữ liệu')

        // Nạp thông tin người dùng và loại bỏ thông tin nhạy cảm
        const user = await User.findById(userId).select('-password');
        if(!user) return response(res,403, 'Người dùng không tồn tại')

        return response(res,201, 'Người dùng đã đăng nhập', user)
    } catch (error) {
        return response(res, 500, 'Lỗi máy chủ nội bộ', error.message)
    }
}

// Lấy thông tin hồ sơ người dùng
const getUserProfile = async(req, res) =>{
    try {
        const {userId} = req.params;
        const loggedInUserId = req?.user?.userId

        // Nạp thông tin người dùng và loại bỏ thông tin nhạy cảm
        const userProfile = await User.findById(userId).select('-password');

        if(!userProfile) return response(res,403, 'Người dùng không tồn tại')

        const isOwner = loggedInUserId === userId;

        return response(res,201, 'Lấy hồ sơ người dùng thành công', {profile:userProfile,isOwner})
    } catch (error) {
        return response(res, 500, 'Lỗi máy chủ nội bộ', error.message)
    }
}


module.exports = {
    followUser,
    unfollowUser,
    deleteUserFromRequest,
    getAllFriendsRequest,
    getAllUserForRequest,
    getAllMutualFriends,
    getAllUser,
    checkUserAuth,
    getUserProfile
}
