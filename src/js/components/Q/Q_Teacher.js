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
	      <div className="col-md-8 col-md-offset-2">
	        <div className="panel panel-default">
	        	<div className='panel-heading'>
	        		<h1>{this.state.name}</h1>
	        	</div>
	        	<div className='panel-body'>
							<QList q={this.state.q} />
						</div>
					</div>
				</div>
		)
	}
});

module.exports = Q;