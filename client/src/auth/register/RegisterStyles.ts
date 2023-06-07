import styled from "@emotion/styled";

export const RegisterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: lemonchiffon;
`;

export const RegisterLabel = styled.div`
  font-size: 20px;
  color: teal;
  margin-bottom: 20px;
`;

export const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 50px;
  background-color: white;
  width: 200px;
  gap: 20px;
`;

export const RegisterInput = styled.input`
  padding: 10px;
  border: none;
  border-bottom: 1px solid gray;
`;

export const RegisterButton = styled.button`
  padding: 10px;
  border: none;
  background-color: teal;
  cursor: pointer;
  color: white;
`;

export const RegisterSpan = styled.span`
  font-size: 12px;
  text-align: center;
`;

export const RegisterErr = styled.span`
  font-size: 12px;
  color: red;
  text-align: center;
`;
