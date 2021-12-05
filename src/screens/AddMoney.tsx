import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RazorpayCheckout from 'react-native-razorpay';
import { useAtom } from 'jotai';

import { themes } from '../constants/colors';
import { hugeText, mutedTextStyle } from '../components/MoneyInfo';
import { TextInput } from 'react-native-gesture-handler';
import CloseX from '../components/CloseX';
import CurrencySelect from '../components/CurrencySelect';
import { RAZORPAY_API_KEY } from '../../keys';
import { GenericButton } from '../components/GenericButton';

import useCurrencyAndExchangeData from '../hooks/useCurrencyAndExchangeData';
import { virtualAccountDetailsAtom } from '../state/atoms';
import { pageStyles } from '../styles/common';
import { useNavigation } from '@react-navigation/core';
import AmountInput from '../components/AmountInput';

const AddMoney = () => {
    const [amount, onChangeAmount] = React.useState('');

    const [virtualAccountDetails] = useAtom(virtualAccountDetailsAtom);

    const [currencyData, setCurrencyData, exchangeRate] =
        useCurrencyAndExchangeData();

    const navigation = useNavigation();

    const totalInINR = (
        parseFloat(exchangeRate.data ?? '0') * parseFloat(amount || '0')
    ).toFixed(2);

    const handleMoneyValueChange = (value: string) => {
        if (!/^\d{0,5}(\.\d{0,2})?$/g.test(value)) {
            return;
        }

        onChangeAmount(value);
    };

    // console.log(currencyData);

    const handleDonePress = () => {
        const options = {
            description: 'Wallet credit',
            image: 'https://i.imgur.com/3g7nmJC.png',
            currency: 'INR',
            key: RAZORPAY_API_KEY, // Your api key
            amount: (parseFloat(totalInINR) * 100).toFixed(0),
            name: 'Test',
            notes: {
                user_id: virtualAccountDetails.user_id,
                upi_id: virtualAccountDetails.upi_id,
            },
            prefill: {
                email: 'void@razorpay.com',
                contact: '9191919191',
                name: 'Razorpay Software',
            },
            theme: { color: themes.light.auxiliaryBackgroundColor },
        };

        console.log('----- OPTIONS', options);

        RazorpayCheckout.open(options)
            .then(data => {
                // console.log(data);
                Alert.alert('', 'Money added successfully', [
                    {
                        text: 'Okay',
                        onPress: () => navigation.navigate('Home'),
                        style: 'cancel',
                    },
                ]);
            })
            .catch(error => {
                console.log(
                    '\x1b[31m%s\x1b[0m',
                    'AddMoney.tsx line:78 [ERROR] :PAYMENT(TOPUP) FAIL: ',
                    error
                );
                alert(
                    `${
                        error.code == 0 ? 'Payment Cancelled' : 'Payment Failed'
                    }`
                );
            });
    };

    return (
        <View style={styles.pageStyles}>
            <View style={styles.header}>
                <Text style={hugeText}>Add Money</Text>

                <CloseX />
            </View>

            <View style={{ flex: 1, justifyContent: 'center' }}>
                <AmountInput
                    amount={amount}
                    handleAmountChange={handleMoneyValueChange}
                    currencySymbol={currencyData?.symbol}
                />

                <CurrencySelect
                    onCurrencyChange={c => setCurrencyData(c)}
                    currencyData={currencyData}
                />

                <View style={styles.infoCard}>
                    <Text
                        style={{
                            color: themes.light.auxiliaryBackgroundColor,
                            fontFamily: 'DMSans_400Regular',
                            fontSize: 14,
                        }}
                    >
                        Total Payable in INR: ₹{' '}
                    </Text>

                    <Text
                        style={{
                            color: themes.light.auxiliaryBackgroundColor,
                            fontFamily: 'DMSans_400Regular',
                            fontSize: 14,
                        }}
                    >
                        {exchangeRate.loading ? (
                            <ActivityIndicator size="small" color="#3a3a3a" />
                        ) : (
                            totalInINR
                        )}
                    </Text>
                </View>
            </View>

            <View style={styles.taxes}>
                <Text style={mutedTextStyle}>*Exclusive of Conversion Fee</Text>
            </View>

            <View style={styles.row}>
                <View>
                    <Text style={styles.totalPayableText}>
                        {currencyData?.symbol ?? '$'}{' '}
                        {amount === '' ? 0 : amount}
                    </Text>

                    <Text style={mutedTextStyle}>(Total Payable)</Text>
                </View>

                {amount.length > 0 ? (
                    <GenericButton
                        onPress={handleDonePress}
                        text=""
                        type="primary"
                        customStyles={{ width: '17%' }}
                        icon={
                            <Ionicons
                                name="checkmark-sharp"
                                size={20}
                                color={themes.light.buttonText}
                            />
                        }
                    />
                ) : null}
            </View>
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

    taxes: {
        marginBottom: 12,
    },

    totalPayableText: semiHugeText,

    infoCard: {
        backgroundColor: themes.light.inactiveCardBg,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginTop: 16,
        alignSelf: 'center',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default AddMoney;
