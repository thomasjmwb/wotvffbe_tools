import React from "react";

export default function({ element, click, active }) {
  return (
    <button
      className={active ? "active" : ""}
      onClick={e => click({ element })}
    >
      {element}
    </button>
  );
}
