import React, { useState } from "react";
import List from "../list/List";
import styles from "./Home.module.scss";

function Home() {
  const [listPerPage] = useState(15);
  return (
    <div className={styles.home}>
      <List listPerPage={listPerPage} />
    </div>
  );
}

export default Home;
