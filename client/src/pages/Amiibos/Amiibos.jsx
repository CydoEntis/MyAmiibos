import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navigation/Navbar';
import AmiiboList from '../../components/Amiibo/AmiiboList';
import Pagination from '../../components/Pagination/Pagination';
import Footer from '../../components/Footer/Footer';
import Loading from '../../components/Spinners/Loading';

import MainWrapper from '../../components/Wrappers/MainWrapper';
import SearchContainer from '../../components/Search/SearchContainer';
import { useAppContext } from '../../context/appContext';

const Amiibos = () => {
	const {
		isLoading,
		allAmiibos,
		fetchAmiibos,
	} = useAppContext();

	const limit = 25;
	const [currentPage, setCurrentPage] = useState(1);
	const [search, setSearch] = useState('');

	const numOfPages = Math.ceil(allAmiibos.length / limit);

	useEffect(() => {
		fetchAmiibos({ type: 'all' });
	}, []);

	const indexOfLastAmiibo = currentPage * limit;
	const indexOfFirstAmiibo = indexOfLastAmiibo - limit;
	const currentAmiibos = allAmiibos.slice(indexOfFirstAmiibo, indexOfLastAmiibo);

	console.log(search);
	return (
		<>
			<Navbar />
			<MainWrapper>
				<SearchContainer />
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
			</MainWrapper>
			<Footer />
		</>
	);
};

export default Amiibos;
