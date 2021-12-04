import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button, ToastAndroid } from 'react-native';
import ProfileAvatar from '../components/ProfileAvatar';
import MoneyInfo from '../components/MoneyInfo';
import UpiInfo from '../components/UpiInfo';
import GetStartedIllustration from '../components/GetStartedIllustration';
import FooterButtons from '../components/FooterButtons';
import { signOut } from '../utils/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useAtom } from 'jotai';
import {
    isUserAccountCreatedAtom,
    upiIdAtom,
    userAtom,
    userIDTokenAtom,
} from '../state/atoms';
import { postRequest } from '../utils/requests';
import { API_BASE_URL } from '../constants/api';

function Home() {
    // const [modalVisible, setModalVisible] = useState(false);

    const [user] = useAtom(userAtom);
    const [upiId, setUpiId] = useAtom(upiIdAtom);

    const [userTokenId] = useAtom(userIDTokenAtom);

    const [isUserAccountCreated] = useAtom(isUserAccountCreatedAtom);

    console.log('\x1b[44m%s\x1b[0m', 'Home.tsx line:25 upiId', upiId);

    useEffect(() => {
        if (isUserAccountCreated && userTokenId) {
            const { uid, email, phoneNumber } = user;

            const payload = {
                user_id: uid,
                reference_id: uid,
                email,
                contact: phoneNumber ?? '',
                type: 'employee',
                notes: {
                    initial: '1',
                },
            };

            console.log(
                '\x1b[44m%s\x1b[0m',
                'Home.tsx line:39 payload',
                payload
            );

            postRequest(
                API_BASE_URL + '/create_virtual_account',
                userTokenId,
                payload
            ).then(
                data => {
                    setUpiId(data.upi_id);
                    ToastAndroid.showWithGravity(
                        'Created Virtual account',
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER
                    );
                },

                error =>
                    console.log(
                        '\x1b[41m%s\x1b[0m',
                        'Home.tsx line:40 [ERROR]: Failed to /create_virtual_account; error',
                        error
                    )
            );
        }
    }, [userTokenId, setUpiId, isUserAccountCreated]);

    return (
        <View style={styles.pageStyles}>
            <View style={styles.header}>
                <MoneyInfo />
                <ProfileAvatar />
            </View>

            <UpiInfo upiId={upiId} />

            <GetStartedIllustration />

            <FooterButtons />

            {/* <Button title="LOGOUT" onPress={() => signOut()}>
                LOGIN
            </Button> */}

            <Button
                title="clear async storage"
                onPress={() => AsyncStorage.clear()}
            ></Button>
        </View>
    );
}

export const pageStyles = {
    backgroundColor: 'white',
    flex: 1,
    padding: 18,
};

const styles = StyleSheet.create({
    pageStyles: pageStyles,
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default Home;
