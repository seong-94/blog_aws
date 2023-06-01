//routers
import { useLocation, useNavigate } from "react-router-dom";
//hooks
import React, { useState } from "react";
//axios
import axios from "axios";

//time
import moment from "moment";

//scss
import styles from "./Write.module.scss";
// react -toast
import { toast } from "react-toastify";

import * as S from "./WriteStyles";
import { Fragment } from "react";

const CATEGORY = [
  { name: "react" },
  { name: "javascript" },
  { name: "nodejs" },
  { name: "aws" },
  { name: "mysql" },
];

function Write({ setDesc, desc }) {
  const state = useLocation().state;
  const [title, setTitle] = useState(state?.title || "");
  const [contents, setContents] = useState(state?.desc || "");
  const [cat, setCat] = useState(state?.cat || "react");
  const [dropCat, setDropCat] = useState(false);
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      state
        ? await axios.put(`/posts/${state.id}`, {
            title,
            desc: contents,
            cat,
          })
        : await axios.post(`/posts/`, {
            title,
            desc: contents,
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

  const onChangeTitle = (event) => setTitle(event.target.value);
  const onChangeContents = (event) => {
    setContents(event.target.value);
  };
  const onClickCategory = (event) => {
    setCat(event.target.innerHTML);
    setDropCat(!dropCat);
  };

  return (
    <S.Wrapper>
      <S.Title>게시글 등록</S.Title>

      <S.WriterWrapper>
        <S.InputWrapper>
          {CATEGORY.map((el, index) => (
            <Fragment key={index}>
              <ul>
                <li
                  onClick={onClickCategory}
                  name="cat"
                  checked={cat === el.name}
                  value={el.name}
                >
                  {el.name}
                </li>
              </ul>
            </Fragment>
          ))}
          {/* <div className={styles.wrap_inner_view}>
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
                  onClick={onClickCategory}
                >
                  react
                </div>
                <div
                  name="cat"
                  checked={cat === "javascript"}
                  value="javascript"
                  id="javascript"
                  onClick={onClickCategory}
                >
                  javascript
                </div>
                <div
                  checked={cat === "nodejs"}
                  name="cat"
                  value="nodejs"
                  id="nodejs"
                  onClick={onClickCategory}
                >
                  nodejs
                </div>
                <div
                  checked={cat === "aws"}
                  name="cat"
                  value="aws"
                  id="aws"
                  onClick={onClickCategory}
                >
                  aws
                </div>
                <div
                  checked={cat === "mysql"}
                  name="cat"
                  value="mysql"
                  id="mysql"
                  onClick={onClickCategory}
                >
                  mysql
                </div>
              </div>
            </div>
          </div> */}
        </S.InputWrapper>
        <S.InputWrapper>
          <S.Label>제목</S.Label>
          <S.Subject
            type="text"
            placeholder="제목을 입력해주세여"
            className={styles.post_title}
            value={title}
            onChange={onChangeTitle}
          />
        </S.InputWrapper>
      </S.WriterWrapper>

      <S.InputWrapper>
        <S.Label>내용</S.Label>
        <S.Contents
          type="text"
          placeholder="내용을 입력해주세여"
          className={styles.post_title}
          value={contents}
          onChange={onChangeContents}
        />
      </S.InputWrapper>

      <S.ImageWrapper>
        <S.Label>사진첨부</S.Label>
        <S.UploadButton>+</S.UploadButton>
        <S.UploadButton>+</S.UploadButton>
        <S.UploadButton>+</S.UploadButton>
      </S.ImageWrapper>
      <S.ButtonWrapper>
        <S.SubmitButton className={styles.btn} onClick={handleClick}>
          저장하기
        </S.SubmitButton>
      </S.ButtonWrapper>
    </S.Wrapper>
  );
}

export default Write;
