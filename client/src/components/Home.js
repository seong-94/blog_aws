import React, { useState } from "react";
import List from "./List";
import styles from "./Home.module.scss";

function Home() {
  const [listPerPage] = useState(10);
  return (
    <div className={styles.home}>
      <List listPerPage={listPerPage} />
    </div>
  );
}

export default Home;
