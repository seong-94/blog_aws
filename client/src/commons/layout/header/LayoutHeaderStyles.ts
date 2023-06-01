import styled from "@emotion/styled";

export const Wrapper = styled.div`
  height: 102px;
  background-color: #e3e3ff;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /* font-family: "Jua", sans-serif; */
`;

export const InnerWrapper = styled.div`
  width: 1200px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
`;

export const InnerLogo = styled.div`
  font-size: 30px;
  font-weight: bold;
  font-family: "live";
  font-style: italic;
  font-weight: 600;
  color: #5729ff;
  cursor: pointer;
  a {
    color: black;
    text-decoration: none;
  }
`;

export const InnerButton = styled.span`
  margin: 10px;
  color: #5729ff;
  cursor: pointer;
  font-weight: 600;
  a {
    color: black;
    text-decoration: none;
  }
`;
