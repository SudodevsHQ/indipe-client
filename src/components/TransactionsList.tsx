import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { themes } from '../constants/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/core';

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
];

const Item = ({ transaction }) => (
    <View style={styles.item}>
        <View style={styles.transferIcon}>
            <Ionicons
                name="swap-horizontal"
                size={20}
                color={themes.light.subText}
            />
        </View>
        <View style={{ flex: 1 }}>
            {transaction.type === 'receive' ? (
                <Text style={styles.transactionType}>Received On</Text>
            ) : (
                <Text style={styles.transactionType}>Sent To</Text>
            )}
            {transaction.type === 'receive' ? (
                <Text style={styles.dateTime}>
                    {Date(transaction.created_at)}
                </Text>
            ) : (
                <Text style={styles.dateTime}>{transaction.upi}</Text>
            )}
        </View>
        <Text style={styles.title}> {transaction.amount} INR</Text>
    </View>
);

type TTransactionListProps = {
    title?: string;
    showTransactionsOnly: boolean;
    isSection: boolean;
    transactions: any[];
};

const TransactionsList = ({
    title,
    showTransactionsOnly,
    isSection,
    transactions,
}: TTransactionListProps) => {
    const navigation = useNavigation();

    const goFullScreen = () => {
        navigation.navigate('Transactions');
    };

    return (
        <View>
            {isSection ? (
                <View style={styles.row}>
                    <Text style={styles.title}>Transaction History</Text>
                    <TouchableOpacity onPress={goFullScreen}>
                        <Ionicons
                            name="open-outline"
                            size={18}
                            color={themes.light.subText}
                        />
                    </TouchableOpacity>
                </View>
            ) : null}

            <FlatList
                style={{ marginTop: 24 }}
                data={transactions}
                renderItem={({ item, index }) => (
                    <Item transaction={item} key={index} />
                )}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    item: {
        // padding: 12,
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
        // marginHorizontal: 16,
    },
    title: {
        fontSize: 18,
        fontFamily: 'DMSans_700Bold',
    },
    dateTime: {
        fontSize: 16,
        fontFamily: 'DMSans_500Medium',
    },
    transactionType: {
        fontSize: 12,
        fontFamily: 'DMSans_400Regular',
        color: themes.light.subText,
    },
    transferIcon: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginRight: 12,
    },
});

export default TransactionsList;
