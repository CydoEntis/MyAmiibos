import axios from 'axios';
import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import Card from '../components/UI/Cards/Card';

const Dashboard = () => {
	const [amiibosLoaded, setAmiibosLoaded] = useState(false);
	const [allAmiibos, setAllAmiibos] = useState([]);
	const [currentAmiibos, setCurrentAmiibos] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(10);

	useEffect(() => {
		const getAmiibos = async () => {
			setAmiibosLoaded(false);
			const { data } = await axios.get(
				'https://www.amiiboapi.com/api/amiibo'
			);
			setAllAmiibos(data.amiibo);
			setCurrentAmiibos(data.amiibo.slice(startIndex, endIndex));

			setAmiibosLoaded(true);
		};

		getAmiibos();
	}, [startIndex, endIndex]);

  if(amiibosLoaded) {
    console.log(currentAmiibos)
    console.log(allAmiibos);
  }

	const nextPage = () => {
    setStartIndex(endIndex);
    setEndIndex(prevState => prevState + 10)
		// setPage((prevState) => (prevState + 1));
		// setSkip(page * limit);



		setCurrentAmiibos(allAmiibos.slice(startIndex, endIndex));
	};

	return (
		<div>
			<button type='button' onClick={nextPage}>
				Next
			</button>
			{amiibosLoaded && (
				<div>
					{currentAmiibos.map((amiibo) => (
						<Card key={amiibo.head + amiibo.tail}>
							<img src={amiibo.image} alt={amiibo.name} />
							<p>{amiibo.amiiboSeries}</p>
							<h3>{amiibo.name}</h3>
						</Card>
					))}
				</div>
			)}
		</div>
	);
};

export default Dashboard;
