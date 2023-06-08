import * as S from "./MypageStyles";
import { Link } from "react-router-dom";
import { IMypageUIProps } from "./MypageTypes";
import MypageList from "./MypageComponents/MypageList";

const MYPAGE_MENUS = [
  { name: "내 프로필", page: "/mypage" },
  { name: "좋아요", page: "/mypage" },
  { name: "내가 작성한 글", page: "/mypage" },
];

export default function MypagePresenter(props: IMypageUIProps) {
  return (
    <S.Wrapper>
      <S.LeftMenu>
        <S.MypageLabel>MY PAGE </S.MypageLabel>
        <S.AvatarWrapper>
          <S.Avatar src="/images/avatar.png" />
          <S.User>{props.currentUser.username}</S.User>
        </S.AvatarWrapper>
        <S.MypageMenusWrapper>
          {MYPAGE_MENUS.map((el) => (
            <S.MenuItem>
              <Link to={el.page}>{el.name}</Link>
            </S.MenuItem>
          ))}
        </S.MypageMenusWrapper>
      </S.LeftMenu>
      <S.MypageListWrapper>
        <S.RigthMenu>
          <MypageList posts={props.posts} />
        </S.RigthMenu>
        <S.PaginationWrapper>
          <S.Page onClick={props.onClickPrevPage}>{`<`}</S.Page>
          <S.Page onClick={props.onClickNextPage}>{`>`}</S.Page>
        </S.PaginationWrapper>
      </S.MypageListWrapper>
    </S.Wrapper>
  );
}
