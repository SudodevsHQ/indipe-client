import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { themes } from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { mutedTextStyle } from './MoneyInfo';

const upiIcon = require('../assets/upi-icon.png');

const UpiInfo = () => {
    return (
        <View
            style={[
                styles.card,
                { backgroundColor: themes.light.inactiveCardBg },
            ]}
        >
            <View style={{ flexDirection: 'row' }}>
                <Image style={styles.avatar} source={upiIcon} />
                <Text style={styles.subText}>Your UPI Address</Text>
            </View>

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
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 18,
        marginTop: 24,
        borderRadius: 10,
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
});

export default UpiInfo;
