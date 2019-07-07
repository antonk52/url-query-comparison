import {useState, useEffect, Fragment} from 'react';
import Head from 'next/head';
import TextField from '../components/TextField';
import Snippet from '../components/Snippet';
import Button from '../components/Button';
import Table from '../components/Table';
import {compareQueryParamsInUrls} from '../helpers/url';
import Footer from '../components/Footer';

function GlobalStyles() {
    return (
        <style jsx global>{`
            * {
                box-sizing: border-box;
                font-size: 14px;
                font-family: Helvetica, Arial, sans-serif;
                margin: 0;
                padding: 0;
            }
            
            ::selection {
                background-color: #79FFE1;
            }

            html, body {
                width: 100vw;
                overflow-x: hidden;
                padding: 0;
                margin: 0;
            }    
        `}</style>
    );
}

export default () => {
    const [firstUrl, setFirstUrl] = useState('');
    const [secondUrl, setSecondUrl] = useState('');
    const [ignore, setIgnore] = useState('');
    const [difference, setDifference] = useState([]);
    const [equal, setEqual] = useState([]);

    const reset = () => {
        setFirstUrl('');
        setSecondUrl('');
    };

    const compare = () => {
        let ignoreParams = '';

        try {
            localStorage.setItem('ignoreParams', ignore);
            ignoreParams = ignore.replace(' ', '').split(',');
        } catch (e) {}

        const {diff, eq} = compareQueryParamsInUrls(firstUrl, secondUrl, ignoreParams);
        setDifference(diff);
        setEqual(eq);
    };

    useEffect(() => {
        try {
            setIgnore(localStorage.getItem('ignoreParams') || '')
        } catch (e) {}
    }, []);

    useEffect(() => {
        const onKeyDown = function (event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                compare();
            }
        };
        window.addEventListener('keydown', onKeyDown);

        return function unsubscribe() {
            window.removeEventListener('keydown', onKeyDown);
        };
    });

    return (
        <Fragment>
            <main>
                <Head>
                    <title>Compare Urls</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width, maximum-scale=1" />
                    <meta name="description" content="Comparator for url query parameters. Use it for large urls." />
                    <meta name="author" content="nataxo" />
                    <link href="/static/favicon.ico" rel="shortcut icon" type="image/x-icon" />
                </Head>
                <h1>Compare Urls</h1>
                <Snippet>
                    <TextField
                        label="First Url"
                        value={firstUrl}
                        onChange={setFirstUrl}
                    />
                    <TextField
                        label="Second Url"
                        value={secondUrl}
                        onChange={setSecondUrl}
                    />
                    <TextField
                        label="Ignore params"
                        value={ignore}
                        onChange={setIgnore}
                        placeholder={'param1, param2, ...'}
                        rows={1}
                    />

                    <div className="buttonGroup">
                        <Button type="submit" onClick={compare}>Compare</Button>
                        <Button type="reset" onClick={reset}>Clean</Button>
                    </div>
                </Snippet>

                <Snippet>
                    <h3>Difference</h3>
                    {difference.length > 0
                        ? <Table titles={['Param', 'First Url', 'Second Url']} values={difference} />
                        : <div className="info">No differences</div>
                    }
                </Snippet>

                {equal.length > 0 && (
                    <Snippet>
                        <h3>Equal</h3>
                        <Table titles={['Param', 'Value']} values={equal} />
                    </Snippet>
                )}

                <GlobalStyles />
                <style jsx>{`
                    main {
                        display: flex;
                        flex-direction: column;
                    
                        padding: 24px;
                        max-width: 100%;
                    }
                    
                    h4 {
                        font-weight: bold;
                        font-size: 18px;
                        margin-bottom: 8px;
                        margin-top: 0;
                    }
         
                    .buttonGroup {
                        display: flex;
                        margin-top: 24px;
                    }
                    
                    .info {
                        color: #666;
                    }
                    
                    @media screen and (max-width: 599px) {
                        main {
                            padding: 12px 8px;
                            width: 100%;
                            overflow-x: hidden;
                        }
                        
                        .buttonGroup {
                            margin-top: 16px;
                        }
                    }
                `}</style>
            </main>
            <Footer />
        </Fragment>
    );
}
