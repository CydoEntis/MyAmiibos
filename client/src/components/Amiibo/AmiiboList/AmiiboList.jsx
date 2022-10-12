import React from 'react';
import AmiiboCard from '../AmiiboCard/AmiiboCard';

import classes from './AmiiboList.module.css';

const AmiiboList = ({ currentAmiibos }) => {
	return (
		<section className={classes['amiibo--list']}>
			{currentAmiibos.map((amiibo) => (
				<AmiiboCard amiibo={amiibo} key={amiibo.amiiboId} />
			))}
		</section>
	);
};

export default AmiiboList;
