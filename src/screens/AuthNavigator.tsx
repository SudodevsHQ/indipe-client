import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GOOGLE_SIGN_IN_WEBCLIENTID } from '../constants/firebase';

import LoginScreen from './Login';
import Home from './Home';
import { atom, useAtom } from 'jotai';

GoogleSignin.configure({
    webClientId: GOOGLE_SIGN_IN_WEBCLIENTID,
});

export const userAtom = atom<Record<string, string> | null>(null);

const AuthNavigator = () => {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useAtom(userAtom);

    useEffect(() => {
        function onAuthStateChanged(newUser) {
            setUser(newUser);

            if (initializing) {
                setInitializing(false);
            }
        }

        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, [initializing, setUser, user]);

    if (initializing) {
        return null;
    }

    if (!user) {
        return <LoginScreen />;
    }

    return <Home />;
};

export default AuthNavigator;
