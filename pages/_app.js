import { Provider } from 'react-redux';
import store from '../redux/store';
import App from 'next/app';
import Head from 'next/head';
import '../style/app.css';
import Server from '../db/server';

export default function MyApp({ Component, pageProps }) {
    
    const siteTitle = process.env.SiteTitle || 'MERN Sample | React/Next Todo App';
    const props = {
        ...pageProps
    }
    
    Server.getData().then(data => {
        store.dispatch({
            type: 'INIT_TODO',
            payload: data.result,
        })
    }, error => console.log(error))

    return (
        <>
        <Provider store={store}>
            <Head>
                <title>{ siteTitle }</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Component { ...props } />
        </Provider>        
        </>
    )
}

MyApp.getInitialProps = async (appContext) => {
    const appProps = await App.getInitialProps(appContext);
    return {
        ...appProps
    }
}