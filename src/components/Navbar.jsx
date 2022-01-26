import React, { useState } from "react";
import axios from "axios";
import NavBar from "react-bootstrap/Navbar";
import { Form, FormControl, Button, Container } from "react-bootstrap";

function Navbar({ cities, setCities, setErr, myStorage }) {
  const [input, setInput] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (input.length > 3) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&lang=estric&appid=${process.env.REACT_APP_API_KEY}`
        )
        .then((res) => {
          if (res.data) {
            let data = res.data;
            let condition = cities.some((e) => e.id === data.id);
            const city = {
              id: data.id,
              name: data.name,
              humidity: data.main.humidity,
              pressure: data.main.pressure,
              temp_max: data.main.temp_max,
              temp_min: data.main.temp_min,
              weather: data.weather[0].main,
              coord: data.coord,
              img: data.weather[0].icon,
              time: new Date(),
              temp: data.main.temp,
            };
            if (!condition) {
              setCities((prev) => {
                myStorage.setItem("cities", JSON.stringify([...prev, city]));
                return [...prev, city];
              });
              setErr((prev) => [
                ...prev,
                {
                  msg: `${input} added to list`,
                  type: "Nice!",
                  id: new Date().getTime(),
                  bg: "success",
                },
              ]);
            } else {
              setErr((prev) => [
                ...prev,
                {
                  msg: `City already exists`,
                  type: "Information",
                  id: new Date().getTime(),
                  bg: "warning",
                },
              ]);
            }
            setInput("");
          }
        })
        .catch((e) =>
          setErr((prev) => [
            ...prev,
            {
              msg: `City "${input}" not found`,
              type: "Error",
              id: new Date().getTime(),
              bg: "danger",
            },
          ])
        );
    }
  };
  return (
    <NavBar sticky="top" bg="dark" expand="lg">
      <Container fluid>
        <NavBar.Brand className="text-white" href="#">
          Weather SV.
        </NavBar.Brand>
        <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="Search city..."
            className="me-2"
            aria-label="Search"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={handleSearch} variant="outline-success">
            Search
          </Button>
        </Form>
      </Container>
    </NavBar>
  );
}

export default Navbar;
