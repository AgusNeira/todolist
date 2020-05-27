import React, { useContext, useState } from 'react';
import GlobalContext from '../index';

const Input = props => {
	const api = useContext(GlobalContext);

	let [input, setInput] = useState('');

	const handleChange = event => setInput(event.target.value);
	
	const handleAdd = event => {
		event.preventDefault();

		if (input) {
			api.addTask(props.listId, input)();
		}
		setInput('');
	}

	return (
		<form id='input'>
			<input placeholder='Add what you have to do here...'
				onChange={handleChange} 
				value={input} type='text'></input>

			<button id='add' type='submit' onClick={handleAdd}>
				<i className='fas fa-plus'></i>
			</button>
		</form>);
}

export default Input;