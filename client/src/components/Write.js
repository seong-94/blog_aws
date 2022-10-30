import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import moment from "moment";

function Write() {
  const state = useLocation().state;
  const [title, setTitle] = useState(state?.title || "");
  const [value, setValue] = useState(state?.desc || "");
  // const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");
  // console.log(state.title);
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
            date: moment(Date.now()).format("YYYY-MM-DD"),
          });
      navigate("/");
      console.log(moment(Date.now()).format("YYYY-MM-DD"));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add">
      <div className="write-left">카테고리 컴포넌트</div>
      <div className="content">
        <input
          type="text"
          placeholder="Title"
          value={title}
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
              // onChange={"(e) => setFile(e.target.files[0])"}
            />
            <label className="file" htmlFor="file">
              업로드 이미지
              <br></br>
              추가 예정 이미지 미리 보기 도 추가 예정
            </label>
            <div className="buttons">
              <button onClick={handleClick}>업로드</button>
            </div>
            <div className="buttons">
              <button onClick={handleClick}>저장하기</button>
            </div>
          </div>
          <div className="item">
            <h1>Category</h1>
            <div className="cat">
              <input
                type="radio"
                checked={cat === "react"}
                name="cat"
                value="react"
                id="react"
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor="react">React</label>
            </div>
            <div className="cat">
              <input
                type="radio"
                checked={cat === "javascript"}
                name="cat"
                value="javascript"
                id="javascript"
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor="javascript">Javascript</label>
            </div>
            <div className="cat">
              <input
                type="radio"
                checked={cat === "nodejs"}
                name="cat"
                value="nodejs"
                id="nodejs"
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor="nodejs">Nodejs</label>
            </div>
            <div className="cat">
              <input
                type="radio"
                checked={cat === "aws"}
                name="cat"
                value="aws"
                id="aws"
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor="aws">AWS</label>
            </div>
            <div className="cat">
              <input
                type="radio"
                checked={cat === "mysql"}
                name="cat"
                value="mysql"
                id="mysql"
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor="mysql">Mysql</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Write;
