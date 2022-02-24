import React, { useState, useContext } from "react";
import { targetURL, MLFUNC_URL, MLFUNC_SUFFIX_DF, URLS_PREPROCESS, httpConfig } from "./networkConfigs";
import { AppContext } from "../../App";
import { inputStyle } from "../componentStyle";
import { funcResultConfig, funcResultLayout } from "./funcResultConfigs";
import { jsonToFile } from "./util";

function IsNa({ formId, resultId }) {
  const [isSum, setIsSum] = useState();
  const { dfd, storage } = useContext(AppContext);

  // 결측치 개수 합계 표시 여부 상태 값 저장
  const handleChange = (event) => {
    // console.log(event.target.value);
    setIsSum(event.target.value);
  };

  // 백앤드로 데이터 전송
  const handleSubmit = async (event) => {
    event.preventDefault(); // 실행 버튼 눌러도 페이지 새로고침 안 되도록 하는 것

    // 백앤드 전송을 위한 설정
    const params = { sum: isSum }; // 입력해야 할 파라미터 설정
    // 백앤드 API URL에 파라미터 추가
    const targetUrl = targetURL(MLFUNC_URL.concat(MLFUNC_SUFFIX_DF, URLS_PREPROCESS.IsNa), params);
    const df = storage.getItem("df"); // 기존에 스토리지에 저장되어 있던 데이터프레임(JSON) 가져오기

    // 데이터 전송 후 받아온 데이터프레임을 사용자에게 보여주기 위한 코드
    await fetch(targetUrl, httpConfig(JSON.stringify(df)))
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        // JSON 데이터프레임 문자열을 담은 파일을 읽어서 데이터프레임으로 만든 후 보여주기
        dfd
          .readJSON(jsonToFile(data))
          .then((df) => {
            df.plot(resultId).table({ funcResultConfig, funcResultLayout }); // 결과 영역에 출력
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((error) => console.error(error));
  };

  return (
    <form id={formId} onSubmit={handleSubmit}>
      <label>
        결측치 확인 방식
        <select className={inputStyle} onChange={handleChange}>
          <option value="false">데이터프레임</option>
          <option value="true">컬럼별 결측치 수</option>
        </select>
      </label>
    </form>
  );
}

export default React.memo(IsNa);