import React from 'react';
import AmiiboCard from '../AmiiboCard/AmiiboCard';

import classes from './AmiiboList.module.css';

const AmiiboList = ({ currentAmiibos }) => {
	return (
		<section className={classes['amiibo--list']}>
			{currentAmiibos.length === 0 && <p>No Amiibos Found...</p>}
			{currentAmiibos.length > 0 &&
				currentAmiibos.map((amiibo) => (
					<AmiiboCard amiibo={amiibo} key={amiibo.amiiboId} />
				))}
		</section>
	);
};

export default AmiiboList;
