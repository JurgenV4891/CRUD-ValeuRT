import React from "react";

const alert = (props) => {
  const mesClassesCSS = `alert ${props.typeAlert}`;
  return (
    <div className={mesClassesCSS} role="alert">
      {props.children}
    </div>
  );
};

export default alert;
