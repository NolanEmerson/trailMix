import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
// import {getDirections} from '../actions';
import keys from '../assets/config/apiKeys';
import Search from './search';
import Logo from './logo';
import { NavLink } from 'react-router-dom';
// import TrailLinks from './trail-links';
import Directions from './directions';
import Weather from './weather';
import Details from './details';



class PlanTrip extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			location: [],
            initLat: 0,
            initLong: 0
		};
	}

    render(){
        console.log('props for planTrip:',this.props);
        return (
            <div className="plantrip">
                <Logo logoClass="wholeLogoContainerLite"/>                                       
                <Search {...this.props} />  
                <div className="mainContent">
                    <div className="mapContainer"> 
                        <div id='mapDirection' className='googleMap'></div>               
                    </div>
                    <div className="planTripOptions">
                        <div className="planTripTabs">
                            <NavLink activeClassName='active selected' className="tabLinks" to={`/planTrip/${this.props.match.params.lat}/lat/${this.props.match.params.long}/long/directions`}>Directions</NavLink>
                            <NavLink activeClassName='active selected' className="tabLinks" to={`/planTrip/${this.props.match.params.lat}/lat/${this.props.match.params.long}/long/details`}>Trail Detail</NavLink>
                            <NavLink activeClassName='active selected' className="tabLinks" to={`/planTrip/${this.props.match.params.lat}/lat/${this.props.match.params.long}/long/weather`}>Weather</NavLink>
                        </div>                   
                        <div className="tabContent">
                            <Route path={`/planTrip/${this.props.match.params.lat}/lat/${this.props.match.params.long}/long/directions`} 
                                render={props => <Directions {...props} traillat={this.props.match.params.lat} traillong={this.props.match.params.long}/> }/>
                            <Route path={`/planTrip/${this.props.match.params.lat}/lat/${this.props.match.params.long}/long/details`} component={Details} />
                            <Route path={`/planTrip/${this.props.match.params.lat}/lat/${this.props.match.params.long}/long/weather`} component={Weather} />
                        </div>
                    </div>    
                </div>
            </div>
        );
    }
}

export default PlanTrip;