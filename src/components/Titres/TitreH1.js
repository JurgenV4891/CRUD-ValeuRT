import React from "react";
import classes from "./TitreH1.module.css";

const titreH1 = (props) => {
  const monCss = `${classes.policeTitre} border border-dark p-2 m-2 bg-primary rounded text-center text-white`;
  return <h1 className={monCss}>{props.children}</h1>;
};

export default titreH1;
