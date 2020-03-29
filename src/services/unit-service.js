// todo:this wont return a singleton?
function UnitService() {
  // return units list
  let units = null;
  this.getUnits = function() {
    if (units) {
      return Promise.resolve(units);
    }
    return fetch("./mock-data/units.json")
      .then(response => response.json())
      .then(unitJson => {
        units = unitJson;
        return units;
      });
  };

  const nameFilter = (unit, filter) => {
    return unit.name.toLowerCase().indexOf(filter.name.toLowerCase()) > -1;
  };
  const toggleFilter = (filterProperty, unitFilterProperty) => (
    unit,
    filter
  ) => {
    return filter[filterProperty]
      .map(text => text.toLowerCase())
      .includes(unit[unitFilterProperty].toLowerCase());
  };
  const resistancesFilter = (filterProperty, greaterThan) => (unit, filter) => {
    return filter[filterProperty].some(resistanceName => {
      return greaterThan
        ? unit[resistanceName.toLowerCase()] > 0
        : unit[resistanceName.toLowerCase()] < 0;
    });
  };
  const filterPropertyToFunctionMap = {
    name: nameFilter,
    elementTypes: toggleFilter("elementTypes", "elementType"),
    rarities: toggleFilter("rarities", "rarity"),
    elementResistances: resistancesFilter("elementResistances", true),
    elementWeaknesses: resistancesFilter("elementResistances", false),
    attackResistances: resistancesFilter("attackResistances", true),
    attackWeaknesses: resistancesFilter("attackWeaknesses", false),
    attackTypes: toggleFilter("attackTypes", "attackType")
  };
  // return units list
  // filterable by name, rarity, element, resistances,

  this.filterUnits = function(filter) {
    const filtersList = [];
    Object.keys(filter).forEach(filterProperty => {
      if (Object.keys(filter[filterProperty]).length > 0) {
        // works for objects, arrays, strings
        filtersList.push(filterPropertyToFunctionMap[filterProperty]);
      }
    });
    return this.getUnits().then(units => {
      return units.filter(unit => {
        return filtersList.every(filterFunction => {
          return filterFunction(unit, filter);
        });
      });
    });
  };
  return this;
}
export default new UnitService();
