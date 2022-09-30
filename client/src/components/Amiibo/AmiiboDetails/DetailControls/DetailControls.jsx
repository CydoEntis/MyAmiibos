import React from 'react';
import Button from '../../../UI/Buttons/Button';
import { Link } from 'react-router-dom';

import classes from './DetailControls.module.css';
import { useAppContext } from '../../../../context/appContext';

const DetailControls = () => {
	const { hideAmiiboDetails, addAmiiboToCollection, selectedAmiibo } =
		useAppContext();

	const handleAddAmiibo = () => {
		const {
			amiiboSeries,
			character,
			gameSeries,
			head,
			image,
			name,
			release,
			tail,
			type,
		} = selectedAmiibo;


		const amiiboData = {
			amiiboSeries,
			character,
			gameSeries,
			image,
			name,
			release,
			type,
			amiiboId: head + tail,
			collected: true,
			wishlisted: false,
		};

		console.log(amiiboData);

		addAmiiboToCollection(amiiboData);
		hideAmiiboDetails();
	};

	const handleRemoveAmiibo = () => {};

	return (
		<div className={classes.controls}>
			{selectedAmiibo.collected && (
				<>
					<Button
						className={classes['btn--remove']}
						onClick={handleRemoveAmiibo}
					>
						Remove From My Collection
					</Button>
				</>
			)}
			{!selectedAmiibo.collected && (
				<>
					<Button
						className={classes['btn--add']}
						onClick={handleAddAmiibo}
					>
						Add To My Collection
					</Button>
				</>
			)}

			<Link
				className={classes.link}
				to='/collection'
				onClick={hideAmiiboDetails}
			>
				View My Collection
			</Link>
			<Button className={classes['btn--add']}>Add To My Wishlist</Button>
			<Link
				className={classes.link}
				to='/wishlist'
				onClick={hideAmiiboDetails}
			>
				View My Wishlist
			</Link>
		</div>
	);
};

export default DetailControls;
