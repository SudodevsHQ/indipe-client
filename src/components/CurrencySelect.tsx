import React from 'react';
import { StyleSheet } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { getCurrencyList } from '../utils/currency';
import { mutedTextStyle } from './MoneyInfo';

const currencies = getCurrencyList();

export type TCurrencyProps = {
    currencyCode: any;
    symbol: any;
};

const CurrencySelect = ({
    onCurrencyChange,
}: {
    onCurrencyChange: ({ currencyCode, symbol }: TCurrencyProps) => void;
}) => {
    return (
        <SelectDropdown
            data={currencies}
            buttonStyle={styles.selectStyle}
            buttonTextStyle={styles.buttonTextStyle}
            defaultButtonText="Select Currency"
            onSelect={(selectedItem, index) => {
                // console.log(selectedItem, index);
                onCurrencyChange({
                    currencyCode: selectedItem.code,
                    symbol: selectedItem.localSymbol,
                });
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
                return `${selectedItem.localSymbol} ${selectedItem.currencyName}`;
            }}
            rowTextForSelection={(item, index) => {
                return item.currencyName;
            }}
        />
    );
};

const styles = StyleSheet.create({
    selectStyle: {
        marginTop: 10,
        alignSelf: 'center',
        borderWidth: 1,
        borderRadius: 10,
        padding: 4,
        backgroundColor: 'white',
    },
    buttonTextStyle: { ...mutedTextStyle, fontSize: 16 },
    // rowStyle: {
    //   width: 100,
    // },
});

export default CurrencySelect;
