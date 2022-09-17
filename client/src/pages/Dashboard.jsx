import axios from 'axios';
import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import AmiiboCard from '../components/Amiibo/AmiiboCard';
import classes from './Dashboard.module.css';
import Card from '../components/UI/Cards/Card';

const Dashboard = () => {
	const limit = 25;
	const [page, setPage] = useState(0);
	const [allAmiibos, setAllAmiibos] = useState(null);
	const [pages, setPages] = useState([]);

	useEffect(() => {
		let cancelled = false;
		const getAmiibos = async () => {
			const { data } = await axios.get(
				'https://www.amiiboapi.com/api/amiibo'
			);
			if (!cancelled) {
				setAllAmiibos(data.amiibo);
				const numOfPages = Math.ceil(allAmiibos?.length / limit);

				const pages = Array.from({ length: numOfPages }, (_, index) => {
					return index + 1;
				});

				setPages(pages);
			}
		};

		getAmiibos();
		return () => {
			cancelled = true;
		};
	}, []);

	console.log(pages);

	const nextPage = () => {
		setPage((prevState) => prevState + 1);
	};

	const skip = page * limit;
	const currentAmiibos = allAmiibos?.slice?.(skip, skip + limit) ?? [];

	console.log(pages);

	return (
		<div className={classes.list}>
			<div className={classes.pages}>
				{pages.map((page) => (
					<button>{page}</button>
				))}
			</div>
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
