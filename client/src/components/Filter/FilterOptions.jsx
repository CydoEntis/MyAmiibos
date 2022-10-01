import React, {useRef, useEffect} from 'react';
import FilterItem from './FilterItem';
import { useAppContext } from '../../context/appContext';

import classes from './FilterOptions.module.css';

const FilterOptions = ({ setIsOpen, setFilter }) => {
	const { filterAmiiboType } = useAppContext();
	const filterListRef = useRef(null);

  // useEffect(() => {
  //   function handleClickOutside(event) {
  //     if (filterListRef.current && !filterListRef.current.contains(event.target)) {
	// 				setIsOpen(false);
	//       }
  //   }
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [filterListRef]);

	const getAllAmiibos = async () => {
		setIsOpen(false);
		setFilter('All');

		await filterAmiiboType({ type: 'all' });
	};

	const getAllFigures = async () => {
		setIsOpen(false);
		setFilter('Figure');

		await filterAmiiboType({ type: 'figure' });
	};

	const getAllCards = async () => {
		setIsOpen(false);
		setFilter('Card');

		await filterAmiiboType({ type: 'card' });
	};

	const getAllYarn = async () => {
		setIsOpen(false);
		setFilter('Yarn');

		await filterAmiiboType({ type: 'yarn' });
	};

	return (
		<div className={classes['filter--list']} ref={filterListRef}>
			<FilterItem text='All' onClick={getAllAmiibos} />
			<FilterItem text='Figure' onClick={getAllFigures} />
			<FilterItem text='Card' onClick={getAllCards} />
			<FilterItem text='Yarn' onClick={getAllYarn} />
		</div>
	);
};

export default FilterOptions;
