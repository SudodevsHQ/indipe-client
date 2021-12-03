import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { createState, useHookstate } from '@hookstate/core';

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GOOGLE_SIGN_IN_WEBCLIENTID } from '../constants/firebase';

import LoginScreen from './Login';
import Home from './Home';

GoogleSignin.configure({
    webClientId: GOOGLE_SIGN_IN_WEBCLIENTID,
});

const userDetailsState = createState(null);

const AuthNavigator = () => {
    const [initializing, setInitializing] = useState(true);
    const user = useHookstate(userDetailsState);
    // console.log(user.get(), initializing.get());

    useEffect(() => {
        function onAuthStateChanged(newUser) {
            user.set(newUser);
            // console.log(newUser);
            if (initializing) {
                setInitializing(false);
            }
        }

        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, [initializing, user]);

    if (initializing) {
        console.log('here');
        return null;
    }

    if (!user.get()) {
        return <LoginScreen />;
    }

    return <Home />;
};

export default AuthNavigator;
