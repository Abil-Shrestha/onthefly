import "./App.css";
import React, { useState, useEffect } from "react";
import { useRoutes } from "react-router-dom";
import ReadTrips from "./pages/ReadTrips";
import CreateTrip from "./pages/CreateTrip";
import EditTrip from "./pages/EditTrip";
import CreateDestination from "./pages/CreateDestination";
import ReadDestinations from "./pages/ReadDestinations";
import TripDetails from "./pages/TripDetails";
import { Link } from "react-router-dom";
import CreateActivity from "./pages/CreateActivity";
import AddToTrip from "./pages/AddToTrip";
import Login from "./pages/Login";
import Avatar from "./components/Avatar";
import AddUserToTrip from "./pages/AddUserToTrip";

const App = () => {
  const [trips, setTrips] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [user, setUser] = useState("");

  const API_URL = "http://localhost:3000";

  useEffect(() => {
    const fetchtrips = async () => {
      const res = await fetch("/api/trips");
      const data = await res.json();
      setTrips(data);
    };

    const fetchDestinations = async () => {
      const res = await fetch("/api/destinations");
      const data = res.json();
      setDestinations(data);
    };

    const getUser = async () => {
      const response = await fetch(`/api/auth/login/success`, {
        credentials: "include",
      });
      const json = await response.json();
      setUser(json.user);
    };
    getUser();
    fetchtrips();
  }, []);

  const logout = async () => {
    const url = `${API_URL}/auth/logout`;
    const response = await fetch(url, { credentials: "include" });
    const json = await response.json();
    window.location.href = "/";
  };

  // Sets up routes
  let element = useRoutes([
    {
      path: "/",
      element:
        user && user.id ? (
          <ReadTrips data={trips} />
        ) : (
          <Login api_url={API_URL} />
        ),
    },
    {
      path: "/trip/new",
      element:
        user && user.id ? (
          <CreateTrip api_url={API_URL} />
        ) : (
          <Login api_url={API_URL} />
        ),
    },
    {
      path: "/edit/:id",
      element:
        user && user.id ? (
          <EditTrip data={trips} api_url={API_URL} />
        ) : (
          <Login api_url={API_URL} />
        ),
    },
    {
      path: "/destinations",
      element:
        user && user.id ? (
          <ReadDestinations data={destinations} api_url={API_URL} />
        ) : (
          <Login api_url={API_URL} />
        ),
    },
    {
      path: "/trip/get/:id",
      element:
        user && user.id ? (
          <TripDetails data={trips} api_url={API_URL} />
        ) : (
          <Login api_url={API_URL} />
        ),
    },
    {
      path: "/destination/new/:trip_id",
      element:
        user && user.id ? (
          <CreateDestination api_url={API_URL} />
        ) : (
          <Login api_url={API_URL} />
        ),
    },
    {
      path: "/activity/create/:trip_id",
      element:
        user && user.id ? (
          <CreateActivity api_url={API_URL} />
        ) : (
          <Login api_url={API_URL} />
        ),
    },
    {
      path: "/destinations/add/:destination_id",
      element:
        user && user.id ? (
          <AddToTrip data={trips} user={user} api_url={API_URL} />
        ) : (
          <Login api_url={API_URL} />
        ),
    },
    {
      path: "/users/add/:trip_id",
      element:
        user && user.id ? (
          <AddUserToTrip user={user} api_url={API_URL} />
        ) : (
          <Login api_url={API_URL} />
        ),
    },
  ]);

  return (
    <div className="App">
      {user && user.id ? (
        <div className="header">
          <h1>On The Fly ✈️</h1>
          <Link to="/">
            <button className="headerBtn">Explore Trips</button>
          </Link>
          <Link to="/destinations">
            <button className="headerBtn">Explore Destinations</button>
          </Link>
          <Link to="/trip/new">
            <button className="headerBtn"> + Add Trip </button>
          </Link>
          <button onClick={logout} className="headerBtn">
            Logout
          </button>
          <Avatar className="avatar" user={user} />
        </div>
      ) : (
        <></>
      )}
      {element}
    </div>
  );
};

export default App;
