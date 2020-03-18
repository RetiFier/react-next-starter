import Document, { Main, Head, NextScript, Html } from 'next/document';
import { ServerStyleSheet, createGlobalStyle } from 'styled-components';
import { ServerStyleSheets } from '@material-ui/styles';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0 ;
	padding: 0;
	:focus {
	outline: none;
	
}
}
html,
body, #__next {
	min-height: 10vh;
	height: 100%;
	background-color: #F5F7FF;
}
body {
	font-family:  sans-serif;
	margin:0 ;
  }

  `;
export default class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const originalRenderPage = ctx.renderPage;
		const styledComponentsSheet = new ServerStyleSheet();
		const materialSheets = new ServerStyleSheets();

		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: App => props =>
						styledComponentsSheet.collectStyles(materialSheets.collect(<App {...props} />))
				});

			const initialProps = await Document.getInitialProps(ctx);
			return {
				...initialProps,
				styles: (
					<React.Fragment>
						{initialProps.styles}
						{materialSheets.getStyleElement()}
						{styledComponentsSheet.getStyleElement()}
					</React.Fragment>
				)
			};
		} finally {
			styledComponentsSheet.seal();
		}
	}
	render() {
		return (
			<Html>
				<Head></Head>
				<body>
					<GlobalStyle />
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
