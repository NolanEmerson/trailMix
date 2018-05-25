import React, {Component} from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Trail from './trail';
import axios from 'axios';
import {connect} from 'react-redux';
import {getCoordinates} from '../actions';
import markerIcon2 from '../assets/images/markers/map_marker2.png';
import markerIcon1 from '../assets/images/markers/map_marker1.png';
import keys from '../assets/config/apiKeys';
import Search from './search';
import Logo from './logo';
import Sorter from './sorter';
import Loading from './loading';


class TrailList extends Component {

    constructor(props){
        super(props);

        this.state = {
            trails : [],   
            loading: true
        };
    }
    
    componentDidMount(){  
        if (typeof google !== 'object'){
            // Connect the initMap() function within this class to the global window context,
            // so Google Maps can invoke it
            window.initMap = this.initMap.bind(this);
            // Asynchronously load the Google Maps script, passing in the callback reference
            this.loadJS(keys.google); 
        }else{
           this.props.getCoordinates(this.props.match.params.location,this.props);            
        }
    }
    
    initMap() { 
        this.props.getCoordinates(this.props.match.params.location,this.props); 
    }
    
    loadJS(src) {
        var ref = window.document.getElementsByTagName("script")[0];
        var script = window.document.createElement("script");
        script.src = src;
        script.async = true;
        ref.parentNode.insertBefore(script, ref);
    }
    
    handleLocationChange(event){
        const newLocation = event.target.value;

        this.setState({
            location: newLocation
        });
    }

    componentWillReceiveProps(newProps){
        if(this.props.match.params.location !== newProps.match.params.location){
            this.setState({
                loading: true
            });
            this.props.getCoordinates(newProps.match.params.location,this.props); 
        }else{
            const params = {
                key: keys.rei,
                lat:newProps.lat,
                lon:newProps.long,
                maxDistance:25,
                maxResults:30,
                minStars:3
            };
            const url = 'https://www.hikingproject.com/data/get-trails';    
            //call the server to search with the conditions we have in the search    
            axios.get(url,{params}).then(resp=>{
                var domElementArray = []; //Is this arr used?
                const trailList = resp.data.trails.map((item,index)=>{
                    
                    //add the markers
                    var marker = this.addMarkerToEachTrail(item);
                    item.difficultyNum = this.translateDifficultyToNumber(item.difficulty);
                    item['marker']=marker;
                    return item;
                });
    
                const trailArraySorterByRating = trailList.sort((a,b)=> b.stars - a.stars);
                this.setState({
                    trails: trailArraySorterByRating,
                    loading: false
                });
                
            }).catch(err => {
                console.log('error is: ', err);    
            });    
        }               
    }

    translateDifficultyToNumber(string) {
        switch (string) {
            case 'green':
                return 1;
            case 'greenBlue':
                return 2;
            case 'blue':
                return 3;
            case 'blueBlack':
                return 4;
            case 'black':
                return 5;
            case 'dblack':
                return 6;
            default:
                return 0;
        }
    }

    /***************************************************************************************************
     * addMarkerToEachTrail - add marker to each trail
     * @params {object} The trail object from the data
     * @returns  {undefined}
     *
     */
    addMarkerToEachTrail(trailObj) {    
        var trailLat = trailObj.latitude;
        var trailLng = trailObj.longitude;

        var marker = new google.maps.Marker({
            position: {lat: trailLat, lng: trailLng},
            map: this.props.map,
            icon: {
                url: markerIcon2,
                scaledSize: new google.maps.Size(40,50)
            }
        });

        marker.addListener('click', function() {
            this.setIcon({
                url: markerIcon1,
                scaledSize: new google.maps.Size(60,70)
            });
            this.setAnimation(google.maps.Animation.BOUNCE);

            var removeSpecialClass = document.getElementsByClassName('trailDiv');
            for(let i=0;i<removeSpecialClass.length;i++){
                removeSpecialClass[i].classList.remove("trailDivFocus");
            }
            var divToFocus = document.getElementById(trailObj.name);
            divToFocus.classList.add("trailDivFocus");
            divToFocus.scrollIntoView();

            setTimeout((()=>{
                this.setIcon({
                    url: markerIcon2,
                    scaledSize: new google.maps.Size(40,50)
                });
                this.setAnimation(null);
            }).bind(this),3000);

        });
             
        return marker;
    }
    
     /**
     * Sort the array of parts depending of the method chosen in the sorter component
     * @param {*} method 
     */
    sortTrailArray(method){
        let sortArrayTrails = [...this.state.trails];
        sortArrayTrails.sort(method);
        this.setState({
            trails: sortArrayTrails
        });
    }

    render(){

        let loadComponent = '';
        if(this.state.loading){
            loadComponent = <Loading />
        }

        const list = this.state.trails.map((item,index)=>{
            return <Trail key={index} trail={item} location={this.props.match.params.location} />
        });        

        return (
                <div className='pageContainer'>
                    {loadComponent}
                    <div className="header">
                        <Logo {...this.props} logoClass="wholeLogoContainerLite" title={'Back to the homepage'}/>  
                        <div className='searchDiv'>
                            <Search {...this.props} />  
                        </div>  
                    </div>                    
                                   
                    <div className="mainContent">                    
                        <div className="mapContainer"> 
                            <div id='map' className='googleMap'></div>               
                        </div>
                        
                        <div className="trailContainer">
                            <Sorter sortTrailArray={this.sortTrailArray.bind(this)} />
                            <div className="trailList">                                
                                {list}
                            </div>                           
                        </div>
                    </div>
                </div>                
                );
    }
}

function mapStateToProps(state){
    return{
        map: state.map.map,
        lat: state.map.lat,
        long: state.map.long
    }
}

export default connect(mapStateToProps, {getCoordinates})(TrailList);
