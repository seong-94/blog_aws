import { Link } from "react-router-dom";
import * as S from "./SearchBarStyles";
import { BsPencil } from "react-icons/bs";

export default function SearchBar(props) {
  return (
    <>
      <S.Warpper>
        <form onSubmit={(e) => props.onSearch(e)}>
          <S.Searchbar>
            <S.SubmitButton type="submit" value="검색">
              <S.AiOutlineSearchIcon />
            </S.SubmitButton>
            <S.SearchbarInput
              type="text"
              maxLength="20"
              placeholder="검색어를 입력해 주세요."
              value={props.search}
              onChange={props.onChangeSearch}
            />
          </S.Searchbar>
        </form>
        <S.WirteButton>
          <Link to="/write">
            <BsPencil /> 글 작성하기
          </Link>
        </S.WirteButton>
      </S.Warpper>
    </>
  );
}
