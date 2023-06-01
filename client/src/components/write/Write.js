//routers
import { useLocation, useNavigate } from "react-router-dom";
//hooks
import React, { useState } from "react";
//axios
import axios from "axios";
//import component
import { getText } from "commons/libraries/utils";
//time
import moment from "moment";

//emotion
import * as S from "./WriteStyles";

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
        ? await axios.put(`/posts/${state.posts_id}`, {
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
      alert("업로드를 성공하였습니다.");
    } catch (err) {
      alert("업로드를 실패하였습니다.");
    }
  };

  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  };

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
          <S.CategoryWrapper>
            <S.CategoryButton onClick={() => setDropCat(!dropCat)}>
              <S.DropContent>{cat ? cat : "Category"}</S.DropContent>
            </S.CategoryButton>
            {dropCat ? (
              <S.DropDownContent>
                <S.DropDownItems
                  checked={cat === "react"}
                  name="cat"
                  value="react"
                  onClick={onClickCategory}
                >
                  React
                </S.DropDownItems>
                <S.DropDownItems
                  name="cat"
                  checked={cat === "javascript"}
                  value="javascript"
                  id="javascript"
                  onClick={onClickCategory}
                >
                  Javascript
                </S.DropDownItems>
                <S.DropDownItems
                  checked={cat === "nodejs"}
                  name="cat"
                  value="nodejs"
                  id="nodejs"
                  onClick={onClickCategory}
                >
                  Nodejs
                </S.DropDownItems>
                <S.DropDownItems
                  checked={cat === "aws"}
                  name="cat"
                  value="aws"
                  id="aws"
                  onClick={onClickCategory}
                >
                  AWS
                </S.DropDownItems>
                <S.DropDownItems
                  checked={cat === "mysql"}
                  name="cat"
                  value="mysql"
                  id="mysql"
                  onClick={onClickCategory}
                >
                  Mysql
                </S.DropDownItems>
              </S.DropDownContent>
            ) : (
              <></>
            )}
          </S.CategoryWrapper>
        </S.InputWrapper>

        <S.InputWrapper>
          <S.Label>제목</S.Label>
          <S.Subject
            type="text"
            placeholder="제목을 입력해주세여"
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
          value={getText(contents)}
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
        <S.SubmitButton onClick={handleClick}>저장하기</S.SubmitButton>
      </S.ButtonWrapper>
    </S.Wrapper>
  );
}

export default Write;
