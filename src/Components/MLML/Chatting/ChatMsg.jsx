import React from "react";
import { PROFILE_PIC_BASE_URL } from "utils/networkConfigs";
import blankPic from "assets/blank_pic.png";

const timeStyle = "text-xs self-end";
const contentStyle = "font-sans px-2 py-1 text-sm bg-white rounded-lg";

const ChatMsg = ({ idx, msg }) => {
  const profilePic = `${PROFILE_PIC_BASE_URL}${msg.idx}/${msg.idx}.png`;

  const handleImgError = (e) => {
    // 채팅방에서 이미지 로딩 오류가 발생하면 이미지를 빈 이미지로 변경
    e.target.src = blankPic;
  };

  return idx === msg.idx ? (
    <div className="flex flex-row justify-end space-x-1">
      <span className={timeStyle}>{msg.time}</span>
      <pre className={contentStyle}>{msg.message}</pre>
    </div>
  ) : (
    <div className="flex flex-row justify-start space-x-1">
      <img src={profilePic ? profilePic : blankPic} alt="profile" className="w-8 h-8 rounded-full" onError={handleImgError} />
      <div className="flex flex-col space-y-1">
        <span className={"text-xs text-bold"}>{msg.nickname}</span>
        <pre className={contentStyle}>{msg.message}</pre>
      </div>
      <span className={timeStyle}>{msg.time}</span>
    </div>
  );
};

export default React.memo(ChatMsg);
