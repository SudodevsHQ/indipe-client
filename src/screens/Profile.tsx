import { useAtom } from 'jotai';
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import MoneyInfo from '../components/MoneyInfo';
import ProfileAvatar from '../components/ProfileAvatar';
import TransactionsList from '../components/TransactionsList';
import UpiInfo from '../components/UpiInfo';
import { userAtom } from '../state/atoms';
import { pageStyles } from '../styles/common';
import { semiHugeText } from './AddMoney';
import { transactionsAtom } from '../state/atoms';

const Profile = () => {
    const [user] = useAtom(userAtom);

    const { displayName } = (user as any) || {};
    const [transactions] = useAtom(transactionsAtom);

    return (
        <ScrollView style={styles.pageStyles}>
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
                transactions={transactions}
            />
        </ScrollView>
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
