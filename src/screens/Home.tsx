import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ToastAndroid } from 'react-native';

import ProfileAvatar from '../components/ProfileAvatar';
import MoneyInfo from '../components/MoneyInfo';
import UpiInfo from '../components/UpiInfo';
import GetStartedIllustration from '../components/GetStartedIllustration';
import FooterButtons from '../components/FooterButtons';

import { useAtom } from 'jotai';
import {
    isUserAccountCreatedAtom,
    virtualAccountDetailsAtom,
    userAtom,
    userIDTokenAtom,
} from '../state/atoms';
import { postRequest } from '../utils/requests';
import { API_BASE_URL } from '../constants/api';
// import FullScreenLoader from '../components/FullScreenLoader';
import { pageStyles } from '../styles/common';
import useWebSocketData from '../hooks/useWebSocketData';
import { transactionsAtom } from '../state/atoms';
import TransactionsList from '../components/TransactionsList';

function Home() {
    // const [modalVisible, setModalVisible] = useState(false);

    const [user] = useAtom(userAtom);

    const [virtualAccountDetails, setVirtualAccountDetails] = useAtom(
        virtualAccountDetailsAtom
    );

    // const [isFetching, setIsFetching] = useState(false);

    const [userTokenId] = useAtom(userIDTokenAtom);

    const [isUserAccountCreated] = useAtom(isUserAccountCreatedAtom);
    const [transactions] = useAtom(transactionsAtom);
    console.log(
        '\x1b[44m%s\x1b[0m',
        'Home.tsx line:25 V A D',
        virtualAccountDetails
    );

    /**
     * prevent jank from loading -> screen -> loading
     */
    // useEffect(() => {
    //     if (isUserAccountCreated && !virtualAccountDetails) {
    //         setIsFetching(true);
    //     }
    // }, [isUserAccountCreated, virtualAccountDetails]);

    useEffect(() => {
        if (
            isUserAccountCreated &&
            userTokenId &&
            !virtualAccountDetails?.upi_id
        ) {
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

            // console.log(
            //     '\x1b[44m%s\x1b[0m',
            //     'Home.tsx line:39 payload',
            //     payload
            // );

            // setIsFetching(true);
            postRequest(
                API_BASE_URL + '/create_virtual_account',
                userTokenId,
                payload
            ).then(
                data => {
                    setVirtualAccountDetails(data);

                    if (!virtualAccountDetails) {
                        ToastAndroid.showWithGravity(
                            'Fetched Virtual account',
                            ToastAndroid.SHORT,
                            ToastAndroid.BOTTOM
                        );
                    }
                },

                error =>
                    console.log(
                        '\x1b[41m%s\x1b[0m',
                        'Home.tsx line:40 [ERROR]: Failed to /create_virtual_account; error',
                        error
                    )
            );
            // .then(() => setIsFetching(false));
        }
        // 🚧
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        userTokenId,
        virtualAccountDetails,
        setVirtualAccountDetails,
        isUserAccountCreated,
    ]);

    useWebSocketData();

    // if (isFetching) return <FullScreenLoader />;

    return (
        <View style={styles.pageStyles}>
            <View style={styles.header}>
                <MoneyInfo />
                <ProfileAvatar />
            </View>

            <UpiInfo />

            {transactions.length && virtualAccountDetails.balance ? (
                <View style={styles.staticHeight}>
                    <TransactionsList isSection transactions={transactions} />
                </View>
            ) : (
                <GetStartedIllustration />
            )}

            <FooterButtons />
        </View>
    );
}

const styles = StyleSheet.create({
    pageStyles: pageStyles,
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    staticHeight: {
        maxHeight: '60%',
    },
});

export default Home;
