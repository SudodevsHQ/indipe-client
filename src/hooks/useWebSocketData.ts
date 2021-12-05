import * as React from 'react';
import { useAtom } from 'jotai';
import useWebSocket from 'react-use-websocket';

import { transactionsAtom, updateBalanceAtom, userAtom } from '../state/atoms';
import { useState } from 'react';
import usePrevious from './usePrevious';

const useWebSocketData = () => {
    const [user] = useAtom(userAtom);

    const [, updateBalance] = useAtom(updateBalanceAtom);

    const [, setTransactions] = useAtom(transactionsAtom);

    const [socketUrl, setSocketUrl] = useState(null);

    const prevUserUid = usePrevious(user?.uid);

    React.useEffect(() => {
        if (user?.uid && prevUserUid !== user.uid) {
            setSocketUrl(
                `wss://betsushi.is-up-in.space/ws?user_id=${user.uid}`
            );
        }
    }, [user?.uid, prevUserUid]);

    const { readyState } = useWebSocket(socketUrl, {
        onOpen: () =>
            console.log(
                '\x1b[32m%s\x1b[0m',
                'useWebhookData.ts [WS]: Connected to the server'
            ),
        onClose: () =>
            console.log(
                '\x1b[41m%s\x1b[0m',
                'useWebhookData.ts [WS]: Websocket disconnected!'
            ),

        onError: e =>
            console.log(
                '\x1b[41m%s\x1b[0m',
                'useWebhookData.ts [WS]: Websocket ERROR: ',
                e
            ),
        retryOnError: true,

        onMessage: e => {
            console.log(e.data);

            const data = JSON.parse(e.data);

            console.log(
                '\x1b[44m%s\x1b[0m',
                'useWebhookData.ts line:86 e.data.balance',
                data.balance
            );
            updateBalance(data.balance);

            setTransactions(data.transactions);
        },

        //Will attempt to reconnect on all close events, such as server shutting down
        shouldReconnect: closeEvent => true,
        reconnectAttempts: 10,
        reconnectInterval: 2000,
        share: true,
    });

    console.log(
        '\x1b[41m%s\x1b[0m',
        'useWebhookData.ts line:164 readyState',
        readyState
    );
};

export default useWebSocketData;
