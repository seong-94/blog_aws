import React, { useState, useContext } from "react";
import * as S from "./CommentListStyles";
import axios from "axios";
import { AuthContext } from "context/authContext";
import { getDate } from "commons/libraries/utils";

export default function CommentListItem(props) {
  const { currentUser } = useContext(AuthContext);
  const [isEdit, setIsEdit] = useState(false);

  const handleDeleteClick = async (e, id) => {
    e.preventDefault();
    try {
      await axios.delete(`/comments/${id}}`);
      alert("댓글 이 삭제 돼었습니다.");
      window.location.replace(`/post/${props.postId}`);
    } catch (err) {
      alert(err.request.responseText);
    }
  };

  const onClickUpdate = () => {
    setIsEdit(true);
  };

  return (
    <>
      {!isEdit ? (
        <S.ItemWrapper key={props.comment.id}>
          <S.FlexWrapper>
            <S.Avatar src="/images/avatar.png" />
            <S.MainWrapper>
              <S.WriterWrapper>
                <S.Writer>{props.comment.username}</S.Writer>
              </S.WriterWrapper>
              <S.Contents>{props.comment.desc}asdasd</S.Contents>
            </S.MainWrapper>
            <S.OptionWrapper>
              <S.UpdateIcon
                src="/images/boardComment/list/update_icon.png"
                onClick={onClickUpdate}
              />
              <S.DeleteIcon
                src="/images/boardComment/list/delete_icon.png"
                onClick={handleDeleteClick}
              />
            </S.OptionWrapper>
          </S.FlexWrapper>
          <S.DateString>{getDate(props.comment.date)}</S.DateString>
        </S.ItemWrapper>
      ) : (
        <div>미적용중 </div>
      )}
    </>
  );
}
