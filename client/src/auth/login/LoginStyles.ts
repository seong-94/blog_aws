import styled from "@emotion/styled";

export const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: lemonchiffon;
`;

export const LoginLabel = styled.div`
  font-size: 20px;
  color: teal;
  margin-bottom: 20px;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 50px;
  background-color: white;
  width: 200px;
  gap: 20px;
`;

export const LoginInput = styled.input`
  padding: 10px;
  border: none;
  border-bottom: 1px solid gray;
`;

export const LoginButton = styled.button`
  padding: 10px;
  border: none;
  background-color: teal;
  cursor: pointer;
  color: white;
`;

export const LoginSpan = styled.span`
  font-size: 12px;
  text-align: center;
`;

export const LoginErr = styled.span`
  font-size: 12px;
  color: red;
  text-align: center;
`;
