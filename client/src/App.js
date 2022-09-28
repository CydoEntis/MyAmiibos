import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Auth } from './pages';
import ProtectedRoute from './pages/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Amiibos from './pages/Amiibos/Amiibos';
import MyAmiibos from './pages/Amiibos/MyAmiibos';
import Wishlist from './pages/Amiibos/Wishlist';

import './App.css';

function App() {
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
				<Route
					path='/collection'
					element={
						<ProtectedRoute>
							<MyAmiibos />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/wishlist'
					element={
						<ProtectedRoute>
							<Wishlist />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
