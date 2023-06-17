import React, { useState, useEffect } from "react";
import { toolbarOptions } from "./toolbarOptions";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import Box from "@mui/material/Box";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";

const style = {
  mainContainer: {
    backgroundColor: "#ffffff",
    width: "60%",
    margin: "10px auto 10px auto",
    boxShadow: "0 0 5px 0 rgba(0,0,0,0.5)",
    height: "93vh",
  },
};
const Editor = () => {
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();
  const { id } = useParams();
  // useEffect for starting quill server
  useEffect(() => {
    const quillServer = new Quill("#container", {
      modules: { toolbar: toolbarOptions },
      theme: "snow",
    });
    quillServer.disable();
    quillServer.setText("Loading...");
    setQuill(quillServer);
  }, []);

  // useEffect for starting socket server

  useEffect(() => {
    const socketServer = io("http://localhost:9000");
    setSocket(socketServer);

    // Return matlab run this on component unmount. In this case user closes the tab
    return () => {
      socketServer.disconnect();
    };
  }, []);

  // useEffect for sending changes

  useEffect(() => {
    if (socket === null || quill === null) return;
    const handleChange = (delta, oldData, source) => {
      if (source !== "user") return;
      socket && socket.emit("send-changes", delta);
    };
    quill && quill.on("text-change", handleChange);

    return () => {
      quill && quill.off("text-change", handleChange);
    };
  }, [quill, socket]);

  // useEffect for receiveing changes
  useEffect(() => {
    if (socket === null || quill === null) return;

    const handleChange = (delta) => {
      quill.updateContents(delta);
    };

    socket && socket.on("receive-changes", handleChange);

    return () => {
      socket && socket.off("receive-changes", handleChange);
    };
  }, [quill, socket]);

  useEffect(() => {
    if (socket === null || quill === null) return;

    socket &&
      socket.once("load-document", (document) => {
        quill && quill.setContents(document);
        quill && quill.enable();
      });
    socket && socket.emit("get-document", id);

    return () => {
      //   second;
    };
  }, [quill, socket, id]);

  useEffect(() => {
    if (socket === null || quill === null) return;

    const interval = setInterval(() => {
      socket.emit("save-document", quill.getContents());
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [socket, quill]);

  return (
    <>
      <Box
        style={{
          backgroundColor: "#F5F5F5",
          textAlign: "center",
        }}
      >
        <Box style={style.mainContainer} id="container"></Box>
      </Box>
    </>
  );
};

export default Editor;
