import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { useAtom } from 'jotai';

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GOOGLE_SIGN_IN_WEBCLIENTID } from '../constants/firebase';

import LoginScreen from './Login';
import Home from './Home';
import {
    userAccountCreatedInBEAtom,
    userAtom,
    userIDTokenAtom,
} from '../state/atoms';
import { fetchRequest } from '../utils/requests';
import { API_BASE_URL } from '../constants/api';
import {
    getData,
    getDataFromAsyncStorage,
    storeData,
    storeDataInAsyncAtom,
    storeDataInAsyncStorage,
} from '../utils/storage';

GoogleSignin.configure({
    webClientId: GOOGLE_SIGN_IN_WEBCLIENTID,
});

const AuthNavigator = () => {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useAtom(userAtom);

    const [userTokenId, setUserIdToken] = useAtom(userIDTokenAtom);

    useEffect(() => {
        auth()
            .currentUser?.getIdToken()
            .then(t => setUserIdToken(t));
    }, [setUserIdToken]);

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

    useEffect(() => {
        const isUserCreated = getDataFromAsyncStorage('userCreatedInBE');

        if (isUserCreated) return;

        fetchRequest(API_BASE_URL + '/create_user', userTokenId).then(() => {
            console.log(
                '%cAuthNavigator.tsx line:44 [INFO]:CREATE USER SUCCESS',
                'color: white; background-color: #26bfa5;'
            );
            storeDataInAsyncStorage('userCreatedInBE', true);
        });
    }, [userTokenId]);

    if (initializing) {
        return null;
    }

    if (!user) {
        return <LoginScreen />;
    }

    return <Home />;
};

export default AuthNavigator;
