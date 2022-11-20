import React from "react";
import { Link } from "react-router-dom";
import styles from "./Category.module.scss";
import { BiPencil } from "react-icons/bi";
function Category() {
  return (
    <div id={styles.category}>
      <h3>카테고리</h3>
      <div className={styles.wrapper}>
        <ul>
          <li>
            <Link className={styles.link_cat} to="/Write">
              <h6>
                <BiPencil />글 쓰기
              </h6>
            </Link>
          </li>
          <li>
            <Link className={styles.link_cat} to="/?cat=react">
              <h6>리액트</h6>
            </Link>
          </li>
          <li>
            <Link className={styles.link_cat} to="/?cat=javascript">
              <h6>자바스크립트</h6>
            </Link>
          </li>
          <li>
            <Link className={styles.link_cat} to="/?cat=nodejs">
              <h6>노드</h6>
            </Link>
          </li>
          <li>
            <Link className={styles.link_cat} to="/?cat=aws">
              <h6>AWS</h6>
            </Link>
          </li>
          <li>
            <Link className={styles.link_cat} to="/?cat=mysql">
              <h6>Mysql</h6>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Category;
