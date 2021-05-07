import React from "react";
import { fromEvent } from "file-selector";

export function useDeviceDetect() {
  const [width, setWidth] = React.useState(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  React.useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  let isMobile = width <= 768;

  return { isMobile };
}

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export function openFileDialog(accept, multiple, callback) {
  // this function must be called from  a user
  // activation event (ie an onclick event)

  // Create an input element
  var inputElement = document.createElement("input");
  // Set its type to file
  inputElement.type = "file";
  // Set accept to the file types you want the user to select.
  // Include both the file extension and the mime type
  inputElement.accept = accept;
  // Accept multiple files
  inputElement.multiple = multiple;
  // set onchange event to call callback when user has selected file
  inputElement.addEventListener("change", (evt) => {
    fromEvent(evt).then(async (files) => {
      files.forEach((file) => {
        (async () => {
          callback({
            name: file.name,
            content: await toBase64(file),
          });
        })();
      });
    });
  });
  // dispatch a click event to open the file dialog
  inputElement.dispatchEvent(new MouseEvent("click"));
}

export function toDataUrl(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    var reader = new FileReader();
    reader.onloadend = function () {
      callback(reader.result);
    };
    reader.readAsDataURL(xhr.response);
  };
  xhr.open("GET", url);
  xhr.responseType = "blob";
  xhr.send();
}
