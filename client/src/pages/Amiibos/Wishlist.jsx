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
		myAmiibos,
		getWishlistAmiibos,
		currentPage,
		limit,
		numOfPages,
	} = useAppContext();

	useEffect(() => {
		getWishlistAmiibos();
	}, []);

	const indexOfLastAmiibo = currentPage * limit;
	const indexOfFirstAmiibo = indexOfLastAmiibo - limit;
	const currentAmiibos = myAmiibos.slice(
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
						{myAmiibos.length === 0 && (
							<p>No Amiibos Wishlisted Yet...</p>
						)}
						{myAmiibos.length > 0 && (
							<>
								<AmiiboList currentAmiibos={currentAmiibos} />
								{numOfPages > 1 && <Pagination />}
							</>
						)}
					</>
				)}
			</MainWrapper>
			<Footer />
		</>
	);
};

export default Amiibos;
