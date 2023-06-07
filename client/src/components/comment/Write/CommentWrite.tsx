import axios from "axios";
import { AuthContext } from "context/authContext";
import { useState, useContext, ChangeEvent, MouseEvent } from "react";
import * as S from "./CommentWriteStyles";
import moment from "moment";
import { ICommentWriteProps } from "./CommentWriteTypes";

export default function CommentWrite(props: ICommentWriteProps) {
  const { currentUser } = useContext(AuthContext);
  const [desc, setDesc] = useState("");
  const username = currentUser ? currentUser.username : null;

  const onHandleSubmit = async (
    event: MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    event.preventDefault();
    if (desc === "") {
      alert("내용을 입력해주세요");
      return;
    }
    try {
      await axios.post(`/comments`, {
        postId: props.postId,
        name: username,
        desc: desc,
        date: moment(Date.now()),
      });
      window.location.replace(`/post/${props.postId}`);
      alert("댓글 성공");
    } catch (err: any) {
      alert(err.request.responseText);
    }
  };

  // const onHandleUpdate = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await axios.put(`/posts/${state.id}`, {
  //       desc: desc,
  //     });

  //     alert("성공적으로 입력돼었습니다.");
  //   } catch (err) {
  //     alert(err);
  //   }
  // };

  const onChangeContents = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setDesc(event.target.value);
  };
  const onClickCancle = (event: MouseEvent<HTMLButtonElement>): void => {
    props.setIsEdit(!props.isEdit);
  };

  return (
    <>
      <S.Wrapper>
        <S.ContentsWrapper>
          <S.Contents
            maxLength={100}
            type="text"
            placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
            value={desc}
            onChange={onChangeContents}
          ></S.Contents>
          <S.BottomWrapper>
            <S.ContentsLength>
              {desc.length}
              /100
            </S.ContentsLength>
            <S.Button onClick={onHandleSubmit}>
              {props.isEdit ? "수정하기" : "등록하기"}
            </S.Button>
            {props.isEdit ? (
              <S.Button onClick={onClickCancle}>취소</S.Button>
            ) : (
              <></>
            )}
          </S.BottomWrapper>
        </S.ContentsWrapper>
      </S.Wrapper>
    </>
  );
}
