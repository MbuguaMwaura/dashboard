import React from 'react';

export default class Welcome extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            shouldNavigate : false
        }
      }
   
   componentDidUpdate() {
       if(this.state.shouldNavigate === true && this.props.mainState.navigate === 'base'){
            
            this.props.history.push({
                pathname: `/login`
            });
       }
        
    }

    componentDidMount(){       
        setTimeout(this.setComponentState, 5000)      
    }

    setComponentState = () => {
        console.log(this.state)
        this.setState({shouldNavigate : true})
      
    }


    render() {
        var text = "welcome"
        return (
            <div className="wrapper">
                <div className='letters'>
                    {text.split("").map(function (letter, i) {
                        return <span className='letter' key={i}>
                            {letter}
                        </span>;
                    })}
                </div>
            </div>
        )
    }
}