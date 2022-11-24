import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Category.module.scss";
import { BiPencil, BiDownArrow, BiUpArrow } from "react-icons/bi";
import { FcHome } from "react-icons/fc";
function Category() {
  const [dropMenu, setDropMenu] = useState(false);
  const [dropMenu2, setDropMenu2] = useState(false);
  const [dropMenu3, setDropMenu3] = useState(false);

  return (
    <div id={styles.category}>
      <div className={styles.home_btn}>
        <Link to="/">
          <FcHome size={100} />
        </Link>
      </div>
      <div>
        <Link className={styles.link_write} to="/Write">
          <h4>
            <BiPencil /> 글 쓰기
          </h4>
        </Link>
        <div>
          <button
            onClick={() => setDropMenu(!dropMenu)}
            className={styles.cat_front}
          >
            Front-End
            <span>{dropMenu ? <BiUpArrow /> : <BiDownArrow />}</span>
          </button>
          <ul>
            <li>
              <Link
                className={dropMenu ? `${styles.link_cat}` : `${styles.none}`}
                to="/?cat=react"
              >
                <h6>리액트</h6>
              </Link>
            </li>
            <li>
              <Link
                className={dropMenu ? `${styles.link_cat}` : `${styles.none}`}
                to="/?cat=javascript"
              >
                <h6>자바스크립트</h6>
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <button
            onClick={() => setDropMenu2(!dropMenu2)}
            className={styles.cat_back}
          >
            Back-End
            <span>{dropMenu2 ? <BiUpArrow /> : <BiDownArrow />}</span>
          </button>
          <ul>
            <li>
              <Link
                className={dropMenu2 ? `${styles.link_cat}` : `${styles.none}`}
                to="/?cat=nodejs"
              >
                <h6>노드</h6>
              </Link>
            </li>
            <li>
              <Link
                className={dropMenu2 ? `${styles.link_cat}` : `${styles.none}`}
                to="/?cat=aws"
              >
                <h6>AWS</h6>
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <button
            onClick={() => setDropMenu3(!dropMenu3)}
            className={styles.cat_db}
          >
            DataBase
            <span>{dropMenu3 ? <BiUpArrow /> : <BiDownArrow />}</span>
          </button>
          <ul>
            <li>
              <Link
                className={dropMenu3 ? `${styles.link_cat}` : `${styles.none}`}
                to="/?cat=mysql"
              >
                <h6>Mysql</h6>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Category;
