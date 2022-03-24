// //import "./App.css";
//import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import {
//   LoginPage,
//   SignUpPage,
//   FilterPage,
//   Friends,
//   HomePage,
//   Map,
//   NewPost,
//   Notifications,
//   ListOfFriends,
//   UserInfo,
//   Layout,
//   Body,
// } from "./components/index";
// import React, { useEffect } from "react";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   dispatchLogin,
//   fetchUser,
//   dispatchGetUser,
// } from "./redux/actions/authAction";
// import Header from "./components/header/Header";
// function App() {
//   const dispatch = useDispatch();
//   const token = useSelector((state) => state.token);
//   const auth = useSelector((state) => state.auth);

//   useEffect(() => {
//     const firstLogin = localStorage.getItem("firstLogin");
//     if (firstLogin) {
//       const getToken = async () => {
//         const res = await axios.post("/user/refresh_token", null);
//         dispatch({ type: "GET_TOKEN", payload: res.data.access_token });
//       };
//       getToken();
//     }
//   }, [auth.isLogged, dispatch]);

//   useEffect(() => {
//     if (token) {
//       const getUser = () => {
//         dispatch(dispatchLogin());

//         return fetchUser(token).then((res) => {
//           dispatch(dispatchGetUser(res));
//         });
//       };
//       getUser();
//     }
//   }, [token, dispatch]);

//   return (
//     <Router>
//       <div className="App">
//         <Header />
//         <Body />
//       </div>
//     </Router>

//     // //{/* <BrowserRouter>
//     //   <Header />
//     //   <Body />
//     //   <Routes>
//     //     <Route path="/HomePage" exact element={<HomePage />}></Route>
//     //     <Route
//     //       path="/HomePage/FilterPage"
//     //       exact
//     //       element={<FilterPage />}
//     //     ></Route>
//     //     <Route path="/HomePage/Friends" exact element={<Friends />}></Route>
//     //     <Route path="/HomePage/Map" exact element={<Map />}></Route>
//     //     <Route path="/HomePage/NewPost" exact element={<NewPost />}></Route>
//     //     <Route
//     //       path="/HomePage/Notifications"
//     //       exact
//     //       element={<Notifications />}
//     //     ></Route>

//     //     <Route
//     //       path="/Profile/ListOfFriends"
//     //       exact
//     //       element={<ListOfFriends />}
//     //     ></Route>
//     //     <Route path="/Profile" exact element={<UserInfo />}></Route>
//     //   </Routes>
//     // </BrowserRouter> */}
//   );
// }

// export default App;
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  dispatchLogin,
  fetchUser,
  dispatchGetUser,
} from "./redux/actions/authAction";

import Header from "./components/header/Header";
import Body from "./components/body/Body";
import axios from "axios";
import Layout from "./components/Layout/Layout";
function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);

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
          <Body />
        </Layout>
      </div>
    </Router>
  );
}

export default App;
