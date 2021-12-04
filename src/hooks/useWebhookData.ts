import { useAtom } from 'jotai';
import * as React from 'react';

import { API_BASE_URL } from '../constants/api';
import { transctionsAtom, updateBalanceAtom, userAtom } from '../state/atoms';

export default function useWebhookData() {
    const [connectionActive, setConnectionActive] = React.useState(false);

    const [user] = useAtom(userAtom);

    const [, updateBalance] = useAtom(updateBalanceAtom);

    const [, setTransactions] = useAtom(transctionsAtom);

    const ws = React.useRef(null);

    const uri = encodeURI(
        `wss://betsushi.is-up-in.space/ws?user_id=${user.uid}`
    );

    React.useEffect(() => {
        if (user?.uid && !ws.current && !connectionActive) {
            console.log('-----------_---WS ASSIGNNNEDDD--------------: ', uri);
            ws.current = new WebSocket(uri);
            setConnectionActive(true);
        }
    }, [user?.uid, connectionActive, uri]);

    const retryTimer = React.useRef(null);

    // React.useEffect(() => {
    //     if (retryTimer.current) {
    //         return;
    //     }
    //     retryTimer.current = setTimeout(() => {
    //         if (!connectionActive) {
    //             console.log('here');
    //             ws.current = null;
    //             ws.current = new WebSocket(uri);
    //             retryTimer.current = null;
    //         }
    //     }, 6000);
    // }, [connectionActive, uri]);

    // React.useEffect(() => {
    //     setTimeout(() => {
    //         ws.current.close();
    //     }, 3000);
    // }, []);

    React.useEffect(() => {
        if (!ws.current) return;

        // console.log(
        //     '\x1b[44m%s\x1b[0m',
        //     'useWebhookData.ts line:30 user.id',
        //     ws.current.url
        // );

        ws.current.onopen = () => {
            setConnectionActive(true);
            console.log(
                '\x1b[32m%s\x1b[0m',
                'useWebhookData.ts [WS]: Connected to the server'
            );
        };

        ws.current.onclose = e => {
            console.log('[WS]: Disconnected. Check internet or server.');
            // ws.current = new WebSocket(uri);
        };

        ws.current.onerror = error => {
            setConnectionActive(false);
            console.log(
                '\x1b[32m%s\x1b[0m',
                'useWebhookData.ts line:41 [WS]: error',
                error
            );
        };

        ws.current.onmessage = e => {
            console.log(e.data);

            const data = JSON.parse(e.data);

            console.log(
                '\x1b[44m%s\x1b[0m',
                'useWebhookData.ts line:86 e.data.balance',
                data.balance
            );
            updateBalance(data.balance);
            setTransactions(data.transactions);
        };

        return () => ws.current.close();
    }, [user?.id, ws]);

    // return;
}
