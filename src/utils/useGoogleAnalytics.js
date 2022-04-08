import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import * as analytics from './analytics';

export default function useGoogleAnalytics (payload = {
    category: '',
    action: '',
    label: '',
}) {

    // Router
    const router = useRouter();

    // State
    // const [event, setEvent] = useState();

    useEffect(() => {

        analytics.init();
        analytics.sendPageview(router.pathname);

    }, [router]);

    // const triggerEvent = analytics.sendEvent(payload);

    return [analytics.sendEvent(payload)];

}
