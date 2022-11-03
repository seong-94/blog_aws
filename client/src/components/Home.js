import React, { useState } from "react";
import Category from "./Category";

import List from "./List";
import NavBar from "./NavBar";

// import Paging from "./Pagination";

function Home() {
  const [listPerPage] = useState(10);
  return (
    <div className="home">
      <div className="home-left">
        <Category />
      </div>
      <div className="home_middle">
        <NavBar />
        <List listPerPage={listPerPage} />
      </div>

      <div className="home-right">right side (ad or side menu)</div>
    </div>
  );
}

export default Home;
