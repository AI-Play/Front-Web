import React from "react";
import LeftSidebar from "./LeftSidebar";
import { AppContext } from "App";

function LeftMLNavPart({ props }) {
  const { ccv } = React.useContext(AppContext);
  const { isLoading, projName } = ccv;

  const lastSavingTime = React.useMemo(() => {
    return isLoading ? "저장 중..." : `마지막 저장 시점 : ${new Date().toLocaleString()}`;
  }, [isLoading]);

  return (
    <div className="flex-1 flex items-center leading-normal space-x-4 sm:items-stretch sm:justify-start">
      <LeftSidebar
        initProject={props.initProject}
        updateProject={props.updateProject}
        newProject={props.newProject}
        updateProjName={props.updateProjName}
        deleteProject={props.deleteProject}
      />
      <div className="flex items-center leading-normal space-x-4">
        <div className="text-gray-300 text-lg font-medium">{projName ? projName : "untitled"}</div>
        <div className="text-gray-300 text-sm font-medium">{lastSavingTime}</div>
      </div>
    </div>
  );
}

export default LeftMLNavPart;
