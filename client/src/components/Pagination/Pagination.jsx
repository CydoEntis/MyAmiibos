import React from 'react';
import classes from './Paginiation.module.css';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';

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

const Pagination = ({ numOfPages, currentPage, setCurrentPage, maxPages }) => {
	const pageNumbers = [...Array(numOfPages + 1).keys()].slice(1);
	let currentPages = getPages(currentPage, maxPages, pageNumbers);

	const prevPage = () => {
		if (currentPage !== 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	const nextPage = () => {
		if (currentPage !== numOfPages) {
			setCurrentPage(currentPage + 1);
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
					<button
						type='button'
						className={classes['page--link']}
						onClick={prevPage}
					>
						<GoChevronLeft />
					</button>
				</li>
				{currentPages.map((pageNumber) => (
					<li
						className={`${classes['page--item']} ${
							pageNumber === currentPage ? classes['active'] : ''
						}`}
						key={pageNumber}
					>
						<button
							type='button'
							className={`${classes['page--link']} ${
								pageNumber === currentPage
									? classes['active']
									: ''
							}`}
							onClick={() => setCurrentPage(pageNumber)}
						>
							{pageNumber}
						</button>
					</li>
				))}
				<li
					className={`${classes['page--item']} ${classes['page--next']}`}
				>
					<button
						type='button'
						className={classes['page--link']}
						onClick={nextPage}
					>
						<GoChevronRight />
					</button>
				</li>
			</ul>
		</nav>
	);
};

export default Pagination;
