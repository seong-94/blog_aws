import styled from "@emotion/styled";

export const Wrapper = styled.div`
  width: 1200px;
  /* height: 1847px; */
  border: 1px solid black;
  margin: 50px auto;
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

export const Title = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 36px;
  font-weight: bold;
`;

export const WriterWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding-top: 40px;
`;

export const Writer = styled.input`
  width: 486px;
  height: 52px;
  padding-left: 16px;
  border: 1px solid #bdbdbd;
`;

export const Categoty = styled.input`
  width: 486px;
  height: 52px;
  padding-left: 16px;
  border: 1px solid #bdbdbd;
`;

export const Label = styled.div`
  padding-bottom: 16px;
  font-size: 16px;
  font-weight: 500;
`;

export const InputWrapper = styled.div`
  padding-top: 40px;
`;

export const Subject = styled.input`
  width: 806px;
  height: 52px;
  padding-left: 16px;
  border: 1px solid #bdbdbd;
`;

export const Contents = styled.textarea`
  width: 996px;
  height: 480px;
  padding-left: 16px;
  padding: 14px;
  border: 1px solid #bdbdbd;
`;

export const ImageWrapper = styled.div`
  width: 996px;
  padding-top: 40px;
`;

export const UploadButton = styled.button`
  width: 78px;
  height: 78px;
  background-color: #bdbdbd;
  margin-right: 24px;
  outline: none;
  border: none;
  cursor: pointer;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-top: 80px;
`;

export const CancelButton = styled.button`
  width: 179px;
  height: 52px;
  background-color: #bdbdbd;
  border: none;
  font-size: 16px;
  font-weight: 500;
  margin-left: 12px;
  margin-right: 12px;
  cursor: pointer;
`;

export const SubmitButton = styled.button`
  width: 179px;
  height: 52px;
  border: none;
  font-size: 16px;
  font-weight: 500;
  margin-left: 12px;
  margin-right: 12px;
  cursor: pointer;
  :hover {
    background-color: #bdbdbd;
  }
`;

export const Error = styled.div`
  padding-top: 10px;
  font-size: 14px;
  color: red;
`;
export const LikeButton = styled.button`
  padding: 8px;
  border-radius: 8px;
  border: 0.5px solid #999;
`;
export const CategoryWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const CategoryButton = styled.button`
  position: relative;
  margin-top: 40px;
  /* margin-left: 10px; */
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  background-color: #efefef;
  font-weight: 500;
  width: 130px;
  text-align: center;
  cursor: pointer;
  font-size: 1.2rem;
  z-index: 1;
  :hover {
    background-color: #a2a2a2;
  }
`;

export const None = styled.div`
  display: none;
`;
export const DropContent = styled.span``;

export const DropDownContent = styled.div`
  position: absolute;
  overflow-x: hidden;
  z-index: 1;
  font-weight: 400;
  background-color: #fcfcfc;
  min-width: 130px;
  border-radius: 8px;
  height: 160px;
  overflow: scroll;
  box-shadow: 0px 0px 10px 3px rgba(190, 190, 190, 0.6);
  ::-webkit-scrollbar {
    width: 5px;
    height: 10px;
  }
`;
export const DropDownItems = styled.div`
  display: block;
  text-decoration: none;
  color: rgb(37, 37, 37);
  font-size: 1rem;
  padding: 12px 0 0 20px;
  cursor: pointer;
`;
