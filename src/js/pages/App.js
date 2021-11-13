import React from 'react';


const d = new Date();
var options = { weekday: 'long' };
var optionsTwo = { month: 'long', day: 'numeric' };
var optionsThree = { day: 'numeric' };

function getshortHand(day) {
    var lastDayDigit = 0;
    if (day.length > 1) {
        lastDayDigit = day[1]
    } else {
        lastDayDigit = day[0]
    }
    if (lastDayDigit == 1) {
        return 'st'
    } else if (lastDayDigit == 2) {
        return 'nd'
    } else if (lastDayDigit == 3) {
        return 'rd'
    } else {
        return 'th'
    }
}

export default class App extends React.Component { 

    navigate = () => {
        console.log(this.props)
        this.props.history.push({
            pathname: `/home`
        });
    }

    leave = () => {
        this.props.socket.emit("disconnectUser", { id: this.props.socket.id });
    }
    componentDidMount() {
        if(this.props.mainState.avatarData.length === 0){
            this.props.history.push({
                pathname: `/`
            }); 
        }
    }

    componentDidUpdate(){
       if(this.props.mainState.navigate === 'home'){
        this.props.history.push({
            pathname: `/home`
        });
       }
    }

    render() {
        return (
            <div id='main' style={{filter : `brightness(${this.props.mainState.brightnessPercent})`}}>
                <img id='background' src={`./src/js/${this.props.mainState.wallpaper}.jpeg`}/>
                <div id='content'>
                    <div id='profile'>
                        { this.props.mainState.avatarData.length !== 0 ? 
                        <>
                            <img onClick={this.navigate} id='avatar' src={this.props.mainState.avatarData} alt="Avatar" />
                        </> 
                        : 
                        <></>
                        
                        }
                    

                        <div className='text' >
                            <p className='light'>{d.toLocaleDateString("en-US", options)}</p>
                            <div id='date'>
                                <p className='heavy'>{d.toLocaleDateString("en-US", optionsTwo)}</p>
                                <span className='light'>{getshortHand(d.toLocaleDateString("en-US", optionsThree))}</span>
                            </div>

                        </div>
                    </div>


                </div>
                <div id='footer'>
                    <img onClick={this.leave} id='home_icon' src="./src/js/home_icon.png" alt="Home Icon" />
                    <p className='text' >Home Security: All doors in the house are closed</p>
                </div>


            </div>
        )
    }
}