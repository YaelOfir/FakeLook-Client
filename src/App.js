
// export default App;
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  dispatchLogin,
  fetchUser,
  dispatchGetUser,
} from "./redux/actions/authAction";

import PagesHandler from "./app/pages/Handler";
import axios from "axios";
import Layout from "./app/components/layout/Layout";
import io from "socket.io-client";
function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);
  const socket = io.connect("http://localhost:4002/");
  socket.on("Data", (data) => {
    console.log(data);
  });
  socket.on("Temperature", (data) => {
    console.log(data);
  })
  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      const getToken = async () => {
        const res = await axios.post("/user/refresh_token", null);
        dispatch({ type: "GET_TOKEN", payload: res.data.access_token });
      };
      getToken();
    }
  }, [auth.isLogged, dispatch]);

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        dispatch(dispatchLogin());

        const res = await fetchUser(token);
        dispatch(dispatchGetUser(res));
      };
      getUser();
    }
  }, [token, dispatch]);

  return (
    <Router>
      <div className="App">
        <Layout>
          <PagesHandler />
        </Layout>
      </div>
    </Router>
  );
}

export default App;
