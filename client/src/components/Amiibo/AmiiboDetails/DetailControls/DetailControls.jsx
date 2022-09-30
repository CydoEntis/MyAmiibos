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
		myAmiibos,
	} = useAppContext();

	const handleAmiibo = (action) => {
		const {
			amiiboSeries,
			character,
			gameSeries,
			image,
			name,
			release,
			type,
			amiiboId,
		} = selectedAmiibo;

		const amiiboData = {
			amiiboSeries,
			character,
			gameSeries,
			image,
			name,
			release,
			type,
			amiiboId,
		};

		const amiiboExists = myAmiibos.some((amiibo) => {
			return amiibo.amiiboId === amiiboId;
		});

		if (amiiboExists) {
			if (action === 'collected') {
				amiiboData.collected = !selectedAmiibo.collected;
				amiiboData.wishlisted = false;
			} else if (action === 'wishlisted') {
				amiiboData.collected = false;
				amiiboData.wishlisted = !selectedAmiibo.wishlisted;
			}
			console.log('Updated data: ', amiiboData);
			updateAmiibo(amiiboData);
		} else {
			if (action === 'collected') {
				amiiboData.collected = true;
				amiiboData.wishlisted = false;
			} else if (action === 'wishlisted') {
				amiiboData.collected = false;
				amiiboData.wishlisted = true;
			}
			saveAmiibo(amiiboData);
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
							handleAmiibo('collected');
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
							handleAmiibo('collected');
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
									handleAmiibo('wishlisted');
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
									handleAmiibo('wishlisted');
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
