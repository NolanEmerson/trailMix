import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import markerIcon2 from '../assets/images/markers/map_marker2.png';
import markerIcon1 from '../assets/images/markers/map_marker1.png';
import earth from '../assets/images/logo/earth.png';


class Trail extends Component {

    constructor(props){
        super(props);

        this.handleMouserOver = this.handleMouserOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
    }
    
    handleMouserOver(name,marker){
        this.props.trail.marker.setIcon({
            url: markerIcon1,
            scaledSize: new google.maps.Size(60,70)
        });
    }

    handleMouseOut(name,marker){
        this.props.trail.marker.setIcon({
            url: markerIcon2,
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

    translateDifficulty(string) {
        switch (string) {
            case 'green':
                return 'Easy';
            case 'greenBlue':
                return 'Easy/Intermediate';
            case 'blue':
                return 'Intermediate';
            case 'blueBlack':
                return 'Intermediate/Difficult';
            case 'black':
                return 'Difficult';
            case 'dblack':
                return 'Extra Difficult';
            default:
                return string;
        }
    }

    translateStars(num) {
        if (num === 5) {
            return '★★★★★'
        } else if (num >= 4) {
            return '★★★★☆'
        } else if (num >= 3) {
            return '★★★☆☆'
        }
    }

    render(){

        return (
            <div id={this.props.trail.name} className='trailDiv' onMouseOver={()=>this.handleMouserOver(this.props.trail.name,this.props.trail.marker)} onMouseOut={()=>this.handleMouseOut(this.props.trail.name,this.props.trail.marker)}>
                <img src={this.props.trail.imgSqSmall || earth} />
                <div>
                    <p>{this.props.trail.name}</p>
                    <p>{this.props.trail.location}</p>
                    <p>Length: {this.props.trail.length} miles</p>
                    <p>Difficulty: {this.translateDifficulty(this.props.trail.difficulty)}</p>
                    <p className='tooltip'>Rating: {this.translateStars(this.props.trail.stars)} <span className='tooltiptext'> {this.props.trail.stars} </span> </p>
                    <Link className='button-link' to={`/planTrip/${this.props.trail.latitude}/lat/${this.props.trail.longitude}/long/${this.props.trail.id}/id/${this.props.location}/location/details`}>Plan a Trip</Link>
                </div>                
            </div>);
    }
    
}

export default Trail;