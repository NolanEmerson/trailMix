import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {getDirections,deleteMapDirection} from '../actions';
import keys from '../assets/config/apiKeys';
import Search from './search';
import Logo from './logo';
import { NavLink } from 'react-router-dom';
import Directions from './directions';
import Weather from './weather';
import Details from './details';
import Loading from './loading';

class PlanTrip extends Component {

    constructor(props){
        super(props);

        this.state = {            
            loading: true
        }
    }

    componentDidMount(){  
        if (typeof google !== 'object'){
            // Connect the initMap() function within this class to the global window context,
            // so Google Maps can invoke it
            window.initMap = this.initDirection.bind(this);
            // Asynchronously load the Google Maps script, passing in the callback reference
            this.loadJS(keys.google); 
        }else{
            this.initDirection();
        }
    }

    componentWillUnmount(){
        this.props.deleteMapDirection();
    }
    
    componentWillReceiveProps(newProps){
        if(this.props.map !== newProps.map && Object.keys(newProps.map).length !== 0){
            this.setState({
                loading: false
            });
        }
    }

    initDirection() {
        this.props.getDirections(this.props.match.params.lat, 
            this.props.match.params.long, this.props.map, this.props.match.params.location);
    }
    
    loadJS(src) {
        let ref = window.document.getElementsByTagName("script")[0];
        let script = window.document.createElement("script");
        script.src = src;
        script.async = true;
        ref.parentNode.insertBefore(script, ref);
    }

    render(){

        let loadComponent = '';
        if(this.state.loading){
            loadComponent = <Loading />
        }

        return (
            <div className="plantrip">
                {loadComponent}
                <div className="header">
                    <Logo {...this.props} logoClass="wholeLogoContainerLite" title={'Back to the homepage'}/> 
                    <div className="planTripSearch">
                        <Search {...this.props} />  
                    </div>  
                </div>
                                    
                <div className="mainContent">
                    <div className="mapContainer"> 
                        <div id='mapDirection' className='googleMap'></div>               
                    </div>
                    <div className="planTripOptions">
                        <div className="planTripTabs">
                            <NavLink activeClassName='active selected' className="tabLinks" to={`/planTrip/${this.props.match.params.lat}/lat/${this.props.match.params.long}/long/${this.props.match.params.id}/id/${this.props.match.params.location}/location/details`}>Trail Detail</NavLink>
                            <NavLink activeClassName='active selected' className="tabLinks" to={`/planTrip/${this.props.match.params.lat}/lat/${this.props.match.params.long}/long/${this.props.match.params.id}/id/${this.props.match.params.location}/location/directions`}>Directions</NavLink>
                            <NavLink activeClassName='active selected' className="tabLinks" to={`/planTrip/${this.props.match.params.lat}/lat/${this.props.match.params.long}/long/${this.props.match.params.id}/id/${this.props.match.params.location}/location/weather`}>Weather</NavLink>
                            <NavLink activeClassName='active selected' className="tabLinks" to={`/trailList/${this.props.match.params.location}/location`}>Back To Trails</NavLink>
                        </div>                   
                        <div className="tabContent">
                            <Route path={`/planTrip/:lat/lat/:long/long/:id/id/:location/location/details`} component={Details} />
                            <Route path={`/planTrip/:lat/lat/:long/long/:id/id/:location/location/directions`} 
                                render={props => <Directions {...props} location={this.props.match.params.location} traillat={this.props.match.params.lat} traillong={this.props.match.params.long}/> }/>
                            <Route path={`/planTrip/:lat/lat/:long/long/:id/id/:location/location/weather`} component={Weather} />
                        </div>
                    </div>    
                </div>
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

export default connect(mapStateToProps, {getDirections,deleteMapDirection})(PlanTrip);