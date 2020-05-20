import PropTypes from 'prop-types';
import React, { Component } from 'react';

export const Task = props => (
	<div className={props.done? 'done item' : 'item'}>

		<button className={props.done? 'check done' : 'check'}
				onClick={props.doneHandler} >
			<i className={props.done? 'fas fa-check' : 'fas fa-circle-notch'}></i>
		</button>

		<p>{props.text}</p>

		<button className='delete'
			onClick={props.deleteHandler} >
			<i className='fas fa-trash'></i>
		</button>
	</div>
);

Task.defaultProps = {
	text: 'No text specified!',
	last: false, first: false, done: false,
	swapHandler: (myb) => console.log('No swap handler provided'),
	doneHandler: () => console.log('No done handler provided')
};

Task.propTypes = {
	text: PropTypes.string.isRequired,
	first: PropTypes.bool,
	last: PropTypes.bool,
	done: PropTypes.bool,
	doneHandler: PropTypes.func.isRequired
};