import React, { useCallback, useRef, useState, useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {store, persistor} from 'state/store';
import DefaultSkeletonPage from "components/layout/DefaultSkeletonPage";
import Layout from "components/layout/Layout";
import Theme from 'styles/Theme'

function MyApp({ Component, pageProps }) {
    const Router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        Router.events.on('routeChangeStart', () => setIsLoading(true))
        Router.events.on('routeChangeComplete', () => setIsLoading(false))
    }, [Router])

    const actualPageMarkup = (
        <Component {...pageProps} />
    );

    const loadingPageMarkup = (
        <DefaultSkeletonPage />
    );
    const pageMarkup = isLoading ? loadingPageMarkup : actualPageMarkup;

    return (
        <ChakraProvider theme={Theme}>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Layout>
                    {pageMarkup}

                    </Layout>
                </PersistGate>
            </Provider>
        </ChakraProvider>
    )
}

export default MyApp
