import React from "react";
export default function Unit({ unit }) {
  return (
    <div className="unit">
      <img
        className="img"
        width="100"
        height="100"
        src={unit.img}
        alt={unit.name}
      />
      <div className="name">{unit.name}</div>
    </div>
  );
}
