import React, { useState, useEffect } from "react";
import Unit from "./components/unit";
import ToggleFilterButton from "./components/toggle-filter-button";
import "./App.css";
import UnitService from "./services/unit-service";
import ReactGA from "react-ga";
ReactGA.initialize("UA-162177681-1");
ReactGA.pageview(window.location.pathname + window.location.search);
const todos = [
  "Fix any incorrect unit data",
  "Add ability to put your own composition of units in, show total resistances etc",
  "Composition helper",
  "Composition counter tool",
  "improve mobile experience"
];
const filtersTemplate = {
  elementTypes: [],
  elementResistances: [],
  name: "",
  rarities: [],
  attackResistances: [],
  attackTypes: []
};
function App() {
  const [filters, setFilters] = useState(filtersTemplate);
  const [units, setUnits] = useState([]);
  useEffect(() => {
    UnitService.filterUnits(filters).then(filteredUnits => {
      setUnits(filteredUnits);
    });
  }, [filters]);

  const toggleFilters = function({ filterProperty, filterValue }) {
    const filtersCopy = JSON.parse(JSON.stringify(filters));
    const filterActive = filters[filterProperty].includes(filterValue);
    if (filterActive) {
      const valueIndex = filtersCopy[filterProperty].indexOf(filterValue);
      filtersCopy[filterProperty].splice(valueIndex, 1);
    } else {
      filtersCopy[filterProperty].push(filterValue);
    }
    setFilters(filtersCopy);
  };
  const applyNameFilter = function(text) {
    const filtersCopy = JSON.parse(JSON.stringify(filters));
    filtersCopy.name = text;
    setFilters(filtersCopy);
  };

  const elementTypes = [
    "Fire",
    "Ice",
    "Wind",
    "Earth",
    "Lightning",
    "Water",
    "Light",
    "Dark"
  ];
  const attackTypes = ["Slash", "Pierce", "Strike", "Projectile", "Magic"];
  const rarityTypes = ["Ultra Rare", "Mega Rare"];
  // const units = [{ name: "test" }];
  return (
    <div className="App">
      <header className="App-header">WotVFFBE tools</header>
      <div className="tier-1">
        <div className="filters">
          <h3>Filters</h3>
          <div className="filter-cat elementTypes">
            <label>Element</label>
            <div className="filter-options">
              {elementTypes.map(element => (
                <ToggleFilterButton
                  key={element}
                  filterProperty="elementTypes"
                  filterValue={element}
                  active={filters.elementTypes.includes(element)}
                  click={toggleFilters}
                ></ToggleFilterButton>
              ))}
            </div>
          </div>
          <div className="filter-cat rarities">
            <label>Rarity</label>
            <div className="filter-options">
              {rarityTypes.map(rarity => (
                <ToggleFilterButton
                  key={rarity}
                  filterProperty="rarities"
                  filterValue={rarity}
                  active={filters.rarities.includes(rarity)}
                  click={toggleFilters}
                ></ToggleFilterButton>
              ))}
            </div>
          </div>
          <div className="filter-cat elementResistances">
            <label>Element Resistances</label>
            <div className="filter-options">
              {elementTypes.map(element => (
                <ToggleFilterButton
                  key={element}
                  filterProperty="elementResistances"
                  filterValue={element}
                  active={filters.elementResistances.includes(element)}
                  click={toggleFilters}
                ></ToggleFilterButton>
              ))}
            </div>
          </div>
          <div className="filter-cat attackTypes">
            <label>Attack Type</label>
            <div className="filter-options">
              {// slice out magic, its not an attack type on any units by default but it is an attack type weakness
              attackTypes.slice(0, 4).map(element => (
                <ToggleFilterButton
                  key={element}
                  filterProperty="attackTypes"
                  filterValue={element}
                  active={filters.attackTypes.includes(element)}
                  click={toggleFilters}
                ></ToggleFilterButton>
              ))}
            </div>
          </div>
          <div className="filter-cat name">
            <label>Name</label>
            <div className="filter-options">
              <input
                placeholder="name"
                onChange={e => {
                  applyNameFilter(e.target.value);
                }}
                type="text"
              />
            </div>
          </div>
        </div>
        <div className="notes">
          <h3>Todo:</h3>
          <ul>
            {todos.map((text, i) => (
              <li key={i}>{text}</li>
            ))}
          </ul>
        </div>
      </div>
      <div>Count: {units.length}</div>
      <div className="units-list">
        {units.map(unit => {
          return <Unit unit={unit} key={unit.name}></Unit>;
        })}
      </div>
    </div>
  );
}

export default App;
