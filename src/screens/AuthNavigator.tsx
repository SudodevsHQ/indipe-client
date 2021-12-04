import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { useAtom } from 'jotai';

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GOOGLE_SIGN_IN_WEBCLIENTID } from '../constants/firebase';

import LoginScreen from './Login';
import Home from './Home';
import {
    isUserAccountCreatedAtom,
    userAtom,
    userIDTokenAtom,
} from '../state/atoms';
import { postRequest } from '../utils/requests';
import { API_BASE_URL } from '../constants/api';
import {
    getDataFromAsyncStorage,
    storeDataInAsyncStorage,
} from '../utils/storage';
import { ToastAndroid } from 'react-native';
import { ASYNC_STORAGE_KEYS } from '../constants/asyncStorage';

GoogleSignin.configure({
    webClientId: GOOGLE_SIGN_IN_WEBCLIENTID,
});

const AuthNavigator = () => {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useAtom(userAtom);

    const [userTokenId, setUserIdToken] = useAtom(userIDTokenAtom);

    const [isUserAccountCreated, setIsUserAccountCreated] = useAtom(
        isUserAccountCreatedAtom
    );

    console.log(
        '\x1b[42m%s\x1b[0m',
        'AuthNavigator.tsx line:53 userTokenId',
        userTokenId
    );

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
        auth()
            .currentUser?.getIdToken()
            .then(t => setUserIdToken(t));
    }, [setUserIdToken]);

    useEffect(() => {
        if (!isUserAccountCreated && userTokenId && user) {
            console.log(
                '\x1b[32m%s\x1b[0m',
                'AuthNavigator.tsx line:53 isUserCreated',
                isUserAccountCreated
            );

            const payload = {
                name: user.displayName,
                id: user.uid,
                currency: 'USD',
            };

            console.log(
                '\x1b[32m%s\x1b[0m',
                'AuthNavigator.tsx line:77 payload',
                payload
            );

            postRequest(
                API_BASE_URL + '/create_user',
                userTokenId,
                payload
            ).then(
                () => {
                    console.log(
                        '%cAuthNavigator.tsx line:44 [INFO]:CREATE USER SUCCESS',
                        'color: white; background-color: #26bfa5;'
                    );

                    ToastAndroid.showWithGravity(
                        'Created User account',
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER
                    );

                    setIsUserAccountCreated(true);
                },
                error =>
                    console.log(
                        '\x1b[41m%s\x1b[0m',
                        'AuthNavigator.ts line:64 Error Creating User',
                        error
                    )
            );
        }
    }, [userTokenId, user, isUserAccountCreated, setIsUserAccountCreated]);

    if (initializing) {
        return null;
    }

    if (!user) {
        return <LoginScreen />;
    }

    return <Home />;
};

export default AuthNavigator;
