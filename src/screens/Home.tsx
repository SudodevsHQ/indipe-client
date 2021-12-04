import React, { useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import ProfileAvatar from '../components/ProfileAvatar';
import MoneyInfo from '../components/MoneyInfo';
import UpiInfo from '../components/UpiInfo';
import GetStartedIllustration from '../components/GetStartedIllustration';
import FooterButtons from '../components/FooterButtons';
import { signOut } from '../utils/auth';

function Home() {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.pageStyles}>
            <View style={styles.header}>
                <MoneyInfo />
                <ProfileAvatar />
            </View>

            <UpiInfo />

            <GetStartedIllustration />

            <FooterButtons />

            {/* <Button title="LOGOUT" onPress={() => signOut()}>
                LOGIN
            </Button> */}
        </View>
    );
}

export const pageStyles = {
    backgroundColor: 'white',
    flex: 1,
    padding: 18,
};

const styles = StyleSheet.create({
    pageStyles: pageStyles,
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default Home;
