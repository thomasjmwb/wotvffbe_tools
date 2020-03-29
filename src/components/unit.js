import React from "react";
export default function Unit({ unit }) {
  return (
    <div className="unit">
      <img className="img" src={unit.img} alt={unit.name} />
      <div className="name">{unit.name}</div>
    </div>
  );
}
