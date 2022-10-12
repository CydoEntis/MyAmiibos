import React, { useEffect, useState } from 'react';
import ReactDom from 'react-dom';
import { useAppContext } from '../../../../context/appContext';
import Button from '../../../UI/Buttons/Button';

import classes from './AmiiboDetail.module.css';
import { FaTimes } from 'react-icons/fa';
import DetailText from '../DetailText/DetailText';
import DetailControls from '../DetailControls/DetailControls';

const Overlay = ({ onClick }) => {
	return <div onClick={onClick} className={classes.overlay}></div>;
};

const AmiiboDetail = () => {
	const { selectedAmiibo, showDetails, hideAmiiboDetails, isLoading } =
		useAppContext();
	const onClose = () => {
		hideAmiiboDetails();
	};
    

	if (!showDetails) return;

	return ReactDom.createPortal(
		<>
			<Overlay onClick={onClose} />
			<>
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

					<h3 className={classes.characterName}>
						{selectedAmiibo.name}
					</h3>
					<DetailText category='Type' text={selectedAmiibo.type} />
					<DetailText
						category='Game Series'
						text={selectedAmiibo.gameSeries}
					/>
					<DetailText
						category='Release Date'
						text={selectedAmiibo.release}
					/>
					<DetailControls />
				</div>
			</>
		</>,
		document.getElementById('modal')
	);
};

export default AmiiboDetail;
