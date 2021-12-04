import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { mutedTextStyle } from './MoneyInfo';

const GET_STARTED_ILLUSTRATION = require('../assets/get-started.png');

const GetStartedIllustration = () => {
    return (
        <View style={styles.container}>
            <Image
                style={styles.illustration}
                source={GET_STARTED_ILLUSTRATION}
            />

            <Text
                style={{
                    ...mutedTextStyle,
                    fontSize: 16,
                    textAlign: 'center',
                    width: '70%',
                }}
            >
                To get started, Add money to your account
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // paddingVertical: 16
    },
    illustration: {
        resizeMode: 'contain',
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').height * 0.3,
    },
});

export default GetStartedIllustration;
