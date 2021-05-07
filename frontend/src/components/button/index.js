import React from "react";
import { ButtonBase, CircularProgress, makeStyles } from "@material-ui/core";
import propTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {},
  wrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

const Button = (props) => {
  const classes = useStyles();

  const { onClick, ...rest } = props;
  return (
    <div
      {...rest}
      className={`${classes.wrapper} ${props.className}`}
      style={props.style}
    >
      <ButtonBase
        disabled={props.loading || props.disabled}
        style={{
          paddingTop: (props.size || 19) - 4,
          paddingBottom: (props.size || 19) - 4,
          paddingLeft: (props.size || 25) * 2,
          paddingRight: (props.size || 25) * 2,
          fontFamily: "Inter",
          backgroundColor: props.inverted ? "black" : "white",
          borderRadius: 8,
          fontSize: props.size ? props.size : 19,
          boxShadow: props.pure ? "" : "0px 4px 4px rgba(0, 0, 0, 0.25)",
          textTransform: props.uncase ? "none" : "uppercase",
          letterSpacing: props.spacing ? props.spacing : -1.25,
          width: "100%",
          height: "100%",
        }}
        TouchRippleProps={{
          style: { color: props.inverted ? "white" : "black" },
        }}
        onClick={onClick}
      >
        <div
          style={{
            transition: 0.5,
            opacity:
              props.disabled || props.loading ? (props.loading ? 0 : 0.5) : 1,
            color: props.inverted ? "white" : "black",
          }}
        >
          {props.children}
        </div>
        {props.companion}
      </ButtonBase>
      {props.loading && (
        <CircularProgress
          size={24}
          className={classes.buttonProgress}
          color={props.inverted ? "white" : "black"}
        />
      )}
    </div>
  );
};

Button.propTypes = {
  uncase: propTypes.bool,
};

export default Button;
