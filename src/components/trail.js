import React, {Component} from 'react';

class Trail extends Component {

    
    handleMouserOver(){
        this.props.marker.setIcon({
            url: "assets/markers/map_marker1.png",
            scaledSize: new google.maps.Size(60,70)
        });
    }

    handleMouseOut(){
        this.props.marker.setIcon({
            url: "assets/markers/map_marker2.png",
            scaledSize: new google.maps.Size(40,50)
        });
    }

    details(){
        planTripScreen = true;
        weatherLat = trail.latitude;
        weatherLon = trail.longitude; 
        initDirectionMap(trail,initLat,initLng);
        renderDetailTrail(trail);
    }

    render(){

        return 
            (<div clasName='trailDiv container' onMouseOver={this.handleMouserOver.bind(this)} onMouseOut={this.handleMouseOut.bind(this)}>
                <img src={this.props.trail.imgSqSmall} />
                <div>
                    <p>{this.props.trail.name}</p>
                    <p>{this.props.trail.location}</p>
                    <p>Distance: {this.props.trail.length} miles</p>
                    <p>Difficulty: {this.props.trail.difficulty}</p>
                    <p>Rating: {this.props.trail.stars} ★</p>
                </div>
                <button onClick={this.details.bind(this)}>Details</button>
            </div>);
    }
    
}

export default Trail;