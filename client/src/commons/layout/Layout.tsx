import LayoutBanner from "./banner/LayoutBanner";
import LayoutHeader from "./header/LayoutHeader";
import LayoutNavigation from "./navigation/LayoutNavigation";
import styled from "@emotion/styled";

const Body = styled.div`
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface ILayoutProps {
  children: JSX.Element;
}
export default function Layout(props: ILayoutProps) {
  return (
    <>
      <LayoutHeader />
      <LayoutBanner />
      <LayoutNavigation />
      <Body>{props.children}</Body>
    </>
  );
}
