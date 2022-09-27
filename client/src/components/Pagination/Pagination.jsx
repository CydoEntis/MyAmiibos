import React, { useState } from 'react';
import classes from './Paginiation.module.css';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import { useAppContext } from '../../context/appContext';
import Button from '../UI/Buttons/Button';

// TODO Reset pages every time the filter is changed.

const getPages = (currentPage, maxPages, pageNumbers) => {
	let startingPage;
	let endingPage;
	if (currentPage === 1) {
		startingPage = currentPage - 1;
		endingPage = currentPage + maxPages;
	} else if (currentPage === 2) {
		startingPage = currentPage - 2;
		endingPage = currentPage + 3;
	} else if (currentPage === 3) {
		startingPage = currentPage - 3;
		endingPage = currentPage + 2;
	} else if (currentPage === pageNumbers.length) {
		startingPage = pageNumbers.length - (maxPages + 1);
		endingPage = pageNumbers.length;
	} else if (currentPage === pageNumbers.length - 3) {
		startingPage = currentPage - 3;
		endingPage = currentPage + 2;
	} else if (currentPage === pageNumbers.length - 2) {
		startingPage = currentPage - 3;
		endingPage = currentPage + 2;
	} else if (currentPage === pageNumbers.length - 1) {
		startingPage = currentPage - 4;
		endingPage = currentPage + 1;
	} else {
		startingPage = currentPage - 3;
		endingPage = currentPage + 2;
	}

	return pageNumbers.slice(startingPage, endingPage);
};

const Pagination = () => {
	const {
		numOfPages,
		currentPage,
		maxPages,
		goToPage,
		nextPage,
		prevPage,
		pageNumbers,
	} = useAppContext();

	let currentPages = getPages(currentPage, maxPages, pageNumbers);

	const goToPrevPage = () => {
		if (currentPage !== 1) {
			prevPage();
		}
	};

	const goToNextPage = () => {
		if (currentPage !== numOfPages) {
			nextPage();
		}
	};

	return (
		<nav
			className={`${classes['pagination--wrapper']} ${classes.pagination}`}
		>
			<ul className={classes.pages}>
				<li
					className={`${classes['page--item']} ${classes['page--prev']}`}
				>
					<Button
						type='button'
						className={classes['page--link']}
						onClick={goToPrevPage}
					>
						<GoChevronLeft />
					</Button>
				</li>
				{currentPages.map((pageNumber) => (
					<li
						className={`${classes['page--item']} ${
							pageNumber === currentPage ? classes['active'] : ''
						}`}
						key={pageNumber}
					>
						<Button
							type='button'
							className={`${classes['page--link']} ${
								pageNumber === currentPage
									? classes['active']
									: ''
							}`}
							onClick={() => goToPage(pageNumber)}
						>
							{pageNumber}
						</Button>
					</li>
				))}
				<li
					className={`${classes['page--item']} ${classes['page--next']}`}
				>
					<Button
						type='button'
						className={classes['page--link']}
						onClick={goToNextPage}
					>
						<GoChevronRight />
					</Button>
				</li>
			</ul>
		</nav>
	);
};

export default Pagination;
