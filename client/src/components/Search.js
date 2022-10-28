import axios from "axios";
import React from "react";

function Search({ onchange, value, setPosts }) {
  const handleButton = async () => {
    try {
      const res = await axios.get(`/`);
      if (res && res.status === 200) {
        const { data } = res;
        console.log(data);
        setPosts(data.items);
      }
    } catch (e) {
      console.log("error ", e);
    }
  };

  return (
    <div>
      <form>
        <input
          type="text"
          maxLength="20"
          className="search_input"
          name="search"
          placeholder="검색어를 입력해주세요."
        />
        <input
          type="submit"
          value="검색"
          className="serach_submit"
          // onClick={handleButton}
        />
      </form>
    </div>
  );
}

export default Search;
