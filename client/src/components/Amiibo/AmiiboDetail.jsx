import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactDom from 'react-dom';
import { useAppContext } from '../../context/appContext';
import Button from '../UI/Buttons/Button';

import classes from './AmiiboDetail.module.css';
import { FaTimes } from 'react-icons/fa';

const Overlay = () => {
	return <div className={classes.overlay}></div>;
};

const AmiiboDetail = () => {
	const { selectedAmiibo, showDetails, hideAmiiboDetails } = useAppContext();

	const onClose = () => {
		hideAmiiboDetails();
	};

	if (!showDetails) return;

	console.log(selectedAmiibo);

	return ReactDom.createPortal(
		<>
			<Overlay />
			<div className={classes.details}>
				<Button className={classes['btn--close']} onClick={onClose}><FaTimes className={classes['icon--close']}/></Button>
				<div className={classes['detail__image-wrapper']}>
					<img
						src={selectedAmiibo.image}
						alt={selectedAmiibo.character}
					/>
				</div>

				<h3>{selectedAmiibo.name}</h3>
				<h5>Game Series:</h5>
				<h5>{selectedAmiibo.gameSeries}</h5>
				<h5>Type:</h5>
				<h5>{selectedAmiibo.type}</h5>
				<h5>Release:</h5>
				<h5>{selectedAmiibo.release.na}</h5>
				<Button>Add To My Collection</Button>
				<Link to='/collection'>View My Collection</Link>
				<Button>Add To My Wishlist</Button>
				<Link to='/wishlist'>View My Wishlist</Link>
			</div>
			{/* <Modal
				open={isOpen}
				onClick={() => {
					setIsOpen(true);
				}}
				onClose={() => {
					setIsOpen(false);
				}}
			>
				Text
			</Modal> */}
		</>,
		document.getElementById('modal')
	);
};

export default AmiiboDetail;
