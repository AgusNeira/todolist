import React, { useContext } from 'react';
import GlobalContext from '../index';

import TaskView from './TaskView.jsx';
import Input from './Input.jsx';

const ListView = ({ list }) => {
	const api = useContext(GlobalContext);

	const items =(
		<div className='list'>
	
		{list.tasks.map(task => 
			<TaskView text={task.text}
				done={task.done}
				key={task.id}
				taskId={task.id}
				listId={list.id} />)}
		</div>);

	return (
		<section className='list'>
			<Input listId={list.id} />
			<h2 id='list-title'>{list.title}</h2>

			{list.taskCount === 0 ?
				<div><p id='empty-list'>No tasks yet...</p></div> :
				items
			}
		</section>
	)
}

export default ListView;