//routers
import { useLocation, useNavigate } from "react-router-dom";
//hooks
import React, { useState } from "react";
//axios
import axios from "axios";

//time
import moment from "moment";

// editor
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
//scss
import styles from "./Write.module.scss";

function Write() {
  const state = useLocation().state;
  const [title, setTitle] = useState(state?.title || "");
  const [value, setValue] = useState(state?.desc || "");
  // const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "react");
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
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.add}>
      <div className={styles.content}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className={styles.item}>
          <button>Category</button>
          <div className="cat">
            <ul>
              <li>
                <input
                  type="radio"
                  checked={cat === "react"}
                  name="cat"
                  value="react"
                  onChange={(e) => setCat(e.target.value)}
                />
                <label htmlFor="react">React</label>
              </li>
              <li>
                <input
                  type="radio"
                  checked={cat === "javascript"}
                  name="cat"
                  value="javascript"
                  id="javascript"
                  onChange={(e) => setCat(e.target.value)}
                />
                <label htmlFor="javascript">Javascript</label>
              </li>
              <li>
                <input
                  type="radio"
                  checked={cat === "nodejs"}
                  name="cat"
                  value="nodejs"
                  id="nodejs"
                  onChange={(e) => setCat(e.target.value)}
                />
                <label htmlFor="nodejs">Nodejs</label>
              </li>
              <li>
                <input
                  type="radio"
                  checked={cat === "aws"}
                  name="cat"
                  value="aws"
                  id="aws"
                  onChange={(e) => setCat(e.target.value)}
                />
                <label htmlFor="aws">AWS</label>
              </li>
              <li>
                <input
                  type="radio"
                  checked={cat === "mysql"}
                  name="cat"
                  value="mysql"
                  id="mysql"
                  onChange={(e) => setCat(e.target.value)}
                />
                <label htmlFor="mysql">Mysql</label>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.editorContainer}>
          <CKEditor
            editor={ClassicEditor}
            config={{
              placeholder: "내용을 입력하세요.",
            }}
            data={value}
            onReady={(editor) => {}}
            onChange={(event, editor) => {
              const desc = editor.getData();
              setValue(desc);
            }}
            onBlur={(event, editor) => {}}
            onFocus={(event, editor) => {}}
          />
        </div>
      </div>
      <div className={styles.buttons}>
        <button onClick={handleClick}>업로드</button>
      </div>
      <div className={styles.buttons}>
        <button onClick={handleClick}>저장하기</button>
      </div>
      <div className={styles.menu}>
        <div className={styles.write_rigth}></div>
      </div>
    </div>
  );
}

export default Write;
