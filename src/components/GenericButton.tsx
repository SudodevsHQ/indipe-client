import React from 'react';
import {
    StyleProp,
    TextStyle,
    GestureResponderEvent,
    TouchableOpacity,
    StyleSheet,
    Text,
} from 'react-native';
import { themes } from '../constants/colors';

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
