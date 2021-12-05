import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { hugeText } from './MoneyInfo';

type TAmountProps = {
    amount: string;
    handleAmountChange: (value: string) => void;
    currencySymbol: string;
};

const AmountInput = ({
    amount,
    handleAmountChange,
    currencySymbol,
}: TAmountProps) => {
    return (
        <View style={styles.inputContainer}>
            <Text style={hugeText}>{currencySymbol ?? '$'}</Text>

            <View style={styles.inputWrapper}>
                <TextInput
                    style={styles.input}
                    onChangeText={handleAmountChange}
                    value={amount}
                    placeholder="0"
                    keyboardType="decimal-pad"
                    autoFocus
                    textAlign="center"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
    },

    inputWrapper: {
        backgroundColor: '#F8F8F8',
        padding: 10,
        borderRadius: 10,
        margin: 6,
        minWidth: '20%',
    },

    input: {
        margin: 0,
        padding: 0,
        includeFontPadding: false,
        borderRadius: 10,

        fontWeight: 'normal',
        ...hugeText,
    },
});

export default AmountInput;
