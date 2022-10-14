import React from 'react';
import NotFound from '../../NotFound/NotFound';
import AmiiboCard from '../AmiiboCard/AmiiboCard';

import classes from './AmiiboList.module.css';

const AmiiboList = ({ currentAmiibos }) => {
	return (
		<section className={classes['amiibo--list']}>
			{currentAmiibos.length === 0 && <NotFound />}
			{currentAmiibos.length > 0 &&
				currentAmiibos.map((amiibo, index) => (
					<AmiiboCard amiibo={amiibo} index={index} key={amiibo.amiiboId} />
				))}
		</section>
	);
};

export default AmiiboList;
