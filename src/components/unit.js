import React from "react";
const percentage = function(number) {
  return number ? number * 100 : 0;
};
export default function Unit({ unit }) {
  return (
    <div className="unit">
      <img className="img" width="100" src={unit.img} alt={unit.name} />
      <div className="info">
        <div className="head">
          <span className="name">{unit.name}</span> - {unit.elementType} -{" "}
          {unit.attackType}
        </div>
        <div className="body">
          <table>
            <tbody>
              <tr>
                <th>Fire</th>
                <th>Ice</th>
                <th>Wind</th>
                <th>Earth</th>
                <th>Lightning</th>
                <th>Water</th>
                <th>Light</th>
                <th>Dark</th>
              </tr>
              <tr>
                <td>{percentage(unit.fire)}%</td>
                <td>{percentage(unit.ice)}%</td>
                <td>{percentage(unit.wind)}%</td>
                <td>{percentage(unit.earth)}%</td>
                <td>{percentage(unit.lightning)}%</td>
                <td>{percentage(unit.water)}%</td>
                <td>{percentage(unit.light)}%</td>
                <td>{percentage(unit.dark)}%</td>
              </tr>
            </tbody>
          </table>
          <table>
            <tbody>
              <tr>
                <th>Slash</th>
                <th>Pierce</th>
                <th>Strike</th>
                <th>Projectile</th>
                <th>Magic</th>
              </tr>
              <tr>
                <td>{percentage(unit.slash)}%</td>
                <td>{percentage(unit.pierce)}%</td>
                <td>{percentage(unit.strike)}%</td>
                <td>{percentage(unit.projectile)}%</td>
                <td>{percentage(unit.magic)}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
// {
//     "name": "Mediena",
//     "img": "imgs/units/mediena.jpeg",
//     "tier": "S",
//     "rarity": "Ultra Rare",
//     "unitLink": "http://wotvffbe.gamea.co/c/v89gxxuy",
//     "imgSrc": "http://wotvffbe.gamea.co/file/imgbank/fm874m0k/uvovm3qz/5bc282b5d3f84663314acfd4448559659fd1c4bb_s.jpg",
//     "imgFileName": "mediena.jpeg",
//     "slash": -0.2,
//     "pierce": -0.2,
//     "strike": -0.2,
//     "projectile": -0.2,
//     "magic": 0.25,
//     "fire": -0.1,
//     "ice": 0,
//     "wind": 0.2,
//     "earth": 0,
//     "undefined": 0,
//     "lightning": -0.1,
//     "water": 0,
//     "light": 0.2,
//     "dark": 0,
//     "elementType": "ice",
//     "attackType": "strike"
//   },
