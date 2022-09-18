import React from 'react';
import classes from './Paginiation.module.css';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';

const Pagination = ({ numOfPages, currentPage, setCurrentPage, maxPages }) => {
	const pageNumbers = [...Array(numOfPages + 1).keys()].slice(1);

	let currentPages = pageNumbers.slice(
		currentPage - 1,
		currentPage + maxPages
	);

	if (currentPage + maxPages >= pageNumbers.length) {
		currentPages = pageNumbers.slice(pageNumbers.length - (maxPages + 1));
	}

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
		<nav className={classes.pagination}>
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
					<li className={classes['page--item']} key={pageNumber}>
						<button
							type='button'
							className={classes['page--link']}
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
