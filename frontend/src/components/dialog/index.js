import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import { Button, Label } from "..";

export default function MeuDialog(props) {
  return (
    <div>
      <Dialog open={props.open} onClose={() => console.log("yey")}>
        <div
          style={{
            paddingLeft: 20,
            paddingTop: 10,
            paddingRight: 10,
            textAlign: "left",
          }}
        >
          <Label size={37} spacing={-2.25} w="bold">
            {props.title}
          </Label>
        </div>
        <DialogActions>
          <Button pure pad>
            <b>Cancelar</b>
          </Button>
          <Button inverted>CONFIRMAR</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
