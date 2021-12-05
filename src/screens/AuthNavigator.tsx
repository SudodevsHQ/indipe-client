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

import { ToastAndroid } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AddMoney from './AddMoney';
import Profile from './Profile';
import Scanner from './Scanner';
import SendMoney from './SendMoney';
import Transactions from './Transactions';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

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

    // console.log(
    //     '\x1b[42m%s\x1b[0m',
    //     'AuthNavigator.tsx line:53 userTokenId',
    //     userTokenId
    // );

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
        // console.log(
        //     '🚀 ~ file: AuthNavigator.tsx ~ line 62 ~ useEffect ~ isUserAccountCreated',
        //     isUserAccountCreated
        // );
        if (!isUserAccountCreated && userTokenId && user) {
            // console.log(
            //     '\x1b[32m%s\x1b[0m',
            //     'AuthNavigator.tsx line:53 isUserCreated',
            //     isUserAccountCreated
            // );

            const payload = {
                name: user.displayName,
                id: user.uid,
                currency: 'USD',
            };
            console.log(
                '🚀 ~ file: AuthNavigator.tsx ~ line 72 ~ useEffect ~ payload',
                payload
            );

            // console.log(
            //     '\x1b[32m%s\x1b[0m',
            //     'AuthNavigator.tsx line:77 payload',
            //     payload
            // );

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

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Add Money"
                    component={AddMoney}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Profile"
                    component={Profile}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Scanner"
                    component={Scanner}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Send Money"
                    component={SendMoney}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Transactions"
                    component={Transactions}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AuthNavigator;
