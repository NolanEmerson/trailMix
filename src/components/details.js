import React, {Component} from 'react';
import axios from 'axios';

// import '../assets/css/details.css';

import keys from '../assets/config/apiKeys';
import earth from '../assets/images/logo/earth.png';

class Details extends Component {
    constructor(props) {
        super(props);

        this.state = {
            trailInfo: {}
        }
    }

    componentDidMount() {
        const params = {
            key: keys.rei,
            ids: this.props.match.params.id
        };
        const url = 'https://www.hikingproject.com/data/get-trails-by-id';    
        //call the server to search with the conditions we have in the search    
        axios.get(url,{params}).then(resp=>{
            this.setState({
                trailInfo: resp.data.trails[0]
            })            
        }).catch(err => {
            console.log('error is: ', err);    
        });
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

    render() {

        const {trailInfo} = this.state;

        return (
            <div className='detailsContainer'>
                {
                    this.state.trailInfo && 
                    <div className='detailsInfoContainer'>
                        <img src={trailInfo.imgSmallMed || earth} className='detailsImg' />
                        <div className='detailsTextArea'>
                            <div className='detailsName'>{trailInfo.name}</div>
                            <div className='detailsLocation'>{trailInfo.location}</div>
                            <div className='detailsSummary'>{trailInfo.summary}</div>
                            <div className='detailsLength'><span className='detailsTitle'>Length:</span> {trailInfo.length} miles</div>
                            <div className='detailsDifficulty'><span className='detailsTitle'>Difficulty:</span> {this.translateDifficulty(trailInfo.difficulty) || ''}</div>
                            <div className='detailsRating'><span className='detailsTitle'>Rating:</span> {this.translateStars(trailInfo.stars)} (based on {trailInfo.starVotes} votes)</div>
                            <div className='detailsHeightArea'>
                            <div className='detailsElevation'>
                                <div className="elevationTitle">Elevation</div> 
                                <div className='detailsAscent'>Ascent: {trailInfo.ascent} feet</div>
                                <div className='detailsDescent'>Descent: {trailInfo.descent} feet</div>
                            </div>
                            <div className="detailsPeaks">
                               <div className="peaksTitle">Peaks</div> 
                                <div className='detailsHigh'>Highest point: {trailInfo.high} feet</div>
                                <div className='detailsLow'>Lowest point: {trailInfo.low} feet</div>
                            </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default Details;