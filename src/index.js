import React, { useState, createContext } from 'react';
import ReactDOM from 'react-dom';

import CollectionView from './components/CollectionView.jsx';
import ListView from './components/ListView.jsx';

import arrayMove from 'array-move';

import './styles/main.scss';

const GlobalContext = React.createContext(null);

const MainComponent = () => {
	let [collection, updateCollection] = useState([]);
	let [listCount, setListCount] = useState(0);
	let [currListId, setCurrListId] = useState(undefined);

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

	const removeList = listId => () => {
		updateCollection(prevCollection => {
			decrementListCount();

			return prevCollection.filter(list => list.id !== listId);
		})
	}

	const selectList = listId => () => setCurrListId(listId);

	const collectionOnSortEnd = ({oldIndex, newIndex}) =>
		updateCollection(prevCollection =>
			arrayMove(prevCollection, oldIndex, newIndex));

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

	const listOnSortEnd = listId => ({oldIndex, newIndex}) =>
		updateList(listId, prevList => ({
			id: prevList.id,
			title: prevList.title,
			taskCount: prevList.taskCount,

			tasks: arrayMove(prevList.tasks, oldIndex, newIndex)
		}));

	const api = {
		updateCollection,
		updateList,
		addList,
		removeList,
		selectList,
		collectionOnSortEnd,
		updateTask,
		addTask,
		removeTask,
		toggleTaskDone,
		listOnSortEnd
	}

	let currListIndex = collection.findIndex(list => list.id === currListId);

	return (
		<GlobalContext.Provider value={api} >
			<CollectionView collection={collection}
				listCount={listCount} selectedId={currListId} />
			<ListView 
				list={currListIndex !== -1 && collection[currListIndex]} />
		</GlobalContext.Provider>
	)

}

export default GlobalContext;

ReactDOM.render(<MainComponent/>, document.getElementById('root'));