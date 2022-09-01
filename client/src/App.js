import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Auth } from './pages';

import './App.css';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<div>Dashboard</div>} />
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
