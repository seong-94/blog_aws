import { Link } from "react-router-dom";
import {
  InnerButton,
  InnerLogo,
  InnerWrapper,
  Wrapper,
  Avatar,
  DropMyPage,
  DropMypageItem,
} from "./LayoutHeaderStyles";
import { AuthContext } from "context/authContext";
import { useContext, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
export default function LayoutHeader() {
  const { currentUser, logout } = useContext(AuthContext);
  const [dropMypage, setDropMypage] = useState(false);

  const onClickDropMypage = () => {
    setDropMypage(!dropMypage);
  };
  return (
    <Wrapper>
      <InnerWrapper>
        <InnerLogo>
          <Link to="/">게시판</Link>
        </InnerLogo>
        <div>
          {currentUser ? (
            <>
              <InnerButton>
                <Avatar src="/images/avatar.png" />
                <AiFillCaretDown
                  style={{ marginBottom: 10, marginLeft: 10 }}
                  onClick={onClickDropMypage}
                />
                {dropMypage ? (
                  <DropMyPage>
                    <DropMypageItem onClick={onClickDropMypage}>
                      <Link to="/mypage">마이페이지</Link>
                    </DropMypageItem>
                    <DropMypageItem
                      onClick={() => {
                        logout();
                        onClickDropMypage();
                      }}
                    >
                      로그아웃
                    </DropMypageItem>
                  </DropMyPage>
                ) : (
                  <></>
                )}
              </InnerButton>
              {/* <InnerButton>
              </InnerButton> */}
            </>
          ) : (
            <>
              <InnerButton>
                <Link to="/login">로그인</Link>
              </InnerButton>
              <InnerButton>
                <Link to="/register">회원가입</Link>
              </InnerButton>
            </>
          )}
        </div>
      </InnerWrapper>
    </Wrapper>
  );
}
