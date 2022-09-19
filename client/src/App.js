import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Auth } from './pages';
import Dashboard from './pages/Dashboard';
import Amiibos from './pages/Amiibos/Amiibos';

import './App.css';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Dashboard />} />
				<Route path='/amiibos' element={<Amiibos />} />
				<Route
					path='/auth'
					element={
						<div>
							<Auth />
						</div>
					}
				/>
				<Route path='/landing' element={<div>Landing</div>} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
