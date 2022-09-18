import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AmiiboCard from './AmiiboCard';
import Pagination from '../Pagination/Pagination';

import classes from './AmiiboList.module.css';

const AmiiboList = () => {
	const limit = 25;
	const [currentPage, setCurrentPage] = useState(1);
	const [allAmiibos, setAllAmiibos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	// const [pages, setPages] = useState([]);
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
		<section className={classes['amiibo--list']}>
			{!isLoading && (
				<>
					{currentAmiibos.map((amiibo) => (
						<AmiiboCard
							amiibo={amiibo}
							key={amiibo.head + amiibo.tail}
						/>
					))}
					<div className={classes['pagination--wrapper']}>
						<Pagination
							numOfPages={numOfPages}
							maxPages={4}
							currentPage={currentPage}
							setCurrentPage={setCurrentPage}
						/>
					</div>
				</>
			)}
			{isLoading && <h3>Loading...</h3>}
		</section>
	);
};

export default AmiiboList;
