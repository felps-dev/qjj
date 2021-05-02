import React from "react";
import { ButtonBase } from "@material-ui/core";
import propTypes from "prop-types";

const Button = (props) => {
  return (
    <ButtonBase
      {...props}
      style={{
        paddingTop: props.pure ? 5 : 15,
        paddingBottom: props.pure ? 5 : 15,
        paddingLeft: props.pure ? 20 : 50,
        paddingRight: props.pure ? 20 : 50,
        fontFamily: "Inter",
        backgroundColor: "white",
        borderRadius: 8,
        fontSize: 19,
        boxShadow: props.pure ? "" : "0px 4px 4px rgba(0, 0, 0, 0.25)",
        textTransform: props.uncase ? "none" : "uppercase",
        letterSpacing: props.spacing ? props.spacing : -1.25,
        ...props.style,
      }}
    >
      {props.children}
    </ButtonBase>
  );
};

Button.propTypes = {
  uncase: propTypes.bool,
};

export default Button;
