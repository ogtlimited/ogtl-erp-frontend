import React from "react";

const Steps = ({ items }) => {
  return (
    <>
      {items &&
        items.map((e) => (
          <div
            id={"collapse" + e.id}
            className={e.default ? "collapse show" : "collapse"}
            data-parent="#accordionExample"
          >
            {e.component}
          </div>
        ))}
    </>
  );
};

export default Steps;
