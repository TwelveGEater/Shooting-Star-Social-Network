import React, { Suspense } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import { Route, withRouter, Switch } from 'react-router-dom';
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginPage from './components/Login/Login';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Preloader from './components/common/preloader/Preloader';
import { initializeApp } from './redux/app-reducer';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/redux-store';
import Music from './components/Music/Music';

const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const Settings = React.lazy(() => import('./components/Settings/Settings'));

class App extends React.Component {
	componentDidMount() {
		this.props.initializeApp();
	}
	render() {
		if (!this.props.initialized) {
			return <Preloader />;
		}
		return (
			<div className="app-wrapper">
				<HeaderContainer />
				<Navbar />
				<div className="app-wrapper-content">
					<Switch>
						<Route
							path="/dialogs"
							render={() => {
								return (
									<Suspense fallback={<Preloader />}>
										<DialogsContainer />
									</Suspense>
								);
							}}
						/>
						<Route
							path="/profile/:userId?"
							render={() => {
								return (
									<Suspense fallback={<Preloader />}>
										<ProfileContainer />
									</Suspense>
								);
							}}
						/>
						<Route path="/users" render={() => <UsersContainer />} />
						<Route
							path="/settings"
							render={() => {
								return (
									<Suspense fallback={<Preloader />}>
										<Settings />
									</Suspense>
								);
							}}
						/>
						<Route path="/login" render={() => <LoginPage />} />
						<Route path="*" render={() => <div>404 NOT FOUND</div>} />
					</Switch>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	initialized: state.app.initialized
});

let AppContainer = compose(withRouter, connect(mapStateToProps, { initializeApp }))(App);

const ShootingStarApp = () => {
	return (
		<HashRouter>
			<Provider store={store}>
				<AppContainer />
			</Provider>
		</HashRouter>
	);
};

export default ShootingStarApp;
