import React from 'react'
import './message.css';

export default function Message({own}) {
  return (
    <div className={own ? "message own" : "message"}>
        <div className="messageTop">
            <img src="images/phuong.jpg" alt="avatar" className="messageImg" />
            <p className="messageText">Chào bạn, bạn cần giúp gì không?</p>
        </div>
        <div className="messageBottom">1 giờ trước</div>     
    </div>
  )
}
