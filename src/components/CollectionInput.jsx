import React, { useState, useContext } from 'react';

import GlobalContext from '../index';

const CollectionInput = ({}) => {
	const api = useContext(GlobalContext);

	let [showInput, doShowInput] = useState(false);
	let [input, setInput] = useState('');

	const handleChange = event => setInput(event.target.value);

	const handleClick = event => {
		event.preventDefault();
		if (!showInput) {
			doShowInput(true);
		} else {
			if (input) {
				api.addList(input);
				setInput('');
				doShowInput(false);
			}
		}
	}

	return (
		<form id='collection-input'>
			{showInput && <input type='text'
				placehloder='List name...'
				required value={input}
				onChange={handleChange} />}

			<button className={showInput ? 'submit' : 'add'}
					onClick={handleClick} type='submit'>
				{showInput ?
					<i className='fas fa-check'></i> :
					<i className='fas fa-plus'></i>
				}
			</button>
		</form>
	)
}

export default CollectionInput;