import "./App.css";
import Navbar from "./components/Navbar";
import { useState } from "react";
import { Row } from "react-bootstrap";
import CardDetail from "./components/CardDetail";
import ModalErrs from "./components/ModalErrs";

function App() {
  let myStorage = window.localStorage;
  const [cities, setCities] = useState(
    JSON.parse(myStorage.getItem("cities")) || []
  );
  const [err, setErr] = useState([]);
  console.log(cities);
  const handleClose = (id) => {
    setCities((prev) => {
      let currentCities = prev.filter((e) => e.id === id);
      setErr((prev) => [
        ...err,
        {
          type: "Delete!",
          msg: `${currentCities[0].name} removed from list`,
          bg: "success",
        },
      ]);
      let cities = prev.filter((e) => e.id !== id);
      myStorage.setItem("cities", JSON.stringify(cities));
      return cities;
    });
  };

  return (
    <div>
      <Navbar
        setCities={setCities}
        cities={cities}
        setErr={setErr}
        myStorage={myStorage}
      />
      <Row style={{ margin: 0 }} xs={1} md={5} className="g-4">
        {cities.length ? (
          cities.map((city) => (
            <CardDetail key={city.id} data={city} handleClose={handleClose} />
          ))
        ) : (
          <></>
        )}
      </Row>
      <ModalErrs err={err} setErr={setErr} />
    </div>
  );
}

export default App;
