import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navigation/Navbar';
import AmiiboList from '../components/Amiibo/AmiiboList';
import Pagination from '../components/Pagination/Pagination';
import Footer from '../components/Footer/Footer';

const Dashboard = () => {
	const limit = 25;
	const [currentPage, setCurrentPage] = useState(1);
	const [allAmiibos, setAllAmiibos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const indexOfLastAmiibo = currentPage * limit;
	const indexOfFirstAmiibo = indexOfLastAmiibo - limit;
	const currentAmiibos = allAmiibos.slice(
		indexOfFirstAmiibo,
		indexOfLastAmiibo
	);

	const numOfPages = Math.ceil(allAmiibos.length / limit);

	useEffect(() => {
		setIsLoading(true);
		let cancelled = false;
		const getAmiibos = async () => {
			const { data } = await axios.get(
				'https://www.amiiboapi.com/api/amiibo'
			);
			if (!cancelled) {
				setAllAmiibos(data.amiibo);
				setIsLoading(false);
			}
		};

		getAmiibos();

		return () => {
			cancelled = true;
		};
	}, []);

	return (
		<>
			<Navbar />
			<AmiiboList currentAmiibos={currentAmiibos} />
			<Pagination
				numOfPages={numOfPages}
				maxPages={4}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
			/>
			<Footer />
		</>
	);
};
export default Dashboard;
