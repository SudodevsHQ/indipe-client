import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
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

const AddMoney = () => {
    const [amount, onChangeAmount] = React.useState('');

    const [virtualAccountDetails] = useAtom(virtualAccountDetailsAtom);

    const [currencyData, setCurrencyData, exchangeRate] =
        useCurrencyAndExchangeData();

    const totalInINR = (
        parseFloat(exchangeRate.data ?? '0') * parseFloat(amount || '0')
    ).toFixed(2);

    const handleMoneyValueChange = (value: string) => {
        // add validation
        if (value.length < 6) {
            onChangeAmount(value);
        }
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
                // handle success
                console.log(data);
                alert(`Money added successfully!`);
            })
            .catch(error => {
                // handle failure
                console.log(error);
                alert(`Error: ${error.code} | ${error.description}`);
            });
    };

    return (
        <View style={styles.pageStyles}>
            <View style={styles.header}>
                <Text style={hugeText}>Add Money</Text>

                <CloseX />
            </View>

            <View style={{ flex: 1, justifyContent: 'center' }}>
                <View style={styles.inputContainer}>
                    <Text style={hugeText}>{currencyData?.symbol ?? '$'}</Text>

                    <TextInput
                        style={styles.input}
                        onChangeText={handleMoneyValueChange}
                        value={amount}
                        placeholder="0"
                        keyboardType="decimal-pad"
                        autoFocus
                        textAlign="center"
                        // ref={}
                    />
                </View>

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
                <Text style={mutedTextStyle}>Taxes here ig</Text>
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
