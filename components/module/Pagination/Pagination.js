import React from "react";

export const Pagination = ({ postPerPage, totalPost, paginate }) => {
  const PageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
    PageNumbers.push(i);
  }
  return (
    <nav>
      <ul className="pagination">
        {PageNumbers.map((number) => (
          <li key={number} className="page-items">
            <a
              onClick={() => {
                paginate(number);
              }}
              className="page-link"
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
