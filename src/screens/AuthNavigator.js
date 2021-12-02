import React, { useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";

import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { GOOGLE_SIGN_IN_WEBCLIENTID } from "../constants/firebase";
// import { useDispatch } from "react-redux";
// import { setUserData } from "src/state/home/actions";
import DetailsScreen from "./SomeScreen";
import Home from "./Home";

GoogleSignin.configure({
  webClientId: GOOGLE_SIGN_IN_WEBCLIENTID,
});

const AuthNavigator = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    function onAuthStateChanged(newUser) {
      setUser(newUser);
      console.log(newUser);
      if (initializing) {
        setInitializing(false);
      }
    }

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [initializing, user]);

  if (initializing) {
    return null;
  }

  if (!user) {
    return <DetailsScreen />;
  }

  return <Home />;
};

export default AuthNavigator;
