import { Link } from "react-router-dom";
import {
  InnerButton,
  InnerLogo,
  InnerWrapper,
  Wrapper,
} from "./LayoutHeaderStyles";
import { AuthContext } from "context/authContext";
import { useContext } from "react";

export default function LayoutHeader() {
  const currentUser = useContext(AuthContext);

  return (
    <Wrapper>
      <InnerWrapper>
        <InnerLogo>
          <Link to="/">💎 게시판</Link>
        </InnerLogo>
        <div>
          <InnerButton>
            <Link to="/login">로그인</Link>
          </InnerButton>
          <InnerButton>
            <Link to="/register">회원가입</Link>
          </InnerButton>
        </div>
      </InnerWrapper>
    </Wrapper>
  );
}
