import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CloseX from '../components/CloseX';
import TransactionsList from '../components/TransactionsList';
import { pageStyles } from '../styles/common';
import { semiHugeText } from './AddMoney';
import { transactionsAtom } from '../state/atoms';
import { useAtom } from 'jotai';

const Transactions = () => {
    const [transactions] = useAtom(transactionsAtom);

    return (
        <View style={styles.pageStyles}>
            <View style={styles.header}>
                <Text style={semiHugeText}>Transactions</Text>

                <CloseX />
            </View>
            <TransactionsList
                showTransactionsOnly={false}
                isSection={false}
                transactions={transactions}
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
export default Transactions;
