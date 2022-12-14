import Document, { Html, Head, Main, NextScript } from 'next/document';


class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    {/* <link
                    rel='preload'
                    href='/fonts/DancingScript-Bold.ttf'
                    as='font'
                    crossOrigin='anonymous'></link>
                    <link
                    rel='preload'
                    href='/fonts/DancingScript-Regular.ttf'
                    as='font'
                    crossOrigin='anonymous'></link>
                    <link
                    rel='preload'
                    href='/fonts/DancingScript-SemiBold.ttf'
                    as='font'
                    crossOrigin='anonymous'></link> */}
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                    <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;600;700&display=swap" rel="stylesheet" />
                </Head>
                <body>
                    <Main></Main>
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument;