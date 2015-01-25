var React = require('react');

var QItem = React.createClass({
	render: function(){
		return (
		<div>
			<div>Question: {this.props.item.question}</div>
			<div>Name: {this.props.item.name}</div>
			<div>Status: {this.props.item.status}</div>
		</div>
		)
	}
});

module.exports = QItem;