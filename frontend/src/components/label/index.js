import { makeStyles } from "@material-ui/core";
import React from "react";

const useMainStyles = makeStyles((theme) => ({
  main: {
    margin: 0,
  },
}));

const Label = (props) => {
  const classes = useMainStyles();
  return (
    <p
      className={`${classes.main} ${props.className}`}
      style={{
        fontSize: props.size,
        letterSpacing: props.spacing,
        alignSelf: "center",
        textAlign: props.align,
        color: props.color,
        ...props.style,
        fontWeight: props.w,
      }}
    >
      {props.children}
    </p>
  );
};

export default Label;
