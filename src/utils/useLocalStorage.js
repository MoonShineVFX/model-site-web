import { useState } from 'react';

export default function useLocalStorage (key, initVal) {

    const [storedValue, setStoredValue] = useState(() => {

        try {

            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initVal;

        }
        catch (error) {

            console.log(error);
            return initVal;

        }

    });

    const setValue = (value) => {

        try {

            window.localStorage.setItem(key, JSON.stringify(value));

        }
        catch (error) {

            console.log(error);

        }

        setStoredValue(value);

    };

    return [storedValue, setValue];

}

/**
 * 加入購物車
 * https://stackoverflow.com/questions/65523588/react-cart-with-context-and-localstorage
 */
