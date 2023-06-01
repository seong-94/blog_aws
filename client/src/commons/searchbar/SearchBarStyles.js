import styled from "@emotion/styled";
import { AiOutlineSearch } from "react-icons/ai";

export const Warpper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin: 25px auto;
`;
export const Searchbar = styled.div`
  width: 656px;
  height: 52px;
  border-radius: 15px;
  background-color: #f5f2fc;
  padding: 0px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const AiOutlineSearchIcon = styled(AiOutlineSearch)`
  color: #5729ff;
  font-size: 30px;
  cursor: pointer;

  :hover {
    color: red;
  }
`;

export const SearchbarInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background: none;
  margin: 0px 20px;
`;

export const SubmitButton = styled.button`
  border: none;
`;
export const WirteButton = styled.button`
  border: 1px solid #e2e2e2;
  padding: 15px;
  border-radius: 5px;
  text-align: center;
  background-color: #f5f2fc;

  /* Black */
  a {
    color: black;
    text-decoration: none;
  }
`;
