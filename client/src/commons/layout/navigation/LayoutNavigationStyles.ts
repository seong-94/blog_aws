import styled from "@emotion/styled";

export const Wrapper = styled.div`
  height: 64px;
  background-color: #8989ff;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 1.3rem;
  color: white;
`;

export const MenuItem = styled.div`
  margin: 0px 60px;
  cursor: pointer;
  a {
    color: white;
    text-decoration: none;
    :hover {
      color: orange;
    }
  }
`;
