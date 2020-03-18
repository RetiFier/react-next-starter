import App from 'next/app';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import createStore from '../redux/store/index';

class Application extends App {
	static async getInitialProps({ Component, ctx }) {
		return {
			pageProps: Component.getInitialProps ? await Component.getInitialProps(ctx) : {}
		};
	}

	render() {
		const { Component, pageProps, store } = this.props;
		return (
			<Provider store={store}>
				<Component {...pageProps} />
			</Provider>
		);
	}
}
export default withRedux(createStore)(Application);
