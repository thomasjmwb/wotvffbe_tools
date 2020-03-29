import React, { useState, useEffect } from "react";
import Unit from "./components/unit";
import ElementFilter from "./components/element-filter";
import "./App.css";
import UnitService from "./services/unit-service";
function App() {
  const [filters, setFilters] = useState({ elements: {} });
  const [units, setUnits] = useState([]);
  useEffect(() => {
    UnitService.filterUnits(filters).then(filteredUnits => {
      setUnits(filteredUnits);
    });
  }, [filters]);
  // UnitService.getUnits().then(units => {
  //   setUnits(units);
  // });
  const toggleFilters = function({ element }) {
    const filtersCopy = JSON.parse(JSON.stringify(filters));
    const filterActive = !!filters.elements[element];
    if (filterActive) {
      delete filtersCopy.elements[element];
    } else {
      filtersCopy.elements[element] = true;
    }
    setFilters(filtersCopy);
  };

  const elementTypes = [
    "fire",
    "ice",
    "wind",
    "earth",
    "lightning",
    "water",
    "light",
    "dark"
  ];
  // const units = [{ name: "test" }];
  return (
    <div className="App">
      <header className="App-header"></header>
      <div className="filters">
        <div className="elements">
          {elementTypes.map(element => (
            <ElementFilter
              key={element}
              element={element}
              active={filters.elements[element]}
              click={toggleFilters}
            ></ElementFilter>
          ))}
        </div>
      </div>
      <div className="units-list">
        {units.map(unit => {
          return <Unit unit={unit} key={unit.name}></Unit>;
        })}
      </div>
    </div>
  );
}

export default App;
