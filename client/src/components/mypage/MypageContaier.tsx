import React, { useContext, useEffect, useState } from "react";
import MypagePresenter from "./MypagePresenter";
import axios from "axios";
import { AuthContext } from "context/authContext";

export default function MypageContaier() {
  const { currentUser } = useContext(AuthContext);
  //get posts
  const [posts, setPosts] = useState<any[]>([]);
  //search for posts
  // const [search, setSearch] = useState("");

  //pagination
  const [startPage, setStartPage] = useState(0);
  const [endPage, setEndPage] = useState(10);
  const [itemCount, setItemCount] = useState(0);

  // get posts data
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const res = await axios.get(`/posts/mypage/${currentUser.users_id}`, {
          params: {
            StartPage: startPage,
            EndPage: endPage,
          },
        });
        const resCount = await axios.get(
          `/posts/count/${currentUser.users_id}`
        );
        setItemCount(resCount.data);
        setPosts(res.data);
      } catch (err: any) {
        alert(err.response.data);
      }
    };
    fetchData();
  }, [currentUser, endPage, startPage]);

  const onClickPrevPage = (): void => {
    if (startPage < 1) return alert("처음 페이지 입니다.");
    setStartPage(startPage - 11);
    setEndPage(endPage - 11);
  };

  const onClickNextPage = (): void => {
    if (endPage >= Object.keys(itemCount).length)
      return alert("마지막 페이지 입니다.");
    setStartPage(startPage + 11);
    setEndPage(endPage + 11);
  };
  return (
    <>
      <MypagePresenter
        posts={posts}
        currentUser={currentUser}
        onClickNextPage={onClickNextPage}
        onClickPrevPage={onClickPrevPage}
      />
    </>
  );
}
