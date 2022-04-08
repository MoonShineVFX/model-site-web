import ReactGA from 'react-ga';

const init = () => {

    ReactGA.initialize(process.env.NEXT_PUBLIC_GAID);

};

// event
const sendEvent = (payload) => {

    ReactGA.event(payload);

};

// page
const sendPageview = (path) => {

    ReactGA.set({ page: path });
    ReactGA.pageview(path);

};

export {
    init,
    sendEvent,
    sendPageview,
};
