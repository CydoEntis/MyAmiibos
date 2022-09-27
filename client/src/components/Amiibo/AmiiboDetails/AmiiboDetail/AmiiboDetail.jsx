import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactDom from 'react-dom';
import { useAppContext } from '../../../../context/appContext';
import Button from '../../../UI/Buttons/Button';

import classes from './AmiiboDetail.module.css';
import { FaTimes } from 'react-icons/fa';
import DetailText from '../DetailText/DetailText';
import DetailControls from '../DetailControls/DetailControls';

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
				<Button className={classes['btn--close']} onClick={onClose}>
					<FaTimes className={classes['icon--close']} />
				</Button>
				<div className={classes['detail__image-wrapper']}>
					<img
						src={selectedAmiibo.image}
						alt={selectedAmiibo.character}
					/>
				</div>

				<h3 className={classes.characterName}>{selectedAmiibo.name}</h3>
				<DetailText category='Type' text={selectedAmiibo.type} />
				<DetailText category='Game Series' text={selectedAmiibo.gameSeries} />
				<DetailText category='Release Date' text={selectedAmiibo.release.na} />
				<DetailControls />
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
