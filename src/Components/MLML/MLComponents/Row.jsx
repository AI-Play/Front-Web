import React, { useRef, useState } from "react";
import DropZone from "Components/MLML/MLComponents/DropZone";
import Component from "Components/MLML/MLComponents/Component";
import { buttonStyle } from "Components/MLML/MLComponents/componentStyle";

const Row = ({ data, handleDrop, path }) => {
  const [rowOpened, setRowOpened] = useState(true);

  const ref = useRef(null);

  const renderComponent = (component, compoType, currentPath) => {
    return (
      <Component
        key={component.id}
        data={component}
        compoType={compoType} // PREPROCESS TRAIN EVAL
        path={currentPath}
      />
    );
  };

  return (
    <div ref={ref} className="my-3 bg-slate-100 rounded-lg">
      <div className="flex flex-row justify-between p-2">
        {data.id}
        <button className={buttonStyle} onClick={() => setRowOpened(!rowOpened)}>
          {rowOpened ? "영역 숨김" : "영역 표시"}
        </button>
      </div>
      {rowOpened && (
        <>
          {data.children.map((component, index) => {
            const currentPath = `${path}-${index}`;

            return (
              <React.Fragment key={component.id}>
                <DropZone
                  data={{ path: currentPath, childrenCount: data.children.length }}
                  onDrop={handleDrop}
                  accept={data.id} // PREPROCESS TRAIN EVAL
                />
                {renderComponent(component, data.id, currentPath)}
              </React.Fragment>
            );
          })}
          <DropZone data={{ path: `${path}-${data.children.length}`, childrenCount: data.children.length }} onDrop={handleDrop} accept={data.id} isLast />
        </>
      )}
    </div>
  );
};
export default React.memo(Row);
