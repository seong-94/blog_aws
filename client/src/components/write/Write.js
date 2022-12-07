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

function Write({ setDesc, desc }) {
  const state = useLocation().state;
  const [title, setTitle] = useState(state?.title || "");
  const [value, setValue] = useState(state?.desc || "");
  const [cat, setCat] = useState(state?.cat || "react");
  const [dropCat, setDropCat] = useState(false);
  const navigate = useNavigate();
  // const [image, setImage] = useState(null);
  // const [flag, setFlag] = useState(false);

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
      toast.success("업로드 성공하였습니다.");
    } catch (err) {
      toast.error(err.request);
      console.log(err);
    }
  };

  // const customUploadAdapter = (loader) => {
  //   return {
  //     upload() {
  //       return new Promise((resolve, reject) => {
  //         const data = new FormData();
  //         loader.file.then((file) => {
  //           data.append("name", file.name);
  //           data.append("file", file);

  //           axios
  //             .post("/upload", data)
  //             .then((res) => {
  //               if (!flag) {
  //                 setFlag(true);
  //                 // setImage(res.data.filename);
  //               }
  //               resolve({
  //                 default: `${res.data.filename}`,
  //               });
  //             })
  //             .catch((err) => reject(err));
  //         });
  //       });
  //     },
  //   };
  // };

  // function uploadPlugin(editor) {
  //   editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
  //     return customUploadAdapter(loader);
  //   };
  // }

  return (
    <div className={styles.write}>
      <div className={styles.content}>
        <div className={styles.wrap_inner_view}>
          <div className={styles.dropdown}>
            <button
              className={styles.dropbtn}
              onClick={() => setDropCat(!dropCat)}
            >
              <span className={styles.dropbtn_content}>
                {cat ? cat : "Category"}
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
