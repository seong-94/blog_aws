import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Category.module.scss";
import { BiPencil, BiDownArrow, BiUpArrow } from "react-icons/bi";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FcHome } from "react-icons/fc";
function Category() {
  const [dropMenu, setDropMenu] = useState(false);
  const [dropMenu2, setDropMenu2] = useState(false);
  const [dropMenu3, setDropMenu3] = useState(false);
  const [sideMenu, setSideMenu] = useState(false);
  return (
    <div
      className={
        sideMenu ? [styles.category, styles.add].join(" ") : styles.category
      }
    >
      <div className={styles.cloes_btn}>
        <AiOutlineClose onClick={() => setSideMenu(!sideMenu)} size={30} />
      </div>
      <div className={styles.open_btn}>
        <AiOutlineMenu size={30} onClick={() => setSideMenu(!sideMenu)} />
      </div>
      <div className={styles.home_btn}>
        <Link to="/">
          <FcHome size={100} />
        </Link>
      </div>

      <div className={styles.link_write}>
        <Link to="/Write">
          <h4>
            <BiPencil /> 글 쓰기
          </h4>
        </Link>
      </div>

      <button onClick={() => setDropMenu(!dropMenu)} className={styles.cat_btn}>
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
      <div>
        <button
          onClick={() => setDropMenu2(!dropMenu2)}
          className={styles.cat_btn}
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
          className={styles.cat_btn}
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
  );
}

export default Category;
