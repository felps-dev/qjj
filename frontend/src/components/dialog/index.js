import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import { Button, Label } from "..";
import { CircularProgress } from "@material-ui/core";

export default function MeuDialog(props) {
  return (
    <div style={{ ...props.style }}>
      <Dialog open={props.open} onClose={props.onClose} fullWidth>
        {props.loading && (
          <CircularProgress
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              marginTop: -29,
              marginLeft: -29,
              color: "black",
            }}
            size={58}
          />
        )}
        <div
          style={{
            opacity: props.loading ? 0.5 : 1,
            pointerEvents: props.loading ? "none" : "auto",
          }}
        >
          <div
            style={{
              paddingLeft: 25,
              paddingTop: 15,
              paddingRight: 25,
              textAlign: "left",
            }}
          >
            <Label size={37} spacing={-2.25} w="bold">
              {props.title}
            </Label>
          </div>
          <div
            style={{
              paddingLeft: 25,
              paddingTop: 5,
              paddingRight: 25,
              ...props.containerStyle,
            }}
          >
            {props.children}
          </div>
          <DialogActions
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingLeft: 25,
              marginBottom: 10,
              paddingRight: 25,
            }}
          >
            {props.btn1?.click && (
              <Button pure size={16} onClick={props.btn1.click}>
                <b>{props.btn1.label || "CANCELAR"}</b>
              </Button>
            )}
            {props.btn2?.click && !props.btn1?.click && <div></div>}
            {props.btn2?.click && (
              <Button size={16} inverted onClick={props.btn2.click}>
                {props.btn2.label || "OK"}
              </Button>
            )}
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}
