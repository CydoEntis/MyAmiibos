import React, { useEffect } from 'react';
import Navbar from '../../components/Navigation/Navbar';
import AmiiboList from '../../components/Amiibo/AmiiboList/AmiiboList';
import Pagination from '../../components/Pagination/Pagination';
import Footer from '../../components/Footer/Footer';
import Loading from '../../components/Spinners/Loading';

import MainWrapper from '../../components/Wrappers/MainWrapper';
import { useAppContext } from '../../context/appContext';
import AmiiboDetail from '../../components/Amiibo/AmiiboDetails/AmiiboDetail/AmiiboDetail';
import Filter from '../../components/Search/Filter';

const Amiibos = () => {
	const {
		isLoading,
		allAmiibos,
		fetchAmiibos,
		currentPage,
		limit,
		numOfPages,
	} = useAppContext();

	useEffect(() => {
		fetchAmiibos({ type: 'all' });
	}, []);

	const indexOfLastAmiibo = currentPage * limit;
	const indexOfFirstAmiibo = indexOfLastAmiibo - limit;
	const currentAmiibos = allAmiibos.slice(
		indexOfFirstAmiibo,
		indexOfLastAmiibo
	);

	return (
		<>
			<AmiiboDetail />
			<Navbar />
			<MainWrapper>
				<Filter />
				{isLoading && <Loading />}
				{!isLoading && (
					<>
						<AmiiboList currentAmiibos={currentAmiibos} />
						{numOfPages > 1 && <Pagination />}
					</>
				)}
			</MainWrapper>
			<Footer />
		</>
	);
};

export default Amiibos;