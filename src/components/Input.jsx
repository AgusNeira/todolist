import React, { Component } from 'react';

export class Input extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			input: ''
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
	}

	handleChange(event) {
		this.setState({
			input: event.target.value
		});
	}
	handleAdd(event) {
		event.preventDefault();

		if (this.state.input) {
			this.props.addItem(this.state.input);
		}
		this.setState({ input: '' });
	}

	render() {
		return (
		<form id='input'>
			<input placeholder='Add what you have to do here...'
				onChange={this.handleChange} 
				value={this.state.input} type='text'></input>
			<button id='add' type='submit' onClick={this.handleAdd}>
				<i className='fas fa-plus'></i>
			</button>
		</form>);
	}
};