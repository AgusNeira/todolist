import React, { useContext } from 'react';

import GlobalContext from '../index';
import { SortableElement, SortableHandle } from 'react-sortable-hoc';

const ListItem = SortableElement(({ listId, title, selected }) => {
	const api = useContext(GlobalContext);

	const DragHandle = SortableHandle(() => 
		<i className='drag-handle fas fa-grip-vertical'></i>);

	return (
		<div className={selected ? 'selected list-item' : 'list-item'}>
			<DragHandle />
			<button className='text-button'
				onClick={api.selectList(listId)} >
				{title}
			</button>
			<button className='delete' onClick={api.removeList(listId)}>
				<i className='fas fa-trash'></i>
			</button>
		</div>
	);
});

export default ListItem;