import { atom } from 'jotai';
import { TCurrencyProps } from '../components/CurrencySelect';

export const userAtom = atom<Record<string, string> | null>(null);

export const currencyDataAtom = atom<TCurrencyProps>({
    currencyCode: 'USD',
    symbol: '$',
});
