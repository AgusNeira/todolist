import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './styles/main.scss';

import { List } from './components/List.jsx';
import { Input } from './components/Input.jsx';

let data = [
	{ text: 'Make cat', done: false },
	{ text: 'Fuck you', done: true }
]

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tasks: data,
			input: ''
		}

		this.updateList = this.updateList.bind(this);
		this.updateInput = this.updateInput.bind(this);
		this.addItem = this.addItem.bind(this);
		this.deleteItem = this.deleteItem.bind(this);
	}

	updateInput(newInput) {
		return oldInputState => {
			this.setState(oldState => ({
				tasks: oldState.tasks,
				input: newInput
			}));
			return { input: newInput };
		}
	}

	addItem(itemName) {
		this.setState(oldState => ({
			input: '',
			tasks: oldState.tasks.concat([{
				text: oldState.input,
				done: false
			}])
		}));

		return { input: '' }
	}

	updateList(){
		return newList => this.setState(oldState => ({
			input: oldState.input,
			tasks: newList
		}));
	}

	deleteItem(index) {
		return () => {
			this.setState(oldState => {
				let newTasks = oldState.tasks.slice();
				newTasks.splice(index, 1);

				return {
					tasks: newTasks,
					input: oldState.input
				};
			});
		};
	}

	render() {
		return (
			<main>
				<h1>ToDo list</h1>

				<List tasks={this.state.tasks}
					listUpdater={this.updateList}
					deleteHandler={this.deleteItem} />
			</main>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('root'));