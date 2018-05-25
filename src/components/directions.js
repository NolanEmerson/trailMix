import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getDirections} from '../actions';
import keys from '../assets/config/apiKeys';


class DrivingDirections extends Component {
	
    componentDidMount(){  
        if(Object.keys(this.props.map).length > 0){ 
        //Only calls getDirections when the map already exists, so that the directions won't load twice;
            this.props.getDirections(this.props.traillat, 
                    this.props.traillong, this.props.map, this.props.match.params.location);
        }
    }

    render(){
        return (
            <div id="drivingDirectionContainer">
            </div> 
        );
    }
}

function mapStateToProps(state) {
	return {
        map: state.map.mapDirections,
		initLat: state.map.lat,
		initLong: state.map.long
	}
}

export default connect(mapStateToProps, {getDirections})(DrivingDirections);