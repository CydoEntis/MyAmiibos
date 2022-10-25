import React, { useEffect } from 'react';
import Navbar from '../../components/Navigation/Navbar';
import AmiiboList from '../../components/Amiibo/AmiiboList/AmiiboList';
import Pagination from '../../components/Pagination/Pagination';
import Footer from '../../components/Footer/Footer';
import Loading from '../../components/Spinners/Loading';

import MainWrapper from '../../components/Wrappers/MainWrapper';
import { useAppContext } from '../../context/appContext';
import AmiiboDetail from '../../components/Amiibo/AmiiboDetails/AmiiboDetail/AmiiboDetail';
import AmiiboForm from '../../components/Forms/AmiiboForm';

import classes from "./Amiibos.module.css";

const Amiibos = () => {
	const {
		isLoading,
		currentPage,
		limit,
		numOfPages,
		getAmiibos,
		modifiedAmiibos,
		toggleFilter,
		filterIsOpen,
	} = useAppContext();

	const closeDropdown = () => {
		if (filterIsOpen) {
			toggleFilter(false);
		}
	};

	useEffect(() => {
		getAmiibos('all');
	}, []);

	const indexOfLastAmiibo = currentPage * limit;
	const indexOfFirstAmiibo = indexOfLastAmiibo - limit;
	const currentAmiibos = modifiedAmiibos.slice(
		indexOfFirstAmiibo,
		indexOfLastAmiibo
	);

	return (
		<div className="wrapper" onClick={closeDropdown}>
			<AmiiboDetail />
			<Navbar />
			<MainWrapper>
				<AmiiboForm />
				{isLoading && modifiedAmiibos.length === 0 && <Loading />}
				{!isLoading  && (
					<>
						<AmiiboList currentAmiibos={currentAmiibos} />
						{numOfPages > 1 && <Pagination />}
					</>
				)}
			</MainWrapper>
			<Footer />
		</div>
	);
};

export default Amiibos;
