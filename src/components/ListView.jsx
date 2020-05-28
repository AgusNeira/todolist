import React, { useContext } from 'react';
import GlobalContext from '../index';

import TaskView from './TaskView.jsx';
import Input from './Input.jsx';

import { SortableContainer } from 'react-sortable-hoc';

const ListView = ({ list }) => {
	const api = useContext(GlobalContext);

	const List = SortableContainer(() => (
		<div className='list'>
	
		{list.tasks.map((task, index) => 
			<TaskView text={task.text}
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
			<Input listId={list.id} />
			<h2 id='list-title'>{list.title}</h2>

			{list.taskCount === 0 ?
				<div><p id='empty-list'>No tasks yet...</p></div> :
				<List lockAxis='y'/>
			}
		</section>
	)
};

export default ListView;