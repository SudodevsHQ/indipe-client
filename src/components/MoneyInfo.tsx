import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { themes } from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import useCurrencyAndExchangeData from '../hooks/useCurrencyAndExchangeData';
import { virtualAccountDetailsAtom } from '../state/atoms';
import { useAtom } from 'jotai';

const MoneyInfo = ({ showTransferButton = false }) => {
    const navigation = useNavigation();

    const [virtualAccountDetails] = useAtom(virtualAccountDetailsAtom);

    const { balance: balanceInINR = 0.0 } = virtualAccountDetails || {};

    const [currencyData, , exchangeRate] = useCurrencyAndExchangeData();

    const balanceInSelectedCurrency = (
        balanceInINR *
        (1 / parseFloat(exchangeRate.data))
    ).toFixed(2);

    const goToAddMoneyScreen = () => navigation.navigate('Add Money');

    return (
        <View style={styles.container}>
            <Text style={styles.subText}>Balance</Text>

            <View style={styles.row}>
                <Text style={[styles.hugeText, { marginRight: 10 }]}>
                    ₹ {balanceInINR?.toFixed(2)}
                </Text>

                <Text style={styles.subText}>
                    {currencyData.symbol} {balanceInSelectedCurrency}
                </Text>
            </View>

            <View style={styles.row}>
                <TouchableOpacity
                    style={[styles.btn, styles.borderBtn, styles.row]}
                    onPress={goToAddMoneyScreen}
                >
                    <Ionicons
                        name="add-circle"
                        size={20}
                        color={themes.light.titleText}
                    />
                    <Text style={styles.subText}>Add Money</Text>
                </TouchableOpacity>

                {showTransferButton ? (
                    <TouchableOpacity
                        style={[styles.btn, styles.filledBtn, styles.row]}
                        onPress={goToAddMoneyScreen}
                    >
                        <Ionicons
                            name="caret-back-circle-outline"
                            size={20}
                            color={themes.light.subText}
                        />
                        <Text
                            style={{
                                color: themes.light.buttonText,
                                marginLeft: 4,
                                fontFamily: 'DMSans_400Regular',
                            }}
                        >
                            Transfer Money back
                        </Text>
                    </TouchableOpacity>
                ) : null}
            </View>
        </View>
    );
};

export const mutedTextStyle = {
    fontFamily: 'DMSans_400Regular',
    color: themes.light.subText,
};

export const hugeText = {
    fontSize: 36,
    color: themes.light.titleText,
    fontFamily: 'DMSans_700Bold',
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    subText: mutedTextStyle,

    hugeText: hugeText,

    btn: {
        borderRadius: 10,
        borderWidth: 1,
        padding: 6,
        marginTop: 4,
    },

    borderBtn: {
        backgroundColor: 'white',
        borderColor: themes.light.titleText,
    },

    filledBtn: {
        paddingHorizontal: 10,
        marginLeft: 10,
        backgroundColor: themes.light.buttonBackground[0],
    },
});

export default MoneyInfo;
