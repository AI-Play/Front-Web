import React, { useState, useEffect } from "react";
import { Select, Switch } from "Components/MLML/MLComponents/CompoOptions/CompoPiece";
import MultiSelect from "react-select";
import { equalsIgnoreOrder, colArrayToObjArray } from "Components/MLML/MLComponents/CompoOptions/mlUtilFuncs";

function OneHot({ handleOptions, colObjArray, handleSteps, steps, step }) {
  const initialOpts = {
    cols: null,
    drop_invariant: false,
    return_df: true,
    handle_unknown: "value",
    handle_missing: "value",
    use_cat_names: false,
  };

  // 옵션 상태 값 저장
  const [options, setOptions] = useState(step && equalsIgnoreOrder(Object.keys(step), Object.keys(initialOpts)) ? step : initialOpts); // 입력해야 할 파라미터 설정

  // 옵션 변경 시 MakePipeline 컴포넌트에 전달
  useEffect(() => {
    steps.hasOwnProperty("encoders")
      ? handleSteps({ encoders: Object.assign(steps.encoders, { onehot_encoder: options }) })
      : handleSteps({ encoders: Object.assign({}, { onehot_encoder: options }) });
  }, [handleSteps, options]);

  // 컬럼 선택(MultiSelect)
  const settingCols = (e) => {
    setOptions({
      ...options,
      cols: [...e.map((col) => col.value)],
    });
  };

  // 옵션 상태 값 저장
  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    if (event.target.type === "checkbox") {
      setOptions({
        ...options,
        [name]: checked,
      });
    } else {
      setOptions({
        ...options,
        [name]: value,
      });
    }
  };

  return (
    <div className="flex flex-col space-y-2 border border-blue-400 rounded-lg p-1">
      <h3>OneHot Encoder</h3>
      <div className="flex flex-row space-x-2">
        <label className="self-center">대상 컬럼 선택</label>
        <MultiSelect
          options={colObjArray}
          onChange={settingCols}
          className="flex-1"
          isMulti={true}
          closeMenuOnSelect={false}
          defaultValue={colArrayToObjArray(options.cols)}
        />
      </div>
      <div className="flex flex-row space-x-2">
        <Switch text="dropInvariant : " onChange={handleChange} name={"drop_invariant"} checked={options.drop_invariant} />
        <Switch text="returnDf : " onChange={handleChange} name={"return_df"} checked={options.return_df} />
        <Switch text="useCatNames : " onChange={handleChange} name={"use_cat_names"} checked={options.use_cat_names} />
      </div>
      <div className="flex flex-row space-x-2">
        <Select
          name={"handle_unknown"}
          className="flex-1 self-center justify-self-stretch"
          options={handleOptions}
          text="handleUnknown"
          onChange={handleChange}
          defaultValue={options.handle_unknown}
        />
        <Select
          name={"handle_missing"}
          className="flex-1 self-center justify-self-stretch"
          options={handleOptions}
          text="handleMissing"
          onChange={handleChange}
          defaultValue={options.handle_missing}
        />
      </div>
    </div>
  );
}

export default React.memo(OneHot);
