import React, { useState } from 'react';
import ReactDom from 'react-dom';

import classes from './AmiiboDetail.module.css';

const Overlay = () => {
	return <div className={classes.overlay}></div>;
};

const Modal = ({ open, children, onClose }) => {
	if (!open) return null;

	return (
		<>
			<Overlay />
			<div className={classes.details}>
				<button onClick={onClose}>Close</button>
				{children}
			</div>
		</>
	);
};

const AmiiboDetail = () => {
	const [isOpen, setIsOpen] = useState(true);

	return ReactDom.createPortal(
		<>
			<Modal
				open={isOpen}
				onClick={() => {
					setIsOpen(true);
				}}
				onClose={() => {
					setIsOpen(false);
				}}
			>
				Text
			</Modal>
		</>,
		document.getElementById('modal')
	);
};

export default AmiiboDetail;
