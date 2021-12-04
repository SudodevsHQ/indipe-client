import { atom, useAtom } from 'jotai';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ASYNC_STORAGE_KEYS } from '../constants/asyncStorage';

/**
 *
 * @see https://jotai.org/docs/guides/persistence#a-helper-function-with-async-storage-and-json-parse
 */
function atomWithAsyncStorage<T, K>(key, initialValue) {
    const baseAtom = atom(initialValue);
    baseAtom.onMount = setValue => {
        (async () => {
            const item = await AsyncStorage.getItem(key);
            if (item) {
                setValue(JSON.parse(item));
            }
        })();
    };
    const derivedAtom = atom<T, K>(
        get => get(baseAtom),
        (get, set, update) => {
            const nextValue =
                typeof update === 'function' ? update(get(baseAtom)) : update;
            set(baseAtom, nextValue);
            AsyncStorage.setItem(key, JSON.stringify(nextValue));
        }
    );
    return derivedAtom;
}

export const userAtom = atom<Record<string, string> | null>(null);

export const userIDTokenAtom = atom('');

export const isUserAccountCreatedAtom = atomWithAsyncStorage(
    ASYNC_STORAGE_KEYS.USER_CREATED_IN_BE,
    false
);

export const currencyDataAtom = atomWithAsyncStorage(
    ASYNC_STORAGE_KEYS.CURRENCY_DATA,
    {
        currencyCode: 'USD',
        symbol: '$',
    }
);

const exchangeRateAtom = atom<{
    loading: boolean;
    data: null | string;
}>({ loading: true, data: null });

export const fetchExchangeAtom = atom(
    get => get(exchangeRateAtom),
    (_get, set) => {
        const { currencyCode } = _get(currencyDataAtom);

        const fetchData = async () => {
            set(exchangeRateAtom, prev => ({ ...prev, loading: true }));
            try {
                const response = await fetch(
                    `https://www.headout.com/api/v1/currency/convert?from-currency=${currencyCode}&to-currency=INR`
                );
                const data = await response.json();

                set(exchangeRateAtom, {
                    loading: false,
                    data: data.conversionRate,
                });
            } catch (error) {
                console.log(
                    '\x1b[42m%s\x1b[0m',
                    'atoms.ts line:48 error',
                    error
                );
            }
        };
        fetchData();
    }
);

fetchExchangeAtom.onMount = fetchExchange => {
    fetchExchange();
};

export type TVirtualAccountDetails = {
    user_id: string;
    account_id: string;
    balance: number;
    upi_id: string;
};

export const virtualAccountDetailsAtom = atomWithAsyncStorage<
    TVirtualAccountDetails | null,
    any
>('virtualAccountDetails', null);
