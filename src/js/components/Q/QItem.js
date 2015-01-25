var React = require('react');

var QItem = React.createClass({
	render: function(){
		return (
		<div className='col-md-6 col-md-offset-2'>
			<div className='panel panel-default'>
				<div className='panel-heading'>Question: {this.props.item.question}</div>
				<div className='panel-body'>
					<div>Name: {this.props.item.name}</div>
					<div>Status: {this.props.item.status}</div>
					<button className='btn btn-xs btn-success'>Assist</button>
					<button className='btn btn-xs btn-warning'>Remove</button>
				</div>
			</div>
		</div>
		)
	}
});

module.exports = QItem;