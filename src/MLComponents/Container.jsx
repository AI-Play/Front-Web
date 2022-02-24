import React, { useState, useCallback } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import classNames from "classnames";

import TrashDropZone from "./TrashDropZone";
import SideBar from "./SideBar";
import Column from "./Column";
import initialData from "./initial-data-test"; // COLUMN-ROW-COMPONENT
import { handleMoveWithinParent, handleMoveToDifferentParent, handleMoveSidebarComponentIntoParent, handleRemoveItemFromLayout } from "./helpers";
import styled from "styled-components";

import { ITEM_TYPES, COMPONENT, COLUMN, SIDEBAR_ITEM } from "./constants";
import shortid from "shortid";

const Toolbox = styled.div`
  display: flex;
  position: fixed;
  z-index: 10;
  justify-content: center;
  width: 80%;
  button {
    padding: 10px 5px;
    width: 5rem;
    font-size: 0.8em;
    border: 1px solid #ccc;
  }
  button:hover {
    color: #008cba;
  }
`;

const Container = () => {
  const initialLayout = initialData.layout;
  // const initialComponents = initialData.components;
  const [layout, setLayout] = useState(initialLayout);
  // const [components, setComponents] = useState(initialComponents);

  const handleDropToTrashBin = useCallback(
    (dropZone, item) => {
      const splitItemPath = item.path.split("-");
      setLayout(handleRemoveItemFromLayout(layout, splitItemPath));
    },
    [layout]
  );

  const handleDrop = useCallback(
    (dropZone, item) => {
      // console.log('dropZone', dropZone)
      console.log("item", item);

      const splitDropZonePath = dropZone.path.split("-");
      const pathToDropZone = splitDropZonePath.slice(0, -1).join("-");
      // console.log('splitDropZonePath', splitDropZonePath)
      // console.log('pathToDropZone', pathToDropZone)

      const newItem = { id: item.id, type: item.type, func: item.func };
      // console.log('newItem id type', newItem);
      // if (item.type === COLUMN) {
      //   newItem.children = item.children;
      // }

      // 사이드바로부터 컴포넌트 가져와서 추가하는 경우
      if (item.type.includes(SIDEBAR_ITEM)) {
        // if (item.type === SIDEBAR_ITEM) {
        // 1. Move sidebar item into page
        // const newComponent = {
        //   id: shortid.generate(),
        //   ...item.component
        // };

        // 실제로 Container에 추가된 컴포넌트의 정보
        const newItem = {
          id: shortid.generate(), // layout에 포함되기 위해 새로운 id를 생성
          type: item.type, // 전처리 / 훈련 / 평가 구분하기 위한 값
          func: item.func, // 사이드바 아이템의 func가 어떤 기능인지 나타냄
        };
        // setComponents({
        //   ...components,
        //   [newComponent.id]: newComponent
        // });

        setLayout(handleMoveSidebarComponentIntoParent(layout, splitDropZonePath, newItem));
        // console.log(layout);
        return;
      }

      // move down here since sidebar items dont have path
      const splitItemPath = item.path.split("-");
      const pathToItem = splitItemPath.slice(0, -1).join("-");
      // console.log('splitItemPath', splitItemPath)
      // console.log('pathToItem', pathToItem)

      // 2. 단순 이동인 경우
      if (splitItemPath.length === splitDropZonePath.length) {
        // 2.a. move within parent
        if (pathToItem === pathToDropZone) {
          // console.log('move within parent');
          setLayout(handleMoveWithinParent(layout, splitDropZonePath, splitItemPath));
          // console.log(layout);
          return;
        }

        // 2.b. OR move different parent
        // TODO FIX columns. item includes children
        // console.log('move different parent');
        setLayout(handleMoveToDifferentParent(layout, splitDropZonePath, splitItemPath, newItem));
        // console.log(layout);
        return;
      }

      // 3. Move + Create
      // setLayout(
      //   handleMoveToDifferentParent(
      //     layout,
      //     splitDropZonePath,
      //     splitItemPath,
      //     newItem
      //   )
      // );
    },
    // [layout, components]
    [layout]
  );

  const renderColumn = (column, currentPath) => {
    return (
      <Column
        key={column.id}
        data={column}
        // components={components}
        handleDrop={handleDrop}
        path={currentPath}
      />
    );
  };

  // 마우스 휠, 드래그 등을 이용한 작업 영역 위치 조정 가능 여부 상태
  const [movingEnabled, setMovingEnabled] = useState(false);
  // const [dragEnabled, setDragEnabled] = useState(false);

  // dont use index for key when mapping over items
  // causes this issue - https://github.com/react-dnd/react-dnd/issues/342
  return (
    <div className="flex flex-row">
      <div className="flex flex-col w-4/5 bg-slate-700">
        {/* 요소 확대/축소 및 위치 이동 기능을 넣기 위한 Wrapper */}
        <TransformWrapper minScale={0.1} maxScale={2} limitToBounds={false} disabled={!movingEnabled}>
          {/* 확대 / 축소 / 원 위치 이동 함수 넣기 */}
          {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
            <React.Fragment>
              <Toolbox>
                {/* 위치 이동 가능 여부를 설정할 수 있는 버튼 추가 */}
                <button
                  className={classNames(movingEnabled ? "bg-green-500" : "bg-green-50", "rounded-bl-lg")}
                  onClick={() => setMovingEnabled(!movingEnabled)}>
                  Move
                </button>
                {/* 컴포넌트 드래그 가능 여부를 설정할 수 있는 버튼 추가(컴포넌트 내 텍스트 선택 가능하게 할 목적) */}
                {/* <button className={classNames(dragEnabled ? "bg-green-500" : "bg-green-50")} onClick={() => setDragEnabled(!dragEnabled)}>
                  Drag
                </button> */}
                {/* 확대 / 축소 / 원 위치 이동을 위한 버튼 */}
                <button className="bg-green-50" onClick={() => zoomIn(0.2)}>
                  Zoom In
                </button>
                <button className="bg-green-50" onClick={() => zoomOut(0.2)}>
                  Zoom Out
                </button>
                <button className="bg-green-50 rounded-br-lg" onClick={() => resetTransform()}>
                  Reset
                </button>
              </Toolbox>

              {/* TransformComponent 안의 컴포넌트가 실제로 확대 / 축소 / 위치 이동 기능이 적용되는 대상임 */}
              <TransformComponent>
                <div className="page columns w-full h-full">
                  {/* layout 데이터에서 column 하나씩 내놓음. 한 column에 한 index */}
                  {layout.map((column, index) => {
                    const currentPath = `${index}`; // index는 현재 경로로 지정됨

                    return (
                      <React.Fragment key={column.id}>
                        {/* column 하나마다 좌측에 TrashDropZone 놔둠 */}
                        <TrashDropZone data={{ layout }} onDrop={handleDropToTrashBin} />
                        {/* column 데이터 하나씩 전달하여 column 생성
                        동시에 각각의 column의 index를 전달하여 해당 column의 경로로 지정 */}
                        {renderColumn(column, currentPath)}
                      </React.Fragment>
                    );
                  })}
                  {/* column 다 추가하고 나면 마지막으로 맨 오른쪽에 TrashDropZone 추가 */}
                  <TrashDropZone data={{ layout }} onDrop={handleDropToTrashBin} />
                </div>
              </TransformComponent>
            </React.Fragment>
          )}
        </TransformWrapper>
      </div>

      {/* 사이드바와 사이드바 내 아이템들 */}
      <SideBar />
    </div>
  );
};
export default React.memo(Container);