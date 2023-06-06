//import component
import { getText } from "commons/libraries/utils";

//emotion
import * as S from "./WriteStyles";
import { IWriteUIProps } from "./WriteTypes";

const CATEGORY = [
  { name: "React" },
  { name: "Javascript" },
  { name: "Nodejs" },
  { name: "Aws" },
  { name: "Mysql" },
];

export default function WritePresenter(props: IWriteUIProps): JSX.Element {
  return (
    <S.Wrapper>
      <S.Title>게시글 등록</S.Title>
      <S.WriterWrapper>
        <S.InputWrapper>
          <S.CategoryWrapper>
            <S.CategoryButton onClick={props.onClickDropCategory}>
              <S.DropContent>
                {props.cat ? props.cat : "Category"}
              </S.DropContent>
            </S.CategoryButton>
            {props.dropCat ? (
              <S.DropDownContent>
                {CATEGORY.map((el, index) => (
                  <S.DropDownItems
                    checked={props.cat === el.name}
                    name="cat"
                    value={el.name}
                    onClick={props.onClickCategory}
                    key={index}
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
            value={props.title}
            onChange={props.onChangeTitle}
          />
        </S.InputWrapper>
      </S.WriterWrapper>

      <S.InputWrapper>
        <S.Label>내용</S.Label>
        <S.Contents
          type="text"
          placeholder="내용을 입력해주세여"
          value={getText(props.contents) ?? ""}
          onChange={props.onChangeContents}
        />
      </S.InputWrapper>

      <S.ImageWrapper>
        <S.Label>사진첨부</S.Label>
        <S.UploadButton>+</S.UploadButton>
        <S.UploadButton>+</S.UploadButton>
        <S.UploadButton>+</S.UploadButton>
      </S.ImageWrapper>
      <S.ButtonWrapper>
        <S.SubmitButton onClick={props.handleClick}>저장하기</S.SubmitButton>
      </S.ButtonWrapper>
    </S.Wrapper>
  );
}
