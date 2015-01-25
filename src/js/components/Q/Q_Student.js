var React = require('react');
var QList = require('QList');
var QAsk = require('QAsk');

var Q = React.render({
	getInitialState: function(){
		return {
			id: '',
			name: '',
			q: [{
				question: '',
				name: '',
				status: null
			}]
		}
	},
	render: function(){
		return(
			<div className='container'>
				<QAsk />
				<QList q={this.state.q} />
			</div>
		)
	}
});

module.exports = Q;