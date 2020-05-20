import React from 'react';
import PropTypes from 'prop-types';

import { Task } from './Task.jsx';
import { Input } from './Input.jsx';

import { ReactSortable } from 'react-sortablejs';

export class List extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			tasks: props.tasks
		}

		this.handleDone = this.handleDone.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
	}

	handleDone(index) {
		return () => {
			this.setState(oldState => ({
				tasks: oldState.tasks
					.map((task, i) => i === index ? 
						{text: task.text, done: !task.done}
						: task)
			}));
		}
	}
	handleDelete(index) {
		return () => {
			this.setState(oldState => ({
				tasks: oldState.tasks.filter((task, i) => i !== index)
			}));
		}
	}

	handleAdd(taskName) {
		this.setState(oldState => ({
			tasks: oldState.tasks.concat([{
				text: taskName, done: false
			}])
		}));
	}

	render() {
		const items = this.state.tasks.map((task, index, l) => (
			<Task text={task.text}
				done={task.done}
				key={index}
				doneHandler={this.handleDone(index)}
				deleteHandler={this.handleDelete(index)} />
		));
		/*{this.props.tasks.length === 0 && 
					<div className='item' >
						<p className='soft-text'>You haven't added things to do yet...</p>
					</div>
				}*/
		return (
			<section className='list'>
				<Input addItem={this.handleAdd} />
				<ReactSortable id='list'
						setList={(newTasks) => {this.setState({tasks: newTasks})}}
						list={this.state.tasks}
						animation={200} >
					{items}
				</ReactSortable>
			</section>
		);
	}
};

List.defaultProps = {
	tasks: []
}

List.propTypes = {
	todo: PropTypes.array
}