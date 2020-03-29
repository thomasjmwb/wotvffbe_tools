import React from "react";

export default function({ filterProperty, filterValue, click, active }) {
  return (
    <button
      className={active ? "active" : ""}
      onClick={e => click({ filterProperty, filterValue })}
    >
      {filterValue}
    </button>
  );
}
