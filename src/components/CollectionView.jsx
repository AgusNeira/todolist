import React, { useContext } from 'react';
import GlobalContext from '../index';

import { SortableContainer } from 'react-sortable-hoc';

import ListItem from './ListItem.jsx';
import CollectionInput from './CollectionInput.jsx';

const CollectionView = ({ collection, selectedId, listCount }) => {
	const api = useContext(GlobalContext);

	const Collection = SortableContainer(() =>
		<div>
		{collection.map((list, index) => 
			<ListItem 
				listId={list.id}
				title={list.title}
				selected={list.id === selectedId}
				index={index}
				key={list.id} />
		)}
		</div>
	);

	return (
		<section className='collection'>
			<CollectionInput />
			{listCount === 0 ?
				<p id='empty-collection'>You have no lists yet...</p> :
				<Collection useDragHandle lockAxis='y' transitionDuration={300}
					onSortEnd={api.collectionOnSortEnd} />
			}
		</section>
	)
}

export default CollectionView;