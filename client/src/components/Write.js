import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import moment from "moment";

function Write() {
  const state = useLocation().state;
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  // const [file, setFile] = useState(null);
  const [cat, setCat] = useState("");

  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      state
        ? await axios.put(`/posts/${state.id}`, {
            title,
            desc: value,
            cat,
          })
        : await axios.post(`/posts/`, {
            title,
            desc: value,
            cat,
            date: moment(Date.now()).format("YYYY-MM-DDTHH"),
          });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add">
      <div className="write-left">카테고리 들어갈 예정</div>
      <div className="content">
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className="menu">
        <div className="write-rigth">
          <div className="item">
            <input
              style={{ display: "none" }}
              type="file"
              id="file"
              name=""
              onChange={"(e) => setFile(e.target.files[0])"}
            />
            <label className="file" htmlFor="file">
              업로드 이미지
              <br></br>
              추가 예정 이미지 미리 보기 도 추가 예정
            </label>
            <div className="buttons">
              <button onClick={handleClick}>업로드</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Write;
