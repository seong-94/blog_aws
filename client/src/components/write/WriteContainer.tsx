//routers
import { useLocation, useNavigate } from "react-router-dom";
//hooks
import { ChangeEvent, useState } from "react";
//event types
import { MouseEvent } from "react";
//axios
import axios from "axios";
//import component
//time
import moment from "moment";

//emotion
import WritePresenter from "./WritePresenter";

export default function WriteContainer(): JSX.Element {
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

  const onClickDropCategory = () => {
    setDropCat(!dropCat);
  };
  return (
    <>
      <WritePresenter
        onClickCategory={onClickCategory}
        onChangeContents={onChangeContents}
        onChangeTitle={onChangeTitle}
        handleClick={handleClick}
        onClickDropCategory={onClickDropCategory}
        dropCat={dropCat}
        title={title}
        contents={contents}
        state={state}
        cat={cat}
      />
    </>
  );
}
