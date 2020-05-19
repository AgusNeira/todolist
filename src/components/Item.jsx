import PropTypes from 'prop-types';
import React, { Component } from 'react';

export const Item = props => (
	<div className='item'>

		<button className='check' onClick={props.doneHandler} >
			<i className={props.done? 'fas fa-check' : 'fas fa-circle-notch'}></i>
		</button>

		<p>{props.text}</p>
		<button className='down'
			onClick={props.swapHandler(false)}
			disabled={props.last} >
			<i className='fas fa-arrow-down'></i>
		</button>

		<button className='up' 
			onClick={props.swapHandler(true)}
			disabled={props.first} >
			<i className='fas fa-arrow-up'></i>
		</button>

		<button className='delete'
			onClick={props.deleteHandler} >
			<i className='fas fa-trash'></i>
		</button>
	</div>
);

Item.defaultProps = {
	text: 'No text specified!',
	last: false, first: false, done: false,
	swapHandler: (myb) => console.log('No swap handler provided'),
	doneHandler: () => console.log('No done handler provided')
};

Item.propTypes = {
	text: PropTypes.string.isRequired,
	first: PropTypes.bool,
	last: PropTypes.bool,
	done: PropTypes.bool,
	swapHandler: PropTypes.func.isRequired,
	doneHandler: PropTypes.func.isRequired
};