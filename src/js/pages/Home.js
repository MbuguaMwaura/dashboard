import React from 'react';

export default class Home extends React.Component{
    
    navigate = () => {
        this.props.history.push({
            pathname: `/login`
        });
    }

    componentDidMount() {
        if(this.props.mainState.avatarData.length === 0){
            this.props.history.push({
                pathname: `/`
            }); 
        }
    }

    componentDidUpdate(){
        if(this.props.mainState.navigate === 'base'){
         this.props.history.push({
             pathname: `/login`
         });
        }
     }

    render(){
    return (
        <div id='main' style={{filter : `brightness(${this.props.mainState.brightnessPercent})`}}>
            <img id='backgroundTwo' src={`./src/js/${this.props.mainState.wallpaper}.jpeg`} />
            <div id='content'>
                <div className='text' >

                    <h3 className='light'>Welcome</h3>
                    <h1 className='heavy'>Mbugua</h1>
                    <div className="blobs-container">
                        <div className="blob white"></div>
                        <div className="blob red"></div>
                        <div className="blob orange"></div>
                        <div className="blob yellow"></div>
                        <div className="blob blue"></div>
                        <div className="blob green"></div>
                        <div className="blob purple"></div>
                        <div className="blob"></div>
                    </div>

                </div>
            </div>
            <div id='footer'>
                <img onClick={this.navigate} id='home_icon' src="./src/js/home_icon.png" alt="Home Icon" />
                <p className='text' >Home Security: All doors in the house are closed</p>
            </div>


        </div>
    )
    }
}