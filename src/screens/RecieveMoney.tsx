import { useAtom } from 'jotai';
import React, { useEffect } from 'react';

import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import CloseX from '../components/CloseX';
import { hugeText, mutedTextStyle } from '../components/MoneyInfo';
import {
    upiQrImageUrl,
    userAtom,
    virtualAccountDetailsAtom,
} from '../state/atoms';
import { pageStyles } from '../styles/common';

import { semiHugeText } from './AddMoney';

const upiIcon = require('../assets/upi-icon.png');

const RecieveMoney = () => {
    const [user] = useAtom(userAtom);

    const [virtualAccountDetails] = useAtom(virtualAccountDetailsAtom);
    const { upi_id } = virtualAccountDetails || {};

    const [imgUrl, setImgUrl] = useAtom(upiQrImageUrl);

    useEffect(() => {
        if (imgUrl) {
            return;
        }

        if (user && upi_id) {
            console.log('hererre---------');
            const params = new URLSearchParams({
                name: encodeURIComponent(user.displayName),
                vpa: upi_id,
                note: encodeURIComponent(
                    `Paying ${user.displayName} through Indipe`
                ),
                format: 'png',
            });
            console.log(
                '\x1b[31m%s\x1b[0m',
                'RecieveMoney.tsx line:39 UPI',
                `https://upiqr.in/api/qr?${params.toString()}`
            );

            fetch(`https://upiqr.in/api/qr?${params.toString()}`).then(
                resp => {
                    resp.blob().then(t => {
                        const fileReaderInstance = new FileReader();
                        fileReaderInstance.readAsDataURL(t);
                        fileReaderInstance.onload = () => {
                            const base64data = fileReaderInstance.result;
                            const imgurl =
                                'data:image/png' + base64data.slice(29, -1);
                            setImgUrl(imgurl);
                        };
                    });
                },
                e => console.log(e)
            );
        }
    }, [imgUrl, setImgUrl, upi_id, user]);

    return (
        <View style={styles.pageStyles}>
            <View style={styles.header}>
                <Text style={hugeText}>Recieve Money</Text>

                <CloseX />
            </View>

            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    marginBottom: 24,
                    padding: 12,
                }}
            >
                <Image
                    source={{ uri: imgUrl }}
                    style={{
                        width: '100%',
                        // height: '50%',
                        aspectRatio: 1,
                        resizeMode: 'contain',
                        padding: 12,
                        alignSelf: 'center',
                    }}
                />

                <View
                    style={{
                        flexDirection: 'row',
                        alignSelf: 'center',
                        marginTop: 8,
                    }}
                >
                    <Image style={styles.avatar} source={upiIcon} />
                    <Text style={mutedTextStyle}>Your UPI QR Code</Text>
                </View>
                <Text
                    style={{
                        ...semiHugeText,
                        alignSelf: 'center',
                        marginTop: 12,
                    }}
                >
                    {upi_id}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    pageStyles: pageStyles,
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    avatar: {
        width: 52,
        height: 19,
        marginRight: 6,
    },
});

export default RecieveMoney;
