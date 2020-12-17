import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { Pagination } from "react-bootstrap";

const Paginate = (props) => {
Paginate.propTypes = {
  itemsCounts: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  };
  
  const { itemsCounts, pageSize, currentPage, onPageChange } = props;
  const pagesCount = Math.ceil(itemsCounts / pageSize); //Math.ceil convert float to integer greater then or equal to the float number
  if (pagesCount === 1) return null;

  let items = [];
  for (let number = 1; number <= pagesCount; number++) {
    items.push(
      <Pagination.Item
        key={number}
        className={number === currentPage ? "page-item active" : "page-item"}
        onClick={() => onPageChange(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <React.Fragment>
      <Pagination>{items}</Pagination>
    </React.Fragment>
  );
};


export default Paginate;
