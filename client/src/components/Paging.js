import Pagination from "react-js-pagination";

function Paging({ page, count, setPage }) {
  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={10}
      totalItemsCount={count ? count : 0}
      pageRangeDisplayed={10}
      prevPageText={"‹"}
      nextPageText={"›"}
      onChange={setPage}
    />
  );
}

export default Paging;
