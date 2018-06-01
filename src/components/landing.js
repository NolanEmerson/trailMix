import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Search from './search';
import Logo from './logo';
import ResetGeolocationInst from './reset-geolocation-inst';
import './mediaQuery.css';



class Landing extends Component{

    constructor(props){
        super(props);

        this.state = {
            location: ''
        }
    }

    render(){
        
        let notValidMessage = '';
        if(this.props.match.path === '/notValid'){
            notValidMessage = <h3 className='notValid'>No location found. Please refine your search.</h3>
        }
        else if(this.props.match.path === '/notResponse'){
            notValidMessage = <h3 className='notValid'>The search cannot be completed rigth now. Please try again later</h3>
        }

        return (
            <div className="mainPage">
                <Logo logoClass="wholeLogoContainer"/>                

                <div className="searchContainer">
                    {notValidMessage}
                    <Search {...this.props} />     
                    <p>Enter a location to search for nearby trails or click <i className="fas fa-search"></i> to use current location</p>                   
                </div>

                <ResetGeolocationInst/>        
            </div>
        )
    };
}

export default Landing;