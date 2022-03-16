import React, { useEffect, useState, useRef } from "react";
import _ from "lodash";
import classNames from "classnames";
import { HiX } from "react-icons/hi";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { inputStyle } from "MLML/MLComponents/componentStyle";
import { targetURL, httpConfig, USER_AUTH_URL, URLS_USER_AUTH } from "MLML/MLComponents/CompoOptions/networkConfigs";

function Inactive({ isOpen, setIsOpen, logout }) {
  const userIdx = localStorage.getItem("AIPLAY_USER_IDX");
  const [input, setInput] = useState({
    pw: "",
  });

  const [pwVisible, setPwVisible] = useState(false);

  const pwRef = useRef();

  useEffect(() => {
    isOpen ? (document.body.style.overflow = "hidden") : (document.body.style.overflow = "auto");

    // input 초기화
    pwRef.current.value = "";
    setInput({
      pw: "",
    });
    setPwVisible(false);
  }, [isOpen]);

  const handleChange = _.debounce((event) => {
    console.log(event.target);
    const { name, value } = event.target;
    setInput({
      ...input,
      [name]: value,
    });
  }, 200);

  const submitInactive = async (event) => {
    event.preventDefault();
    if (window.confirm("정말 탈퇴하시겠어요?")) {
      console.log(userIdx);
      const targetUrl = targetURL(USER_AUTH_URL.concat(URLS_USER_AUTH.inactive));
      await fetch(targetUrl, httpConfig(JSON.stringify({ idx: userIdx, pw: input.pw }), "POST", true))
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            alert("회원 탈퇴 성공");
            logout();
            window.location.href = "/";
          } else {
            data.user_state ? alert("비밀번호가 일치하지 않습니다.") : alert("탈퇴 실패");
          }
        });
    }
  };

  return (
    <div className={classNames(!isOpen && "hidden", "fixed inset-0 z-10 flex justify-center items-center")}>
      <div className="fixed top-0 right-0 bottom-0 left-0 backdrop-blur-sm" />
      <form onSubmit={submitInactive} className="absolute w-2/5 h-fit bg-white border-2 rounded-lg flex flex-col justify-around divide-solid space-y-2">
        {/* 제목 부분 */}
        <div className="flex flex-row justify-between items-center">
          <h3 className="text-xl p-2">회원 탈퇴</h3>
          <HiX onClick={() => setIsOpen(false)} className="inline w-8 h-8 mx-2 cursor-pointer" />
        </div>
        {/* 비밀번호 입력란 */}
        <div className="flex flex-row items-center">
          <input
            ref={pwRef}
            type={pwVisible ? "text" : "password"}
            name="pw"
            className={inputStyle + " mx-2 flex-1"}
            placeholder="비밀번호를 입력해주세요"
            onChange={handleChange}
            required={true}
          />
          <button type="button" className="absolute right-0 mr-4" onClick={() => setPwVisible(!pwVisible)}>
            {pwVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
          </button>
        </div>

        <div className="flex flex-row justify-around">
          <button type="submit" className="border border-red-500 hover:bg-red-300 text-black text-sm md:text-xs font-bold w-2/5 py-2 px-2 rounded">
            탈퇴하기
          </button>
        </div>
      </form>
    </div>
  );
}

export default React.memo(Inactive);
