import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navigation/Navbar';
import AmiiboList from '../components/Amiibo/AmiiboList';
import Pagination from '../components/Pagination/Pagination';
import Footer from '../components/Footer/Footer';
import Loading from '../components/Spinners/Loading';

import classes from './Dashboard.module.css';

const Dashboard = () => {
	const url = 'https://www.amiiboapi.com/api/amiibo/';

	const limit = 25;
	const [currentPage, setCurrentPage] = useState(1);
	const [allAmiibos, setAllAmiibos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [search, setSearch] = useState('');

	const numOfPages = Math.ceil(allAmiibos.length / limit);

	const getAllAmiibos = async () => {
		let cancelled = false;
		const { data } = await axios.get(url);
		if (!cancelled) {
			setAllAmiibos(data.amiibo);
			setIsLoading(false);
		}
	};

	const getAllFigures = async () => {
		let cancelled = false;
		const { data } = await axios.get(url + '?type=figure');
		if (!cancelled) {
			setAllAmiibos(data.amiibo);
			setIsLoading(false);
		}
	};

	const getAllCards = async () => {
		let cancelled = false;
		const { data } = await axios.get(url + '?type=card');
		if (!cancelled) {
			setAllAmiibos(data.amiibo);
			setIsLoading(false);
		}
	};

	const getAllYarn = async () => {
		let cancelled = false;
		const { data } = await axios.get(url + '?type=yarn');
		if (!cancelled) {
			setAllAmiibos(data.amiibo);
			setIsLoading(false);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { data } = await axios.get(url + '?name=' + search);
		setAllAmiibos(data.amiibo);
	};

	useEffect(() => {
		setIsLoading(true);
		let cancelled = false;
		const getAmiibos = async () => {
			const { data } = await axios.get(url);
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

	const indexOfLastAmiibo = currentPage * limit;
	const indexOfFirstAmiibo = indexOfLastAmiibo - limit;
	const currentAmiibos = allAmiibos.slice(
		indexOfFirstAmiibo,
		indexOfLastAmiibo
	);

	console.log(search);
	return (
		<>
			<Navbar />
			<main>
				<div className={classes.test}>
					<form onSubmit={handleSubmit}>
						<input
							type='text'
							value={search}
							name='search'
							onChange={(e) => setSearch(e.target.value)}
						/>
						<button>search</button>
					</form>
					<div className={classes.buttons}>
						<h4>Show: </h4>
						<button
							className={`${classes.btn} ${classes['btn--all']}`}
							onClick={getAllAmiibos}
						>
							All
						</button>
						<button
							className={`${classes.btn} ${classes['btn--figures']}`}
							onClick={getAllFigures}
						>
							Figures
						</button>
						<button
							className={`${classes.btn} ${classes['btn--cards']}`}
							onClick={getAllCards}
						>
							Cards
						</button>
						<button
							className={`${classes.btn} ${classes['btn--yarn']}`}
							onClick={getAllYarn}
						>
							Yarn
						</button>
					</div>
				</div>
				{isLoading && <Loading />}
				{!isLoading && (
					<>
						<AmiiboList currentAmiibos={currentAmiibos} />
						<Pagination
							numOfPages={numOfPages}
							maxPages={4}
							currentPage={currentPage}
							setCurrentPage={setCurrentPage}
						/>
					</>
				)}
			</main>
			<Footer />
		</>
	);
};
export default Dashboard;
