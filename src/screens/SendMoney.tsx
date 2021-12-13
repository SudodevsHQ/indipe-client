import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { themes } from '../constants/colors';
import { hugeText } from '../components/MoneyInfo';
import { GenericButton } from '../components/GenericButton';
import CloseX from '../components/CloseX';
import { useNavigation, useRoute } from '@react-navigation/core';
import { pageStyles } from '../styles/common';
import FullScreenLoader from '../components/FullScreenLoader';
import { postRequest } from '../utils/requests';
import { API_BASE_URL } from '../constants/api';
import { useAtom } from 'jotai';
import { userAtom, userIDTokenAtom } from '../state/atoms';
import AmountInput from '../components/AmountInput';

const SendMoney = () => {
    const [amount, onAmountChange] = React.useState('');
    const [user] = useAtom(userAtom);
    const [userIDToken] = useAtom(userIDTokenAtom);

    const navigation = useNavigation();

    const { params } = useRoute<any>();
    const { receiverName, upiAddress } = params ?? {};

    const [paymentProcessing, setPaymentProcessing] = useState(false);
    //   console.log(receiverName);

    const handleMoneyValueChange = value => {
        // add validation
        if (value.length < 6) {
            onAmountChange(value);
        }
    };

    if (paymentProcessing) return <FullScreenLoader />;

    return (
        <View style={styles.pageStyles}>
            <View style={styles.header}>
                <Text style={hugeText}>Send Money</Text>

                <CloseX />
            </View>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <AmountInput
                    amount={amount}
                    handleAmountChange={handleMoneyValueChange}
                    currencySymbol={'₹'}
                />

                {receiverName && (
                    <View style={styles.reciever}>
                        <Text>Paying {receiverName}</Text>
                    </View>
                )}
            </View>

            <GenericButton
                onPress={() => {
                    const payload = {
                        user_id: user.uid,
                        upi: upiAddress,
                        amount: Number(parseFloat(amount).toFixed(2)) * 100,
                    };
                    console.log(
                        '%cSendMoney.tsx line:79 payload',
                        'color: #007acc;',
                        payload
                    );
                    setPaymentProcessing(true);
                    postRequest(API_BASE_URL + '/payout', userIDToken, payload)
                        .then(
                            data => {
                                Alert.alert('', 'Payment Success');
                                console.log(
                                    '%cSendMoney.tsx line:86 data',
                                    'color: #007acc;',
                                    data
                                );
                                setPaymentProcessing(false);
                                navigation.navigate('Home');
                            },
                            () => Alert.alert('', 'Payment Failed')
                        )
                        .then(() => setPaymentProcessing(false));
                }}
                text=""
                type="primary"
                customStyles={{ width: '17%', alignSelf: 'flex-end' }}
                icon={
                    <Ionicons
                        name="checkmark-sharp"
                        size={20}
                        color={themes.light.buttonText}
                    />
                }
            />
        </View>
    );
};

export const semiHugeText = {
    fontFamily: 'DMSans_700Bold',
    fontSize: 24,
};

const styles = StyleSheet.create({
    pageStyles: pageStyles,
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    hugeText: hugeText,
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
    },

    input: {
        backgroundColor: '#F8F8F8',
        minWidth: '25%',

        margin: 6,
        paddingVertical: 10,
        paddingHorizontal: 12,
        includeFontPadding: false,
        borderRadius: 10,

        ...hugeText,
    },
    taxes: {
        marginBottom: 12,
    },

    totalPayableText: semiHugeText,

    reciever: {
        alignSelf: 'center',
        textAlign: 'center',
        backgroundColor: themes.light.inactiveCardBg,
        borderRadius: 10,
        padding: 8,
        margin: 10,
    },
});

export default SendMoney;
