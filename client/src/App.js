import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Auth } from './pages';
import ProtectedRoute from './pages/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Amiibos from './pages/Amiibos/Amiibos';
import Error from './pages/Error';

import './App.css';

function App() {

	console.log(process.env.REACT_APP_TEST);
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Dashboard />} />
				<Route
					path='/auth'
					element={
						<div>
							<Auth />
						</div>
					}
				/>
				<Route
					path='/amiibos'
					element={
						<ProtectedRoute>
							<Amiibos />
						</ProtectedRoute>
					}
				/>
				<Route path='*' element={<Error />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
