import Ionicons from '@expo/vector-icons/build/Ionicons';
import { useNavigation } from '@react-navigation/core';
import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    StyleProp,
    TextStyle,
} from 'react-native';
import { GestureResponderEvent } from 'react-native-modal';
import { themes } from '../constants/colors';

const FooterButtons = () => {
    const navigation = useNavigation();
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
                onPress={() => navigation.navigate('Send Money')}
            />
        </View>
    );
};

export const GenericButton = ({
    text,
    type,
    icon,
    customStyles = {},
    onPress,
}: {
    text: string;
    type: 'primary' | 'secondary' | 'outlined';
    icon?: React.ReactNode;
    customStyles?: StyleProp<TextStyle>;
    onPress: (event: GestureResponderEvent) => void;
}) => {
    return (
        <TouchableOpacity
            style={[
                styles.ctaButton,
                {
                    borderWidth: type === 'outlined' ? 1 : 0,
                    backgroundColor:
                        type === 'outlined'
                            ? 'white'
                            : themes.light.buttonBackground[
                                  type === 'primary' ? 0 : 1
                              ],
                },
                customStyles,
            ]}
            onPress={onPress}
        >
            {icon ? icon : null}

            <Text
                style={[
                    styles.buttonText,
                    type === 'outlined'
                        ? { color: themes.light.titleText }
                        : {},
                ]}
            >
                {text}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 18,
    },
    ctaButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 8,
        width: '48%',
    },
    buttonText: {
        color: themes.light.buttonText,
        fontFamily: 'DMSans_500Medium',
        fontSize: 16,
    },
});

export default FooterButtons;
