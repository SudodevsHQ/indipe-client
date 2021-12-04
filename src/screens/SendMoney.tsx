import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';
import { themes } from '../constants/colors';
import { pageStyles } from './Home';
import { hugeText } from '../components/MoneyInfo';
import { TextInput } from 'react-native-gesture-handler';
import { GenericButton } from '../components/GenericButton';
import CloseX from '../components/CloseX';
import { useRoute } from '@react-navigation/core';

const SendMoney = () => {
    const [number, onChangeNumber] = React.useState('');
    const { params } = useRoute<any>();
    const { receiverName, upiAddress } = params ?? {};
    //   console.log(receiverName);

    const handleMoneyValueChange = value => {
        // add validation
        if (value.length < 6) {
            onChangeNumber(value);
        }
    };

    return (
        <View style={styles.pageStyles}>
            <View style={styles.header}>
                <Text style={hugeText}>Send Money</Text>

                <CloseX />
            </View>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <View style={styles.inputContainer}>
                    <Text style={hugeText}>₹</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={handleMoneyValueChange}
                        value={number}
                        placeholder="0"
                        keyboardType="decimal-pad"
                        autoFocus
                        textAlign="center"
                    />
                </View>

                {receiverName && (
                    <View style={styles.reciever}>
                        <Text>Paying {receiverName}</Text>
                    </View>
                )}
            </View>
            cu
            <GenericButton
                onPress={() => {
                    //
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
    pageStyles: { ...pageStyles },
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
