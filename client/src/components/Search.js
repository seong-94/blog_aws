// import axios from "axios";
// import React, { useState } from "react";

// function Search({ setPosts }) {
//   const [search, setSearch] = useState("");

//   const onChangeSearch = (e) => {
//     e.preventDefault();
//     setSearch(e.target.value);
//   };

//   const Search = (e) => {
//     e.preventDefault();
//     if (search === null || search === "") {
//       axios.get(`/posts`).then((res) => {
//         setPosts;
//       });
//     }
//   };
//   // const handleButton = async () => {
//   //   try {
//   //     const res = await axios.get(`/`);
//   //     if (res && res.status === 200) {
//   //       const { data } = res;
//   //       console.log(data);
//   //       setPosts(data.items);
//   //     }
//   //   } catch (e) {
//   //     console.log("error ", e);
//   //   }
//   // };
//   return (
//     <div>
//       <form onSubmit={(e) => onSearch(e)}>
//         <input
//           type="text"
//           maxLength="20"
//           value={search}
//           className="search_input"
//           name="search"
//           placeholder="검색어를 입력해주세요."
//         />
//         <input
//           type="submit"
//           value="검색"
//           className="serach_submit"
//           // onClick={handleButton}
//         />
//       </form>
//     </div>
//   );
// }

// export default Search;
