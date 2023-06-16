import React, { useEffect } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import Box from "@mui/material/Box";

const style = {
  mainContainer: {
    backgroundColor: "#ffffff",
    width: "60%",
    margin: "10px auto 10px auto",
    boxShadow: "0 0 5px 0 rgba(0,0,0,0.5)",
    height: "95vh",
  },
};
const Editor = () => {
  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ];

  useEffect(() => {
    const quillServer = new Quill("#container", {
      modules: {
        toolbar: toolbarOptions,
      },
      theme: "snow",
    });
  }, []);

  return (
    <>
      <Box
        style={{
          backgroundColor: "#F5F5F5",
        }}
      >
        <Box style={style.mainContainer} id="container"></Box>
      </Box>
    </>
  );
};

export default Editor;
