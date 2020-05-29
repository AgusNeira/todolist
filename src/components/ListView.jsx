import React, { useContext } from 'react';
import GlobalContext from '../index';

import TaskItem from './TaskItem.jsx';
import TaskInput from './TaskInput.jsx';

import { SortableContainer } from 'react-sortable-hoc';

const ListView = ({ list }) => {
	const api = useContext(GlobalContext);

	if (!list) {
		return (
			<section className='list'>
				<p id='no-selected-list'>No list was selected...</p>
			</section>
		);
	}

	const List = SortableContainer(() => (
		<div>
		{list.tasks.map((task, index) => 
			<TaskItem text={task.text}
				done={task.done}
				key={task.id}
				taskId={task.id}
				listId={list.id}
				index={index} />
		)}
		</div>
	));

	return (
		<section className='list'>
			<h2 id='list-title'>{list.title}</h2>
			<TaskInput listId={list.id} />

			{list.taskCount === 0 ?
				<p id='empty-list'>No tasks yet...</p> :
				<List lockAxis='y' onSortEnd={api.listOnSortEnd(list.id)}/>
			}
		</section>
	)
};

export default ListView;