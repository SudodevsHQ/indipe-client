import { useAtom } from 'jotai';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MoneyInfo from '../components/MoneyInfo';
import ProfileAvatar from '../components/ProfileAvatar';
import TransactionsList from '../components/TransactionsList';
import UpiInfo from '../components/UpiInfo';
import { userAtom } from '../state/atoms';
import { pageStyles } from '../styles/common';
import { semiHugeText } from './AddMoney';

const Profile = () => {
    const [user] = useAtom(userAtom);

    const { displayName } = (user as any) || {};

    return (
        <View style={styles.pageStyles}>
            <View style={styles.header}>
                <Text style={semiHugeText}>Hi, {displayName}</Text>
                <ProfileAvatar />
            </View>

            <View style={{ flexDirection: 'row' }}>
                <MoneyInfo showTransferButton />
            </View>

            <UpiInfo />

            <TransactionsList
                title={'Account History'}
                showTransactionsOnly
                isSection
            />
        </View>
    );
};

const styles = StyleSheet.create({
    pageStyles: pageStyles,
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});

export default Profile;
