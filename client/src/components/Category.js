import React from "react";
import { Link } from "react-router-dom";

function Category() {
  return (
    <div id="category">
      <h3>카테고리</h3>
      <div className="wrapper">
        <ul>
          <li>
            <Link className="link_cat" to="/">
              <h6>전체 게시판</h6>
            </Link>
          </li>
          <li>
            <Link className="link_cat" to="/?cat=react">
              <h6>리액트</h6>
            </Link>
          </li>
          <li>
            <Link className="link_cat" to="/?cat=javascript">
              <h6>자바스크립트</h6>
            </Link>
          </li>
          <li>
            <Link className="link_cat" to="/?cat=nodejs">
              <h6>노드</h6>
            </Link>
          </li>
          <li>
            <Link className="link_cat" to="/?cat=aws">
              <h6>AWS</h6>
            </Link>
          </li>
          <li>
            <Link className="link_cat" to="/?cat=mysql">
              <h6>Mysql</h6>
            </Link>
          </li>
        </ul>
        <div className="links"></div>
      </div>
    </div>
  );
}

export default Category;
