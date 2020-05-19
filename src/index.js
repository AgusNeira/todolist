import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './styles/main.scss';

import { List } from './components/List.jsx';
import { Input } from './components/Input.jsx';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tasks: [],
			input: ''
		}

		this.swapItems = this.swapItems.bind(this);
		this.toggleDone = this.toggleDone.bind(this);
		this.updateInput = this.updateInput.bind(this);
		this.addItem = this.addItem.bind(this);
		this.deleteItem = this.deleteItem.bind(this);
	}

	swapItems(index) {
		return up => () => {
			this.setState(oldState => {
				let newTasks = oldState.tasks.slice();
				let temp;
				let index2 = up ? index - 1 : index + 1;
				temp = newTasks[index];
				newTasks[index] = newTasks[index2];
				newTasks[index2] = temp;

				return {
					tasks: newTasks
				}
			});
		};
	}

	toggleDone(index) {
		return () => {
			this.setState(oldState => ({
				tasks: oldState.tasks
					.map((task, i) => i === index ? 
						{text: task.text, done: !task.done}
						: task)
			}));
		}
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
				<Input updateInput={this.updateInput}
					addItem={this.addItem} />
				<List todo={this.state.tasks}
					swapHandler={this.swapItems}
					doneHandler={this.toggleDone}
					deleteHandler={this.deleteItem} />
			</main>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('root'));