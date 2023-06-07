import { useState } from "react";
//react router
import { Link, useNavigate } from "react-router-dom";
//scss
import * as S from "./RegisterStyles";
//react toastify

import { IRegisterUIProps } from "./RegisterTypes";

export default function RegisterPresenter(props: IRegisterUIProps) {
  return (
    <S.RegisterWrapper>
      <S.RegisterLabel>회원 가입</S.RegisterLabel>
      <S.RegisterForm>
        <S.RegisterInput
          required
          type="text"
          placeholder="username"
          name="username"
          onChange={props.handleChange}
        />
        <S.RegisterInput
          required
          type="email"
          id="email"
          placeholder="email"
          name="email"
          onChange={props.handleChange}
        />
        <S.RegisterInput
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={props.handleChange}
        />
        <S.RegisterButton onClick={props.handleSubmit}>
          회원가입
        </S.RegisterButton>
        {/* {err && <p>{err}</p>} */}
        <S.RegisterSpan>
          이미 회원 이신가요? <Link to="/login">로그인</Link>
        </S.RegisterSpan>
      </S.RegisterForm>
    </S.RegisterWrapper>
  );
}
