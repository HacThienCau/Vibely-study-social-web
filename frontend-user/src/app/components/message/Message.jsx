import axios from "axios";
import { useEffect, useState } from "react";
import { format, register } from "timeago.js";
import vi from "timeago.js/lib/lang/vi";
import "./message.css";

register("vi", vi);

export default function Message({ message, own }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.post(
          "https://vibely-study-social-web.onrender.com/users/get-users",
          { userIds: [message.sender] },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (res.data.data.length > 0) {
          setUser(res.data.data[0]);
        }
      } catch (err) {
        console.error("❌ Lỗi khi lấy thông tin người gửi tin nhắn:", err);
      }
    };

    if (message.sender) getUser();
  }, [message.sender]);

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        {!own && 
          <img
            src={user?.profilePicture || "/images/user_default.jpg"}
            alt="avatar"
            className="messageImg"
          />
        }
        <p className="messageText">{message.text}</p>
      </div>
      <div className={`messageBottom ${!own ? "ml-11" : ""}`}>{format(message.createdAt, "vi")}</div>
    </div>
  );
}
