// react
var React = require("react");

// component creation 

var Form = React.createClass({
	// setting generic state associated with the text being searched
	getInitialState: function(){
		return {
			topic: "",
			startYear: "",
			endYear: ""
		}
	},
	// function to responding to user input
	handleChange: function(event) {

		var newState = {};
		newState[event.target.id] = event.target.value;
		this.setState(newState);
	},
	// submit button
	handleClick: function(){
		// set the parent to have the search term
		this.props.setTerm(this.state.topic, this.state.startYear, this.state.endYear);

	},

	// render the information above to the page
	render: function(){

		return(

			<div className="panel panel-primary">
			<div className=" panel-heading">
				<h2 className = "panel-title text-center"><strong>Search</strong></h2>
			</div>

			<div className="panel-body text-center">

				<form>

					<div className="form-group">
				<h4 className=""><strong>Topic</strong></h4>
				<input type="text" className="form-control text-center" id="topic" onChange= {this.handleChange} required/>
				<br/>

				<h4 className=""><strong>Start Year</strong></h4>
				<input type="text" className="form-control text-center" id="startYear" onChange= {this.handleChange} required/>
				<br/>

				<h4 className=""><strong>End Year</strong></h4>
				<input type="text" className="form-control text-center" id="endYear" onChange= {this.handleChange} required/>

				<button type="button" className= "btn btn-primary" onClick={this.handleClick}> Search </button>
				<br/>
			</div>
			</form>
		</div>
	</div>	
			)
	}
});

// export the component for other files
module.exports = Form;

