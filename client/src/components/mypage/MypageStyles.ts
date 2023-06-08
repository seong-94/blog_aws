import styled from "@emotion/styled";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 850px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export const LeftMenu = styled.div`
  display: flex;
  width: 20%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const MypageListWrapper = styled.div`
  display: flex;
  width: 65%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const MypageLabel = styled.div`
  padding-bottom: 16px;
  font-size: 36px;
  font-weight: 1000;
`;

export const AvatarWrapper = styled.div`
  margin: 120px 0 70px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Avatar = styled.img`
  margin-right: 10px;
  height: 60px;
  margin: 10px 5px;
`;
export const User = styled.div`
  font-size: 1.3rem;
`;

export const MypageMenusWrapper = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
`;

export const MenuItem = styled.div`
  margin: 10px 60px;
  cursor: pointer;
  a {
    font-size: 1.2em;
    color: black;
    text-decoration: none;
    :hover {
      font-weight: bolder;
    }
  }
`;

export const InnerWrapper = styled.div``;

export const ListWrapper = styled.ul`
  border-bottom: 1px solid #ababab;
  padding-top: 10px;
  font-family: "Noto Sans KR", sans-serif;
  a {
    color: #000;
    text-decoration: none;
  }
`;

export const List = styled.li``;

export const CategoryName = styled.span`
  margin: 0 10px 0 10px;
  color: rgb(243, 147, 22);
`;
export const ListTitle = styled.span`
  margin: 0 0 0 10px;
`;

export const ListTItem = styled.span`
  font-size: 0.9em;
  margin: 3px;
  color: black;
`;

export const RigthMenu = styled.div`
  width: 95%;
  border-top: 2px solid black;
  border-bottom: 2px solid black;
`;
export const ListUnderWrapper = styled.div`
  font-weight: 600;
  margin-left: 70px;
`;

export const Page = styled.span`
  margin: 0px 10px;
  color: "black";
  font-weight: "normal";
  cursor: "pointer";
  :hover {
    cursor: "none";
    font-weight: "bold";
    color: "blue";
  }
`;
export const PaginationWrapper = styled.div``;
// export const MypageListWrapper = styled.div``;
// export const MypageListWrapper = styled.div``;
// export const MypageListWrapper = styled.div``;
