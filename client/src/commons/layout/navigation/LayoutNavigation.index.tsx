import { Fragment } from "react";
import { MenuItem, Wrapper } from "./LayoutNavigation.styles";
import { Link } from "react-router-dom";

const NAVIGATION_MENUS = [
  { name: "React", page: "/?cat=react" },
  { name: "Javascript", page: "/?cat=javascript" },
  { name: "Nodejs", page: "/?cat=nodejs" },
  { name: "Aws", page: "/?cat=aws" },
  { name: "Mysql", page: "/?cat=mysql" },
];

export default function LayoutNavigation() {
  return (
    <Wrapper>
      {NAVIGATION_MENUS.map((el) => (
        <Fragment key={el.page}>
          <MenuItem id={el.page}>
            <Link to={el.page}>{el.name}</Link>
          </MenuItem>
        </Fragment>
      ))}
    </Wrapper>
  );
}
