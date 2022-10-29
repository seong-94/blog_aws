import Pagination from "react-js-pagination";

function Paging({ page, count, setPage }) {
  // const numPages = Math.ceil(total / limit);

  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={10}
      totalItemsCount={count}
      pageRangeDisplayed={5}
      prevPageText={"‹"}
      nextPageText={"›"}
      onChange={setPage}
    />
  );
}

export default Paging;
