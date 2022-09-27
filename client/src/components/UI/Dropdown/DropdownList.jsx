import React from 'react';
import DropdownItem from './DropdownItem';
import { useAppContext } from '../../../context/appContext';

import classes from './DropdownList.module.css';

const DropdownList = ({ setIsOpen, setFilter }) => {
	const { fetchAmiibos } = useAppContext();

	const getAllAmiibos = async () => {
		setIsOpen(false);
    setFilter("All");
		await fetchAmiibos({ type: 'all' });
	};

	const getAllFigures = async () => {
		setIsOpen(false);
    setFilter("Figure");
		await fetchAmiibos({ type: 'figure' });
	};

	const getAllCards = async () => {
		setIsOpen(false);
    setFilter("Card");
		await fetchAmiibos({ type: 'card' });
	};

	const getAllYarn = async () => {
		setIsOpen(false);
    setFilter("Yarn");
		await fetchAmiibos({ type: 'yarn' });
	};

	return (
		<div className={classes['dropdown--list']}>
			<DropdownItem text='All' onClick={getAllAmiibos} />
			<DropdownItem text='Figure' onClick={getAllFigures} />
			<DropdownItem text='Card' onClick={getAllCards} />
			<DropdownItem text='Yarn' onClick={getAllYarn} />
		</div>
	);
};

export default DropdownList;
