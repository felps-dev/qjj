import { InputBase } from "@material-ui/core";
import React from "react";

const TextField = (props) => {
  return (
    <InputBase
      {...props}
      style={{
        display: "block",
        ...props.style,
        color: "white",
        fontSize: props.size,
        fontFamily: "Inter",
      }}
      inputProps={{
        style: {
          textAlign: props.align,
        },
      }}
    />
  );
};

export default TextField;
