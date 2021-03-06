import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { themes } from '../constants/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/core';
import dayjs from 'dayjs';

const getIcon = transaction => {
    if (transaction.type === 'send') {
        if (transaction.status === 'processed') {
            return 'checkmark-circle-outline';
        }
        return 'timer-outline';
    } else {
        return 'arrow-down';
    }
};

const Item = ({ transaction }) => (
    <View style={styles.item}>
        <View style={styles.transferIcon}>
            <Ionicons
                name={getIcon(transaction)}
                size={24}
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
                    {dayjs(transaction.created_at).format('ddd D MMM HH:mm')}
                </Text>
            ) : (
                <Text style={styles.dateTime}>{transaction.upi}</Text>
            )}
        </View>

        <Text
            style={[
                styles.title,
                {
                    color:
                        transaction.status === 'authorized'
                            ? themes.light.buttonBackground[1]
                            : themes.light.subText,
                },
            ]}
        >
            {' '}
            {transaction.amount} INR
        </Text>
    </View>
);

type TTransactionListProps = {
    title?: string;
    showTransactionsOnly: boolean;
    isSection: boolean;
    transactions: any[];
};

const TransactionsList = ({
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

            {isSection ? (
                <View style={{ marginTop: 24 }}>
                    {transactions.slice(0, 5).map(t => (
                        <Item transaction={t} key={t.razorpay_tid} />
                    ))}
                </View>
            ) : (
                <FlatList
                    showsVerticalScrollIndicator={false}
                    style={{
                        marginTop: 12,
                        paddingTop: 12,
                        marginBottom: 50,
                        paddingBottom: 50,
                    }}
                    data={isSection ? transactions.slice(0, 5) : transactions}
                    renderItem={({ item, index }) => (
                        <Item transaction={item} key={index} />
                    )}
                    keyExtractor={item => item.razorpay_tid}
                />
            )}
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
        padding: 8,
        marginRight: 12,
    },
});

export default TransactionsList;
