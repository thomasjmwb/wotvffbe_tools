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
  const elementFilter = (unit, filter) => {
    return !!filter.elements[unit.elementType];
  };
  const filterPropertyToFunctionMap = {
    name: nameFilter,
    elements: elementFilter
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
    debugger;
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
