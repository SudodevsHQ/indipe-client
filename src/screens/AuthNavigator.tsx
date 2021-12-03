import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { useAtom } from 'jotai';

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GOOGLE_SIGN_IN_WEBCLIENTID } from '../constants/firebase';

import LoginScreen from './Login';
import Home from './Home';
import { userAtom } from '../state/atoms';

GoogleSignin.configure({
    webClientId: GOOGLE_SIGN_IN_WEBCLIENTID,
});

const AuthNavigator = () => {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useAtom(userAtom);

    // useEffect(() => {
    //     auth()
    //         .currentUser?.getIdToken()
    //         .then((i) =>
    //             console.log(
    //                 '\x1b[44m%s\x1b[0m',
    //                 'AuthNavigator.tsx line:21 i',
    //                 i
    //             )
    //         );
    // }, []);

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
