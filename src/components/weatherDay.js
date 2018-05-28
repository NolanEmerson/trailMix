import React from 'react';

const WeatherDay = (props) => {

    const {numDay,dayStyle,dayDate,dayText} = props;
    return (
            <div className={numDay} style={dayStyle}>
                <div className="dayShadow"></div>
                <div className="currentDay">{dayDate}</div>
                <div className={`${numDay}Summary daySum`}>{dayText.summary}</div>
                <div className={`${numDay}High dayHigh`}>{dayText.high}</div>
                <div className={`${numDay}Low dayLow`}>{dayText.low}</div>
                <div className={`${numDay}Rain dayPrecip`}>{dayText.rain}</div>
            </div>
    );
}

export default WeatherDay;