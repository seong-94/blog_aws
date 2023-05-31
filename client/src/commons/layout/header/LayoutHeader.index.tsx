import { Link } from "react-router-dom";
import {
  InnerButton,
  InnerLogo,
  InnerWrapper,
  Wrapper,
} from "./LayoutHeader.styles";

export default function LayoutHeader() {
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
