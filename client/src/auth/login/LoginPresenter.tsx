//react router
import { Link } from "react-router-dom";
//scss
import * as S from "./LoginStyles";
import { ILoginUIProps } from "./LoginTypes";
//react-toastify

export default function LoginPresent(props: ILoginUIProps) {
  return (
    <S.LoginWrapper>
      <S.LoginLabel>로그인</S.LoginLabel>
      <S.LoginForm>
        <S.LoginInput
          required
          type="text"
          placeholder="username"
          name="username"
          onChange={props.handleChange}
        />
        <S.LoginInput
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={props.handleChange}
        />
        <S.LoginButton onClick={props.handleSubmit}>로그인</S.LoginButton>
        {/* {props.err && <p>{props.err}</p>} */}
        <S.LoginSpan>
          아이디가 없으신가요?<Link to="/register">회원가입</Link>
        </S.LoginSpan>
      </S.LoginForm>
    </S.LoginWrapper>
  );
}
