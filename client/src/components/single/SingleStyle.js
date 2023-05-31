import styled from "@emotion/styled";
// import ReactPlayer from "react-player";

export const Wrapper = styled.div`
  width: 1200px;
  margin: 50px auto;
`;

export const CardWrapper = styled.div`
  border: 1px solid black;
  padding-top: 80px;
  padding-bottom: 100px;
  padding-left: 102px;
  padding-right: 102px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  box-shadow: 0px 0px 10px gray;
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #bdbdbd;
  padding-bottom: 20px;
`;

export const AvatarWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Avatar = styled.img`
  margin-right: 10px;
  height: 60px;
  margin: 10px 5px;
`;

export const Info = styled.div`
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Writer = styled.div``;

export const CreatedAt = styled.div`
  display: flex;
`;
export const PostViews = styled.div`
  margin-left: 10px;
`;

export const Body = styled.div`
  width: 100%;
  height: 700px;
`;

export const Title = styled.h1`
  padding-top: 40px;
  font-size: 2rem;
  font-weight: 600;
`;

export const Contents = styled.div`
  min-height: 300px;
  padding-top: 40px;
  padding-bottom: 120px;
`;

export const BottomWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-top: 80px;
`;

export const Button = styled.button`
  width: 179px;
  height: 45px;
  background-color: white;
  border: 1px solid gray;
  margin: 0px 12px;
  cursor: pointer;
  font-weight: 600;
  a {
    color: black;
    text-decoration: none;
  }

  :hover {
    background-color: gold;
    border-color: white;
  }
`;

export const IconWrapper = styled.div`
  text-align: center;
`;

// export const Youtube = styled(ReactPlayer)`
//   margin: auto;
// `;

export const LikeWrapper = styled.div`
  padding-top: 100px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
`;
export const LikeButton = styled.button`
  padding: 8px;
  border-radius: 8px;
  border: 0.5px solid #999;
`;
