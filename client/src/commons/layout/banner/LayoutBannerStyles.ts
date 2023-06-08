import styled from "@emotion/styled";

export const Wrapper = styled.div`
  height: 400px;
`;

export const SliderItem = styled.img`
  background-size: cover;
  width: 55%;
  overflow: hidden;
  margin: 0 auto;
  /* 위에는 이미지를 div에 꽉 채우기 위한 3가지 설정 */
  height: 400px; /* slick 이미지 height 고정 */
`;
