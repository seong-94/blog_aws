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
// react -toast
import { toast } from "react-toastify";

function Write() {
  const state = useLocation().state;
  const [title, setTitle] = useState(state?.title || "");
  const [value, setValue] = useState(state?.desc || "");
  const [cat, setCat] = useState(state?.cat || "react");
  const [dropCat, setDropCat] = useState(false);
  const navigate = useNavigate();
  const [file, setFile] = useState(state?.file || null);

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();
    try {
      state
        ? await axios.put(`/posts/${state.id}`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
          })
        : await axios.post(`/posts/`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
            date: moment(Date.now()).format("YYYY-MM-DD"),
          });
      navigate("/");
      toast.success("업로드 성공하였습니다.");
    } catch (err) {
      toast.error(err.request.responseText);
      console.log(err);
    }
  };

  return (
    <div className={styles.add}>
      <div className={styles.content}>
        <div className={styles.wrap_inner_view}>
          <div className={styles.dropdown}>
            <button
              className={styles.dropbtn}
              onClick={() => setDropCat(!dropCat)}
            >
              <span className={styles.dropbtn_content}>
                {cat ? cat : "Categor"}
              </span>
            </button>
            <div
              className={
                dropCat ? `${styles.dropdown_content}` : `${styles.none}`
              }
            >
              <div
                checked={cat === "react"}
                name="cat"
                value="react"
                onClick={(e) => [
                  setCat(e.target.innerHTML),
                  setDropCat(!dropCat),
                ]}
              >
                react
              </div>
              <div
                name="cat"
                checked={cat === "javascript"}
                value="javascript"
                id="javascript"
                onClick={(e) => [
                  setCat(e.target.innerHTML),
                  setDropCat(!dropCat),
                ]}
              >
                javascript
              </div>
              <div
                checked={cat === "nodejs"}
                name="cat"
                value="nodejs"
                id="nodejs"
                onClick={(e) => [
                  setCat(e.target.innerHTML),
                  setDropCat(!dropCat),
                ]}
              >
                nodejs
              </div>
              <div
                checked={cat === "aws"}
                name="cat"
                value="aws"
                id="aws"
                onClick={(e) => [
                  setCat(e.target.innerHTML),
                  setDropCat(!dropCat),
                ]}
              >
                aws
              </div>
              <div
                checked={cat === "mysql"}
                name="cat"
                value="mysql"
                id="mysql"
                onClick={(e) => [
                  setCat(e.target.innerHTML),
                  setDropCat(!dropCat),
                ]}
              >
                mysql
              </div>
            </div>
          </div>
          <input
            type="text"
            placeholder="Title"
            className={styles.post_title}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
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
              setFile(event.target.files[0]);
            }}
            onBlur={(event, editor) => {}}
            onFocus={(event, editor) => {}}
          />
        </div>
      </div>
      <div className={styles.buttons}>
        {/* <button className={styles.btn} onClick={handleClick}>
          이미지 업로드 기능 미구현
        </button> */}

        <button className={styles.btn} onClick={handleClick}>
          저장하기
        </button>
      </div>
    </div>
  );
}

export default Write;
