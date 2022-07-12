import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import From from "./Components/From/From";
import Home from "./Components/home/Home";
import { fetchTodosData } from "./Redux/Actions/actions";
import { Route, Routes } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTodosData());
  }, []);
  return (
    <div className="App">
      mohaprobhu
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/from" element={<From />} />
        <Route path="/editbyId/:id" element={<From />} />
      </Routes>
    </div>
  );
}

export default App;
