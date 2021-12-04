import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeDataInAsyncStorage = async (key: string, value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        // saving error
        console.log(
            '\x1b[41m%s\x1b[0m',
            '[ERROR]:Failed to store in AsyncStorage',
            key,
            e
        );
    }
};

export const getDataFromAsyncStorage = async (key: string) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log(
            '\x1b[41m%s\x1b[0m',
            '[ERROR]:Failed to read key in AsyncStorage',
            key
        );
        return null;
    }
};
