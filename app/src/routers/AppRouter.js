import React from 'react';
import { Switch, Route, Redirect } from "react-router";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import { useAuth } from "hooks/useClient";
import LoginScreen from "screens/Login";
import POSScreen from "screens/Pos";
import ProductScreen from "screens/Product";
import ClientScreen from "screens/Client";
import SettingScreen from "screens/Settings";
import HistoryScreen from "screens/History";
// const KeyScreen = lazy(() => import("screens/Key"));
//const LoginScreen = lazy(() => import("screens/Login"));

const ProtectedRoute = (props) => {
	const { user } = useAuth();
	return ( user?.name || user?.isGuest ) ? (
		<Route {...props} />
	) : (
		<Redirect to="/" />
	);
};
export const AppRouter = ({
	history,
	store
}) => {
	return (
		<Provider store={store}>
          	<ConnectedRouter history={history}>
				<Switch>
					<Route path="/" exact >
						<LoginScreen />
					</Route>
					<ProtectedRoute path="/POS">
						<POSScreen />
					</ProtectedRoute>
					<ProtectedRoute path="/client">
						<ClientScreen />
					</ProtectedRoute>
					<ProtectedRoute path="/settings">
						<SettingScreen />
					</ProtectedRoute>
					<ProtectedRoute path="/productos">
						<ProductScreen />
					</ProtectedRoute>
					<ProtectedRoute path="/history">
						<HistoryScreen />
					</ProtectedRoute>
				</Switch>
          	</ConnectedRouter>
        </Provider>
	);
};
