import React, { useState, useContext, useRef } from "react";
import { targetURL, MLFUNCS_URL, MLFUNCS_SUFFIX_DF, URLS_PREPROCESS, httpConfig } from "MLComponents/CompoOptions/networkConfigs";
import { AppContext } from "App";
import { saveDf, showDataResult, getColumns } from "MLComponents/CompoOptions/util";
import { inputStyle } from "MLComponents/componentStyle";
import { Select } from "MLComponents/CompoOptions/CompoPiece";
import MultiSelect from "react-select";
import classNames from "classnames";
import { BlockContext } from "MLComponents/Column";

function Drop({ formId, resultId }) {
  const { dfd, storage } = useContext(AppContext);
  const { blockId } = useContext(BlockContext);

  const columns = getColumns(blockId); // 데이터프레임 컬럼 목록 가져오기
  const colObjArray = [...columns.map((column) => ({ label: column, value: column }))]; // MultiSelect에서 사용하는 객체 목록

  const [params, setParams] = useState({
    labels: [],
    axis: 1,
    errors: "raise",
  });

  // DOM 접근 위한 Ref
  const labelsColRef = useRef();
  const labelsIndexRef = useRef();

  // 컬럼 선택(MultiSelect)
  const settingLabelsCol = (e) => {
    setParams({
      ...params,
      labels: [...e.map((col) => col.value)],
    });
  };

  const clearInputs = () => {
    setParams({
      ...params,
      labels: params.axis === 1 ? [] : "",
    });
    labelsIndexRef.current.value = ""; // 인덱스 입력 값 초기화

    // 컬럼 입력 값 초기화(onChange되면서 settingLabelsCol에서 상태 값도 초기화됨)
    labelsColRef.current.clearValue();
    return;
  };

  // 옵션 상태 값 저장
  const handleChange = (event) => {
    const { name, value } = event.target;
    setParams({
      ...params,
      [name]: value,
    });
  };

  // 백앤드로 데이터 전송
  const handleSubmit = async (event) => {
    event.preventDefault(); // 실행 버튼 눌러도 페이지 새로고침 안 되도록 하는 것

    // 백앤드 전송을 위한 설정
    // 축 선택에 맞는 값을 입력하지 않은 경우 입력칸에 포커스 주기
    if (params.axis === 1 && params.labels.length === 0) {
      labelsColRef.current.focus();
      return;
    } else if (params.axis === 0 && params.labels.length === 0) {
      labelsIndexRef.current.focus();
      return;
    }
    // 백앤드 API URL에 파라미터 추가
    const targetUrl = targetURL(MLFUNCS_URL.concat(MLFUNCS_SUFFIX_DF, URLS_PREPROCESS.Drop), params);
    const df = storage.getItem(blockId + "_df"); // 기존에 스토리지에 저장되어 있던 데이터프레임(JSON) 가져오기

    // 데이터 전송 후 받아온 데이터프레임을 사용자에게 보여주기 위한 코드
    await fetch(targetUrl, httpConfig(JSON.stringify(df)))
      .then((response) => response.json())
      .then((data) => {
        saveDf(blockId, "_df", data, true); // 데이터프레임 저장
        showDataResult(dfd, data, resultId);

        clearInputs(); // 실행 후 입력 초기화
      })
      .catch((error) => console.error(error));
  };

  return (
    <form id={formId} onSubmit={handleSubmit}>
      <div className="flex flex-row space-x-2">
        <div className="flex flex-col flex-1">
          <Select options={[0, 1]} optionText={["행", "열"]} name={"axis"} text="축 선택" onChange={handleChange} defaultValue={1} />
          <Select options={["raise", "ignore"]} name={"errors"} text="에러 표시 여부" onChange={handleChange} />
        </div>
        <div className="flex-1">
          <div className={classNames(params.axis === 1 ? "" : "hidden", "flex items-center space-x-2")}>
            <label>삭제 대상 컬럼</label>
            <MultiSelect
              ref={labelsColRef}
              options={colObjArray}
              onChange={settingLabelsCol}
              className="inline-block flex-auto"
              isMulti={true}
              closeMenuOnSelect={false}
            />
          </div>
          <div className={classNames(params.axis === 1 ? "hidden" : "")}>
            <label>
              삭제 대상 인덱스
              <input name={"labels"} ref={labelsIndexRef} className={inputStyle} type="text" onChange={handleChange} />
            </label>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Drop;
