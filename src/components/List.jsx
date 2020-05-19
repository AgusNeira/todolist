import React from 'react';
import PropTypes from 'prop-types';

import { Item } from './Item.jsx';

import Sortable from 'sortablejs';

export class List extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		let elem = document.getElementById('list');
		this.sortable = Sortable.create(elem);
	}

	render(){
		const items = this.props.todo.map((item, index, l) => (
			<Item text={item.text}
				done={item.done}
				key={index}
				first={index === 0}
				last={index === l.length - 1}
				swapHandler={this.props.swapHandler(index)}
				doneHandler={this.props.doneHandler(index)}
				deleteHandler={this.props.deleteHandler(index)} />
		));

		return (<section id='list'>
			{this.props.todo.length === 0 && 
				<div className='item' >
					<p className='soft-text'>You haven't added things to do yet...</p>
				</div>
			}
			{items}
		</section>);
	}
};

List.defaultProps = {
	todo: []
}

List.propTypes = {
	todo: PropTypes.array,
	swapHandler: PropTypes.func.isRequired,
	doneHandler: PropTypes.func.isRequired
}