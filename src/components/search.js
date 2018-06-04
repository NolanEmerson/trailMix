import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Search extends Component{

    constructor(props){
        super(props);

        this.state = {
            location: ''
        };
        this.oldLocation = null;
        this.sendLocation = this.sendLocation.bind(this);
    }

    handleLocationChange(event){
        const newLocation = event.target.value;

        this.setState({
            location: newLocation
        });
    }

    handleEnterKey(e){ 
        if ((e.keyCode == 13) && (this.state.location ==='' || this.oldLocation ===null )) {
            this.sendLocation();
        } 
    }

    sendLocation(autoComplete){
        
        if(autoComplete && autoComplete !== this.oldLocation){
            this.setState({
                location: autoComplete
            });
            this.oldLocation = autoComplete;
            this.props.history.push(`/trailList/${autoComplete}/location`);
        }else{
            let finishLocation = this.state.location;
            if(this.state.location === ''){
                finishLocation = 'current location';
            }
            this.props.history.push(`/trailList/${finishLocation}/location`);        
        }
    }

    componentDidMount() {

        let inputField = document.getElementById('searchInput');
        let inputComplete = new google.maps.places.Autocomplete(inputField);
        google.maps.event.addListener(inputComplete, 'place_changed', () => {
            var place = inputComplete.getPlace();
            if (place.formatted_address){
                this.sendLocation(place.formatted_address);
            }
        });
    }

    render(){
        return (  
            <div>
                <input className='form-control searchInput' onKeyUp={this.handleEnterKey.bind(this)} id='searchInput' onChange={this.handleLocationChange.bind(this)} value={this.state.location} type="text" placeholder="Current location"/>     
                <div className="input-group-btn">                    
                    <button onClick={()=>this.sendLocation()} className="startBtn">
                        <i className="fas fa-search"></i>
                    </button>                   
                </div>
            </div>          
        );
    }
}

export default Search;