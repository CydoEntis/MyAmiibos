import React, { useState } from 'react';
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
		modifiedAmiibos,
		updateAmiiboList,
		user
	} = useAppContext();

	const handleAmiibo = (action) => {
		const { amiiboId } = selectedAmiibo;

		const currentSelectedAmiibo = modifiedAmiibos.filter(
			(amiibo) => amiibo.amiiboId === amiiboId
		);

		const index = modifiedAmiibos.findIndex(
			(amiibo) => amiibo.amiiboId === amiiboId
		);

		const amiibo = currentSelectedAmiibo[0];
		if (amiibo.createdAt === null) {
			if (action === 'collect') {
				amiibo.collected = true;
				amiibo.wishlisted = false;
				amiibo.createdAt = Date.now();
			} else if (action === 'wishlist') {
				amiibo.wishlisted = true;
				amiibo.collected = false;
				amiibo.createdAt = Date.now();
			}

			amiibo.userId = user._id;
			saveAmiibo(amiibo);
		} else {
			if (action === 'collect') {
				amiibo.wishlisted = false;
				amiibo.collected = true;
			} else if (action === 'uncollect') {
				amiibo.wishlisted = false;
				amiibo.collected = false;
			} else if (action === 'wishlist') {
				amiibo.wishlisted = true;
				amiibo.collected = false;
			} else if (action === 'unwishlist') {
				amiibo.wishlisted = false;
				amiibo.collected = false;
			}
			updateAmiibo(amiibo);
		}
		updateAmiiboList(index, amiibo);
		// hideAmiiboDetails();
	};

	return (
		<div className={classes.controls}>
			{selectedAmiibo.collected && (
				<Button
					className={classes['btn--remove']}
					onClick={() => {
						handleAmiibo('uncollect');
					}}
				>
					Remove From My Collection
				</Button>
			)}
			{!selectedAmiibo.collected && (
				<Button
					className={classes['btn--add']}
					onClick={() => {
						handleAmiibo('collect');
					}}
				>
					Add To My Collection
				</Button>
			)}

			{/* <Link
				className={classes.link}
				to='/collection'
				onClick={hideAmiiboDetails}
			>
				View My Collection
			</Link> */}

			{!selectedAmiibo.collected && (
				<>
					{selectedAmiibo.wishlisted && (
						<Button
							className={classes['btn--remove']}
							onClick={() => {
								handleAmiibo('unwishlist');
							}}
						>
							Remove From My Wishlist
						</Button>
					)}
					{!selectedAmiibo.wishlisted && (
						<Button
							className={classes['btn--add']}
							onClick={() => {
								handleAmiibo('wishlist');
							}}
						>
							Add To My Wishlist
						</Button>
					)}
					{/* <Link
						className={classes.link}
						to='/wishlist'
						onClick={hideAmiiboDetails}
					>
						View My Wishlist
					</Link> */}
				</>
			)}
		</div>
	);
};

export default DetailControls;
