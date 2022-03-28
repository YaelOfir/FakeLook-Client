import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ActivationEmail from "./auth/ActivationEmail";
import NotFound from "../helpers/NotFound/NotFound";

import ForgotPass from "./auth/ForgotPassword";
import ResetPass from "./auth/ResetPassword";

import User from "./user/User";
import EditUser from "./user/EditUser";

import Profile from "./profile/profile";
import Home from "./home/Home";
import { useSelector } from "react-redux";

function Body() {
  const auth = useSelector((state) => state.auth);
  const { isLogged, isAdmin } = auth;

  const ifLogged = () => {
    if (isLogged) {
      return <NotFound />;
    }
    return <Login />;
  };

  const ifRegistered = () => {
    if (isLogged) {
      return <NotFound />;
    }
    return <Register />;
  };

  const ifForgotPassword = () => {
    if (isLogged) {
      return <NotFound />;
    }
    return <ForgotPass />;
  };

  const ifResetToken = () => {
    if (isLogged) {
      return <NotFound />;
    }
    return <ResetPass />;
  };

  const enterUser = () => {
    if (isLogged) {
      return <User />;
    }
    return <NotFound />;
  };

  const enterFeed = () => {
    if (isLogged) {
      return <Profile />;
    }
    return <NotFound />;
  };

  const ifAdmin = () => {
    if (isAdmin) {
      return <EditUser />;
    }
    return <NotFound />;
  };

  // const feed = () => {
  //   if (isLogged) {
  //     return <Feed />;
  //   }
  //   return <NotFound />;
  // };

  return (
    <section>
      <Routes>
        <Route path="/" element={<Home />} exact />

        <Route path="/login" element={ifLogged()} />
        <Route path="/register" element={ifRegistered()} />

        <Route path="/forgot_password" element={ifForgotPassword()} />
        <Route path="/user/reset/:token" element={ifResetToken()} />

        <Route
          path="/user/activate/:activation_token"
          element={<ActivationEmail />}
        />

        <Route path="/user" element={enterUser()} />
        <Route path="/edit_user/:id" element={ifAdmin()} />

        <Route path="/profile" element={enterFeed()}></Route>
      </Routes>
    </section>
  );
}

export default Body;
