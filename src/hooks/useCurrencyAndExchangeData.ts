import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { TCurrencyProps } from '../components/CurrencySelect';
import { currencyDataAtom, fetchExchangeAtom } from '../state/atoms';

const useCurrencyAndExchangeData = (): [
    TCurrencyProps,
    (update?: TCurrencyProps) => void,
    {
        loading: boolean;
        data: string;
    }
] => {
    const [currencyData, setCurrencyData] = useAtom<
        TCurrencyProps,
        TCurrencyProps,
        void
    >(currencyDataAtom);

    const [exchangeRate, fetchExchangeRate] = useAtom(fetchExchangeAtom);

    useEffect(() => {
        fetchExchangeRate();
    }, [currencyData, fetchExchangeRate]);

    return [currencyData, setCurrencyData, exchangeRate];
};

export default useCurrencyAndExchangeData;
