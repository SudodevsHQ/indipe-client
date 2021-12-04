import Ionicons from '@expo/vector-icons/build/Ionicons';
import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { themes } from '../constants/colors';
import { GenericButton } from './GenericButton';
import InfoModal from './InfoModal';

const FooterButtons = () => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.container}>
            <GenericButton
                text="Scan & Pay"
                type="primary"
                icon={
                    <Ionicons
                        name="scan-circle"
                        size={25}
                        color={themes.light.buttonText}
                        style={{ marginRight: 6 }}
                    />
                }
                onPress={() => navigation.navigate('Scanner')}
            />

            <GenericButton
                text="Recieve Money"
                type="secondary"
                onPress={() => setModalVisible(true)}
            />

            <InfoModal
                buttonText={'Add Money'}
                onButtonPress={() => navigation.navigate('Add Money')}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                modalText={
                    'To Send or Recieve money, add money to your account'
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 18,
    },
});

export default FooterButtons;
