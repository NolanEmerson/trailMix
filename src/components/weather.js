import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import DateInput from './datePicker';
import { ajax } from 'jquery';
import keys from '../assets/config/apiKeys';
import darkCloud from '../assets/images/weather/darkCloud.png';
import fog from '../assets/images/weather/fog.png';
import partCloud from '../assets/images/weather/partCloud.png';
import rainbow from '../assets/images/weather/rainbow.png';
import rainy from '../assets/images/weather/rainy.png';
import snow from '../assets/images/weather/snow.png';
import sunny from '../assets/images/weather/sunny.png';
import wind from '../assets/images/weather/wind.png';
import WeatherDay from './weatherDay';


class Weather extends Component{
    constructor(props){
        super(props);
        this.weatherArray = [];
        let currentDate = new Date;
        currentDate = currentDate.setHours(0,0,0,0)/1000;
        this.state={
            day1: currentDate,
            day2: currentDate + 86400,
            day3: currentDate + 172800,
            dateChanged:true,
            latlong: this.props.match.params.lat + ',' + this.props.match.params.long,
            day1Back: {
                backgroundImage: `url(${rainbow})`,
                backgroundColor: 'rgb(10, 181, 233)'
            },
            day2Back:{
                backgroundImage: `url(${rainbow})`,
                backgroundColor: 'rgb(10, 181, 233)'
            },
            day3Back: {
                backgroundImage: `url(${rainbow})`,
                backgroundColor: 'rgb(10, 181, 233)'
            },
            day1Date: this.selectedDay(0),
            day1Text:{
                summary: '',
                high: 'High: ',
                low: 'Low: ',
                rain: 'Chance of Rain: '
            },
            day2Date: this.selectedDay(1),
            day2Text:{
                summary: '',
                high: 'High: ',
                low: 'Low: ',
                rain: 'Chance of Rain: '
            },
            day3Date: this.selectedDay(2),
            day3Text:{
                summary: '',
                high: 'High: ',
                low: 'Low: ',
                rain: 'Chance of Rain: '
            }
        }
        this.httpRequest = new XMLHttpRequest();
    }
    selectedDay(num,newDate){
        if(!newDate){
            newDate=new Date();
        }        
        let dateSeted = new Date(newDate);
        dateSeted.setDate(newDate.getDate()+num);
        let dd = dateSeted.getDate();
        let mm = dateSeted.getMonth()+1;
        let yyyy = dateSeted.getFullYear();
        return `${mm}/${dd}/${yyyy}`
    }
    
    updateWeather(inputDate){
        let date = new Date(inputDate);
        date.setHours(0,0,0,0);
        let newDate = date;
        date = date.getTime()/1000;
        this.setState({
            day1: date,
            day2: date + 86400,
            day3: date + 172800,
            day1Date: this.selectedDay(0,newDate),
            day2Date: this.selectedDay(1,newDate),
            day3Date: this.selectedDay(2,newDate),            
            dateChanged:true
        });
    }

    componentDidUpdate(){
        if(this.state.dateChanged){
            this.callApiByDay(this.state.day1,1);
            this.callApiByDay(this.state.day2,2);
            this.callApiByDay(this.state.day3,3);      
        }  
    }

    componentDidMount(){
        this.callApiByDay(this.state.day1,1);
        this.callApiByDay(this.state.day2,2);
        this.callApiByDay(this.state.day3,3);      
    }    

    callApiByDay(day,num){
        ajax({
            url: 'https://api.darksky.net/forecast/'+keys.darksky+'/' + this.state.latlong + ',' + day,
            dataType: 'jsonp',
            method: 'get',
            success: response => {
                let iconName1 = response.hourly.icon;
                let backgroundImg;
                let background_color;
                this.weatherArray.push(iconName1);
                switch (iconName1){                    
                    case 'clear-night':
                    case 'clear-day':
                        backgroundImg = `${sunny}`;
                        background_color = 'rgba(10, 181, 233)'
                        break;
                    case 'cloudy':
                        backgroundImg = `${darkCloud}`;
                        background_color = 'rgb(153, 153, 153)';
                        break;
                    case 'partly-cloudy-night':
                    case 'partly-cloudy-day':
                        backgroundImg = `${partCloud}`;
                        background_color = 'rgb(95, 158, 160)';
                        break;
                    case 'rain':
                        backgroundImg = `${rainy}`;
                        background_color = 'rgb(139, 135, 129)';
                        break;
                    case 'sleet':
                    case 'snow':
                        backgroundImg = `${snow}`;
                        background_color = 'rgb(43, 146, 183)';
                        break;
                    case 'wind':
                        backgroundImg = `${wind}`;
                        background_color = 'rgb(192, 196, 197)';
                        break;
                    case 'fog':
                        backgroundImg = `${fog}`;
                        background_color = 'rgba(10, 181, 233)';
                        break;
                }
                let rainText;
                if(isNaN(response.daily.data[0].precipProbability)){
                    rainText = 'Chance of Rain: Unknown'
                } else {
                    let rainProb = ((response.daily.data[0].precipProbability)*100);
                    rainProb = rainProb.toFixed(0);
                    rainText = `Chance of Rain: ${rainProb}%`
                }

                switch(num){
                    case 1:
                        this.setState({
                            day1Back:{
                                backgroundImage: `url(${backgroundImg})`,
                                backgroundColor: background_color
                            },
                            day1Text:{
                                summary: response.daily.data[0].summary,
                                high: `High: ${response.daily.data[0].temperatureHigh.toFixed(0)} F`,
                                low: `Low: ${response.daily.data[0].temperatureLow.toFixed(0)} F`,
                                rain: rainText
                            },
                            dateChanged:false
                        }); 
                        break;
                    case 2:
                        this.setState({
                            day2Back:{
                                backgroundImage: `url(${backgroundImg})`,
                                backgroundColor: background_color
                            },
                            day2Text:{
                                summary: response.daily.data[0].summary,
                                high: `High: ${response.daily.data[0].temperatureHigh.toFixed(0)} F`,
                                low: `Low: ${response.daily.data[0].temperatureLow.toFixed(0)} F`,
                                rain: rainText
                            }
                        }); 
                        break;
                    case 3:
                        this.setState({
                            day3Back:{
                                backgroundImage: `url(${backgroundImg})`,
                                backgroundColor: background_color
                            },
                            day3Text:{
                                summary: response.daily.data[0].summary,
                                high: `High: ${response.daily.data[0].temperatureHigh.toFixed(0)} F`,
                                low: `Low: ${response.daily.data[0].temperatureLow.toFixed(0)} F`,
                                rain: rainText
                            }
                        }); 
                        break;
                }                             
            }, 
            error: response => {
                this.setState({
                    text:{summary:'Sorry, we had trouble getting data for that day.'}
                })
            }
        });
    }

    render(){
        return(
            <div className="weatherContainer">
                <div className="dateContainer">
                    <div className="datesSelect">
                        <div className="dateLabel">Select a date: </div>
                        <DateInput updateWeather={this.updateWeather.bind(this)}/>
                    </div>
                </div>
                <div className="conditionsContainer">
                    <WeatherDay numDay="day1" dayStyle={this.state.day1Back} dayDate={this.state.day1Date} dayText={this.state.day1Text} />
                    <WeatherDay numDay="day2" dayStyle={this.state.day2Back} dayDate={this.state.day2Date} dayText={this.state.day2Text} />
                    <WeatherDay numDay="day3" dayStyle={this.state.day3Back} dayDate={this.state.day3Date} dayText={this.state.day3Text} />                    
                </div>
            </div>            
        )
    }
}

export default Weather;
