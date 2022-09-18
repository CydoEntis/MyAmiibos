import axios from 'axios';
import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import AmiiboCard from '../components/Amiibo/AmiiboCard';
import classes from './Dashboard.module.css';
import Card from '../components/UI/Cards/Card';
import Pagination from '../components/Pagination/Pagination';

const Dashboard = () => {
	const limit = 25;
	const [currentPage, setCurrentPage] = useState(1);
	const [allAmiibos, setAllAmiibos] = useState([]);
	// const [pages, setPages] = useState([]);
	const indexOfLastAmiibo = currentPage * limit;
	const indexOfFirstAmiibo = indexOfLastAmiibo - limit;
	const currentAmiibos = allAmiibos.slice(
		indexOfFirstAmiibo,
		indexOfLastAmiibo
	);
	const numOfPages = Math.ceil(allAmiibos.length / limit);

	useEffect(() => {
		let cancelled = false;
		const getAmiibos = async () => {
			const { data } = await axios.get(
				'https://www.amiiboapi.com/api/amiibo'
			);
			if (!cancelled) {
				setAllAmiibos(data.amiibo);
			}
		};

		getAmiibos();

		return () => {
			cancelled = true;
		};
	}, []);

	// const nextPage = () => {
	// 	setPage((prevState) => prevState + 1);
	// };

	// const skip = (page - 1) * limit;
	// const currentAmiibos = allAmiibos?.slice?.(skip, skip + limit) ?? [];

	return (
		<div className={classes.list}>
			<Pagination
				numOfPages={numOfPages}
				maxPages={4}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
			/>
			{allAmiibos !== null && (
				<div className={classes.list}>
					{currentAmiibos.map((amiibo, index) => (
						<AmiiboCard
							amiibo={amiibo}
							index={index}
							key={amiibo.head + amiibo.tail}
						/>
					))}
				</div>
			)}
		</div>
	);
};
export default Dashboard;
