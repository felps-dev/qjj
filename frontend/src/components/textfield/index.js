import { InputBase } from "@material-ui/core";
import React from "react";
import { openFileDialog } from "../../utils";

const TextField = (props) => {
  return (
    <InputBase
      {...props}
      style={{
        display: "block",
        ...props.style,
        color: props.inverted ? "#808080" : "white",
        fontSize: props.size,
        letterSpacing: props.spacing,
        fontWeight: props.w,
        fontFamily: "Inter",
      }}
      inputProps={{
        disabled: props.filefield || props.disabled,
        style: {
          textAlign: props.align,
          cursor: props.filefield ? "pointer" : "unset",
        },
      }}
      onClick={
        !props.filefield || props.disabled
          ? null
          : () =>
              openFileDialog([props.filetype], false, (a) => props.onChange(a))
      }
    />
  );
};

export default TextField;
