import styled from "@emotion/styled";

export const Wrapper = styled.div`
  height: 90px;
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

export const Avatar = styled.img`
  color: #5729ff;
  cursor: pointer;
  font-weight: 600;
`;
export const DropMyPage = styled.div`
  position: absolute;
  overflow-x: hidden;
  z-index: 1;
  font-weight: 400;
  background-color: #fcfcfc;
  min-width: 130px;
  border-radius: 8px;
  height: 100px;
  overflow: scroll;
  box-shadow: 0px 0px 10px 3px rgba(190, 190, 190, 0.6);
  ::-webkit-scrollbar {
    width: 5px;
    height: 10px;
  }
`;

export const DropMypageItem = styled.div`
  display: block;
  text-decoration: none;
  color: rgb(37, 37, 37);
  font-size: 1rem;
  padding: 12px 0 0 20px;
  cursor: pointer;
`;
