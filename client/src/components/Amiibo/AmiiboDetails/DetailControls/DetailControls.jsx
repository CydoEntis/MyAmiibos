import React from 'react';
import Button from '../../../UI/Buttons/Button';
import { Link } from 'react-router-dom';

import classes from './DetailControls.module.css';
import { useAppContext } from '../../../../context/appContext';

const DetailControls = () => {
	const {
		hideAmiiboDetails,
		saveAmiibo,
		updateAmiibo,
		selectedAmiibo,
		modifiedList,
	} = useAppContext();

	const handleAmiibo = (action) => {
		const { amiiboId } = selectedAmiibo;

		const currentSelectedAmiibo = modifiedList.filter(
			(amiibo) => amiibo.amiiboId === amiiboId
		);

		if (
			currentSelectedAmiibo[0].collected === false &&
			currentSelectedAmiibo[0].wishlisted === false
		) {
			if (action === 'collect') {
				currentSelectedAmiibo[0].collected = true;
			} else if (action === 'wishlist') {
				currentSelectedAmiibo[0].wishlisted = true;
			}
			console.log(currentSelectedAmiibo[0]);
			saveAmiibo(currentSelectedAmiibo[0]);
		}

		hideAmiiboDetails();
	};

	return (
		<div className={classes.controls}>
			{selectedAmiibo.collected && (
				<>
					<Button
						className={classes['btn--remove']}
						onClick={() => {
							handleAmiibo('collect');
						}}
					>
						Remove From My Collection
					</Button>
				</>
			)}
			{!selectedAmiibo.collected && (
				<>
					<Button
						className={classes['btn--add']}
						onClick={() => {
							handleAmiibo('collect');
						}}
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

			{!selectedAmiibo.collected && (
				<>
					{selectedAmiibo.wishlisted && (
						<>
							<Button
								className={classes['btn--remove']}
								onClick={() => {
									handleAmiibo('wishlist');
								}}
							>
								Remove From My Wishlist
							</Button>
						</>
					)}
					{!selectedAmiibo.wishlisted && (
						<>
							<Button
								className={classes['btn--add']}
								onClick={() => {
									handleAmiibo('wishlist');
								}}
							>
								Add To My Wishlist
							</Button>
						</>
					)}
					<Link
						className={classes.link}
						to='/wishlist'
						onClick={hideAmiiboDetails}
					>
						View My Wishlist
					</Link>
				</>
			)}
		</div>
	);
};

export default DetailControls;
