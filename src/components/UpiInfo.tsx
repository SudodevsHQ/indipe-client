import React from 'react';
import { Text, View, StyleSheet, Image, ToastAndroid } from 'react-native';
import * as Clipboard from 'expo-clipboard';

import { themes } from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { mutedTextStyle } from './MoneyInfo';
import { TouchableOpacity } from 'react-native-gesture-handler';

const upiIcon = require('../assets/upi-icon.png');

const UpiInfo = ({ upiId }: { upiId: string }) => {
    const copyToClipboard = () => {
        Clipboard.setString(upiId);
        ToastAndroid.showWithGravity(
            'Copied to clipboard',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
    };

    return (
        <View
            style={[
                styles.card,
                {
                    backgroundColor: upiId
                        ? themes.light.auxiliaryBackgroundColor
                        : themes.light.inactiveCardBg,
                },
            ]}
        >
            <View>
                <View style={{ flexDirection: 'row' }}>
                    <Image style={styles.avatar} source={upiIcon} />
                    <Text style={styles.subText}>Your UPI Address</Text>
                </View>

                {upiId ? (
                    <Text style={styles.upiAddress}>{upiId}</Text>
                ) : (
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 9,
                        }}
                    >
                        <Ionicons
                            name="information-circle-outline"
                            size={20}
                            color={themes.light.subText}
                        />
                        <Text style={styles.infoText}>
                            Add money to get an UPI address
                        </Text>
                    </View>
                )}
            </View>

            {upiId && (
                <View style={{ marginLeft: 'auto', alignSelf: 'center' }}>
                    <TouchableOpacity
                        style={{ padding: 4 }}
                        onPress={copyToClipboard}
                    >
                        <Ionicons
                            // style={{}}
                            name="copy-outline"
                            size={20}
                            color={themes.light.buttonBackground[1]}
                        />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 18,
        marginTop: 24,
        borderRadius: 10,
        flexDirection: 'row',
        // marginBottom: "100%",
    },
    avatar: {
        width: 52,
        height: 19,
        marginRight: 6,
    },
    subText: mutedTextStyle,
    infoText: {
        marginLeft: 4,
        fontFamily: 'DMSans_700Bold',
        fontSize: 16,
    },

    upiAddress: {
        fontFamily: 'DMSans_700Bold',
        color: themes.light.auxiliaryText,
        marginTop: 6,
        fontSize: 16,
    },
});

export default UpiInfo;
