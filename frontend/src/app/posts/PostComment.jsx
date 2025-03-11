import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatedDate } from "@/lib/utils";
import userStore from "@/store/userStore";
import { ChevronDown, ChevronUp, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

function PostComment({ comment, onReply }) {
  const [showAllReplies, setShowAllReplies] = useState(false); //xem tất cả/2 cái đầu
  const [showReplies, setShowReplies] = useState(false); //mở xem replies
  const [replyText, setReplyText] = useState("");
  const { user } = userStore();
  const replyInputRef = useRef(null);
  const visibleReplies = showAllReplies
    ? comment?.replies
    : comment?.replies?.slice(0, 2);
  const userPlaceholder = user?.username
    ?.split(" ")
    .map((name) => name[0])
    .join(""); // tên người dùng viết tắt
  const handleReplySubmit = async () => {
    if (replyText.trim()) {
      console.log("PostComment/handleReplySubmit: ", replyText);
      onReply(replyText);
      setReplyText("");
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/*Nội dung bình luận */}
      <div className="flex items-start space-x-2 mb-2 w-full">
        <Avatar className="h-8 w-8">
          {comment?.user?.profilePicture ? (
            <AvatarImage
              src={comment?.user?.profilePicture}
              alt={comment?.user?.username}
            />
          ) : (
            <AvatarFallback className="bg-gray-200">
              {comment?.user?.username
                ?.split(" ")
                .map((name) => name[0])
                .join("")}
            </AvatarFallback>
          )}
        </Avatar>
        <div className="flex flex-col">
          <div className="bg-[#F0F2F5] rounded-lg px-3 py-2">
            <p className="font-semibold text-[13px]">
              {comment?.user?.username}
            </p>
            <p className="text-[15px]">{comment?.text}</p>
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <Button
              variant="ghost"
              size="sm"
              className="px-2 hover:underline"
              onClick={() => {}}
            >
              Thích
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="px-2 hover:underline"
              onClick={() => setShowReplies(!showReplies)}
            >
              Phản hồi
            </Button>
            <span className="px-2 hover:underline">
              {formatedDate(comment?.createdAt)}
            </span>
          </div>
          <div
            className="font-semibold text-[13px] text-gray-500 px-2 hover:underline cursor-pointer"
            onClick={() => setShowReplies(!showReplies)}
          >
            {comment.replies.length > 0
              ? !showReplies
                ? "Hiện tất cả " + comment.replies.length + " phản hồi"
                : "Ẩn phản hồi"
              : null}
          </div>
        </div>
      </div>
      {/*Nội dung phản hồi */}
      {showReplies && (
        <div>
          {visibleReplies?.map((reply, index) => (
            <div
              key={index}
              className="flex items-start space-x-2 mt-2 ml-10 w-3/4"
            >
              <Avatar className="h-8 w-8">
                {reply.user?.profilePicture ? (
                  <AvatarImage
                    src={reply.user?.profilePicture}
                    alt={reply?.user?.username}
                  />
                ) : (
                  <AvatarFallback className="bg-gray-200">
                    {reply?.user?.username
                      ?.split(" ")
                      .map((name) => name[0])
                      .join("")}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="flex flex-col">
                <div className="bg-[#F0F2F5] rounded-lg px-3 py-2">
                  <p className="font-semibold text-[13px]">
                    {reply?.user?.username}
                  </p>
                  <p className="text-[15px]">{reply?.text}</p>
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="px-2 hover:underline"
                    onClick={() => {}}
                  >
                    Thích
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="px-2 hover:underline"
                    onClick={() => {}}
                  >
                    Phản hồi
                  </Button>
                  <span className="px-2 hover:underline">
                    {formatedDate(comment?.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          ))}
           {comment?.replies?.length > 2 && (
                    <p
                        className="font-semibold text-[13px] text-gray-500 px-2 hover:underline cursor-pointer ml-10"
                        onClick={() => setShowAllReplies(!showAllReplies)}
                    >
                        {showAllReplies ? (
                            <>Rút gọn <ChevronUp className="ml-2 h-4 w-4" /></>
                        ) : (
                            <>Tất cả phản hồi <ChevronDown className="ml-2 h-4 w-4" /></>
                        )}
                    </p>
                )}
          {/*Viết phản hồi */}
          <div className="flex items-center space-x-2 w-2/3 mb-4 ml-10">
            <Avatar className="w-8 h-8">
              {user?.profilePicture ? (
                <AvatarImage src={user?.profilePicture} alt={user?.username} />
              ) : (
                <AvatarFallback className="bg-gray-200">
                  {userPlaceholder}
                </AvatarFallback>
              )}
            </Avatar>
            <Input
              placeholder="Viết phản hồi..."
              className="flex-grow cursor-poiter rounded-full h-12"
              value={replyText}
              ref={replyInputRef}
              onChange={(e) => setReplyText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleReplySubmit()}
            />
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-transparent"
              onClick={handleReplySubmit}
            >
              <Send
                className="text-[#086280]"
                style={{ width: "20px", height: "20px" }}
              />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostComment;
