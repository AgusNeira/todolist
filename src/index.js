import React, { useState, createContext } from 'react';
import ReactDOM from 'react-dom';

import ListView from './components/ListView.jsx';

import './styles/main.scss';

const GlobalContext = React.createContext(null);

const MainComponent = () => {
	let [collection, updateCollection] = useState([
		{
			id: 0,
			title: 'Empty list',
			tasks: [{
				id: 0,
				text: 'Fuck you',
				done: false
			}],
			taskCount: 1
		}
	]);
	let [listCount, setListCount] = useState(1);
	let [currentList, setCurrentList] = useState(0);

	const incrementListCount = () => setListCount(prevCount => prevCount + 1);
	const decrementListCount = () => setListCount(prevCount => prevCount - 1);

	const updateList = (listId, newList) => {

		updateCollection(prevCollection => 
			prevCollection.map(prevList => {
				if (prevList.id === listId)
					if (typeof newList === 'function')
						return newList(prevList);
					else return newList;
				else return prevList;
			})
		);
	}

	const addList = listName => {
		updateCollection(prevCollection => {

			return prevCollection.concat([{
				id: listCount,
				title: listName,
				tasks: [],
				taskCount: 0
			}]);
		});
		incrementListCount();
	}

	const removeList = listId => {
		updateCollection(prevCollection => {
			decrementListCount();

			return prevCollection.filter(list => list.id !== listId);
		})
	}

	const updateTask = (listId, taskId, newTask) => {

		updateList(listId, prevList => {
			return {
				id: prevList.id,
				title: prevList.title,
				taskCount: prevList.taskCount,

				tasks: prevList.tasks.map(task => {
					if (task.id === taskId)
						if (typeof newTask === 'function')
							return newTask(task);
						else return newTask;
					else return task;
				})
			}
		})
	}

	const addTask = (listId, newTask) => () => {
		updateList(listId, prevList => {

			return {
				id: prevList.id,
				title: prevList.title,
				taskCount: prevList.taskCount + 1,

				tasks: prevList.tasks.concat([{
					id: prevList.taskCount,
					text: newTask,
					done: false
				}])
			};
		});
	}

	const removeTask = (listId, taskId) => () => {

		updateList(listId, prevList => {

			return {
				id: prevList.id,
				title: prevList.title,
				taskCount: prevList.taskCount - 1,

				tasks: prevList.tasks.filter(task => task.id !== taskId)
			};
		});
	}

	const toggleTaskDone = (listId, taskId) => () => {
		updateTask(listId, taskId, task => ({
			id: task.id,
			text: task.text,
			done: !task.done
		}));
	}

	const api = {
		updateCollection,
		updateList,
		addList,
		removeList,
		updateTask,
		addTask,
		removeTask,
		toggleTaskDone
	}

	return (
		<GlobalContext.Provider value={api} >
			<ListView 
				list={collection[currentList]} />
		</GlobalContext.Provider>
	)

}

export default GlobalContext;

ReactDOM.render(<MainComponent/>, document.getElementById('root'));