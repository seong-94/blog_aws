import React, { useState } from "react";
import List from "../list/List";
import { HomeWrapper } from "./Homestyles";

export default function Home() {
  const [listPerPage] = useState(15);
  return (
    <HomeWrapper>
      <List listPerPage={listPerPage} />
    </HomeWrapper>
  );
}
