//routers
import { useLocation, useNavigate } from "react-router-dom";
//hooks
import { ChangeEvent, useState } from "react";
//event types
import { MouseEvent } from "react";
//axios
import axios from "axios";
//import component
import { getText } from "commons/libraries/utils";
//time
import moment from "moment";

//emotion
import * as S from "./WriteStyles";

const CATEGORY = [
  { name: "React" },
  { name: "Javascript" },
  { name: "Nodejs" },
  { name: "Aws" },
  { name: "Mysql" },
];

export default function Write(): JSX.Element {
  const state = useLocation().state;
  const [title, setTitle] = useState(state?.title || "");
  const [contents, setContents] = useState(state?.desc || "");
  const [cat, setCat] = useState(state?.cat || "react");
  const [dropCat, setDropCat] = useState(false);
  const navigate = useNavigate();

  const handleClick = async (
    event: MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    event.preventDefault();
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

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>): void => {
    setTitle(event.target.value);
  };

  const onChangeContents = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setContents(event.target.value);
  };

  const onClickCategory = (event: MouseEvent<HTMLDivElement>): void => {
    setCat(event.currentTarget.innerHTML);
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
                {CATEGORY.map((el) => (
                  <S.DropDownItems
                    checked={cat === el.name}
                    name="cat"
                    value={el.name}
                    onClick={onClickCategory}
                  >
                    {el.name}
                  </S.DropDownItems>
                ))}
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
          value={getText(contents) ?? ""}
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
