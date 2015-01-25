var React = require('react');
var QList = require('./QList');
// var QStatus = require('./QAsk');

var Q = React.createClass({
	getInitialState: function(){
		return {
			id: 'tylertyler^gmail*compoop',
			name: 'poop',
			members: {
				'-JgVZYIPK-y9KgrE2Q2C': {
					role: 'teacher',
					status: ''
				}
			},
			q: [{
				question: 'What is it?',
				name: 'Jacob',
				status: '-JgVZYIPK-y9KgrE2Q2C'
			},
			{
				question: 'What even is a jQuery?',
				name: 'Tyler',
				status: null
			}]
		}
	},
	render: function(){
		return(
			<div className='container'>
				<QList q={this.state.q} />
			</div>
		)
	}
});

module.exports = Q;