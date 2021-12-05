import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import auth from '@react-native-firebase/auth';

import { themes } from '../constants/colors';
import { onGoogleButtonPress } from '../utils/auth';

const image = require('../assets/splash.png');

const LoginScreen = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleLoginPress = () => {
        setIsLoading(true);

        onGoogleButtonPress()
            .then(() => {
                auth()
                    .currentUser.getIdToken()
                    .then(t => console.log(t));

                console.log('Signed in with Google!');
            })
            .catch(e => console.log(e));
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={image}
                resizeMode="cover"
                style={styles.backgroundImg}
            >
                <View style={styles.signinContainer}>
                    <TouchableOpacity
                        style={styles.signInButton}
                        onPress={handleLoginPress}
                    >
                        <Text style={styles.buttonText}>Get Started</Text>

                        {isLoading && (
                            <ActivityIndicator size="small" color="#f0f0f0" />
                        )}
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
    },
    signinContainer: {
        flex: 1,
        width: '100%',
        position: 'absolute',
        top: '75%',
    },
    signInButton: {
        zIndex: 5,
        alignSelf: 'center',
        flexDirection: 'row',
        width: 'auto',
        alignItems: 'center',
        backgroundColor: themes.light.buttonBackground[0],
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 20,
    },
    buttonText: {
        color: themes.light.buttonText,
        fontFamily: 'DMSans_500Medium',
        marginRight: 6,
    },
    backgroundImg: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
});

export default LoginScreen;
