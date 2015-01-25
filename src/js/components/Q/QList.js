var React = require('react');
var QItem = require('./QItem');

var QList = React.createClass({
	render: function(){
		var items = this.props.q.map(function(item){
			return (
				<QItem item={item} isTeacher='true'/>
			)
		});
		return (
			<div className='container'>
				{items}
			</div>
		)
	}
});

module.exports = QList;