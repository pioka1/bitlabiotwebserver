/**
 * Created by Marcel on 4/24/2017.
 */
import React, { Component } from 'react';


export default class Clock extends React.Component{
    /*Getting props from React Parent Class and define the initial state of Date*/
    constructor(props){
        super(props);
        this.state = {
            date: new Date(),
        };
    }

    /*Mount which sets the interval to 1 second and stores it in timerID*/
    componentDidMount(){
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    /*Clear the interval if component finishes executing/rendering */
    componentWillUnmount(){
        clearInterval(this.timerID);
    }

    /*Method which sets a new state with the prop. date*/
    tick(){
        this.setState({
            date: new Date()
        });
    }

    /*Visualization*/
    render(){
        return(
            <div id="clock">
                <p id="date">{this.state.date.toLocaleDateString()}</p>
                <p id="time">{this.state.date.toLocaleTimeString()}</p>
            </div>
        )
    }
}