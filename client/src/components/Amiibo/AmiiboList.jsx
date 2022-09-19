import React from 'react';
import AmiiboCard from './AmiiboCard';

import classes from './AmiiboList.module.css';

const AmiiboList = ({ currentAmiibos }) => {
	return (
		<section className={classes['amiibo--list']}>
			{currentAmiibos.map((amiibo) => (
				<AmiiboCard amiibo={amiibo} key={amiibo.head + amiibo.tail} />
			))}
		</section>
	);
};

export default AmiiboList;
