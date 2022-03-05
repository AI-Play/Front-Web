import React from "react";
import * as Models from ".";
import { MODELS_MAPPING } from "MLComponents/constants";

function Model({ model, handleSteps }) {
  if (model !== "None") {
    const Options = Models[MODELS_MAPPING[model]]; // 선택된 모델의 옵션 가져오기
    return <Options handleSteps={handleSteps} />;
  } else {
    return null;
  }
}

export default React.memo(Model);
