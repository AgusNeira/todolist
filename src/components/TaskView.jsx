import React, { useContext } from 'react';
import GlobalContext from '../index';

const TaskView = ({ id, text, done, listId, taskId }) => {
	const api = useContext(GlobalContext);

	return (
		<div className={ done? 'done item' : 'item' }>
			<button onClick={api.toggleTaskDone(listId, taskId)}
					className={ done? 'check done' : 'check' } >
				<i className={ done? 'fas fa-check' : 'fas fa-circle-notch'}></i>
			</button>

			<p>{text}</p>

			<button className='delete'
				onClick={api.removeTask(listId, taskId)} >
				<i className='fas fa-trash'></i>
			</button>
		</div>
	);
}

export default TaskView;