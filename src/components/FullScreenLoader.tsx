import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { themes } from '../constants/colors';
import { pageStyles } from '../styles/common';

const FullScreenLoader = () => {
    return (
        <View style={styles.pageStyles}>
            <ActivityIndicator
                color={themes.light.auxiliaryBackgroundColor}
                size="large"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    pageStyles: {
        ...pageStyles,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default FullScreenLoader;
