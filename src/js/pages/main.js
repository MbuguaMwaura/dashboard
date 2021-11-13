import React from 'react';
import App from './App'
import Home from './Home'
import Welcome from './Welcome'
import {
    Route,
    HashRouter
} from 'react-router-dom';
import io from 'socket.io-client';
let temp = [];

const socket = io.connect('http://localhost:8000');

export default class main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dashBoardActive: false,
            navigate: '',
            wallpaper: 'wallpaper1',
            wallpaperNo: 7,
            currentWallpaper: 1,
            brightness: 'bright3',
            brightnessPercent: '110%',
            avatarData: ''
        }
    }

    componentDidMount() {
        socket.on("logIn", (data) => {

            temp.push({
                userId: data.userId,
                username: data.username,
                text: data.text,
            });

            if (data.text === true) {
                this.setState({ navigate: 'home' })
            } else if (data.text === false) {
                this.setState({ navigate: 'base' })
            }


            console.log(temp)
        });
        socket.on("message", (data) => {

            temp.push({
                userId: data.userId,
                username: data.username,
                text: data.text,
            });

            if (data.text === 'Welcome Dashboard') {
                this.setState({ dashBoardActive: true })
            }
            console.log(temp)
        });

        socket.on("changeWallpaper", (data) => {

            temp.push({
                userId: data.userId,
                username: data.username,
                text: data.text,
            });

            if (data.text === 'mbugua mobile has joined the chat') {
                this.setState({ navigate: 'home' })
            } else if (data.text === 'Welcome Dashboard') {
                this.setState({ dashBoardActive: true })
            }

            if (data.text === "mbugua mobile has left the room") {
                this.setState({ navigate: 'base' })
            }

            if (data.text === "change wallpaper") {
                if (this.state.currentWallpaper === this.state.wallpaperNo - 1) {
                    this.setState({ currentWallpaper: 1 })
                    this.setState({ wallpaper: 'wallpaper1' })
                } else {
                    console.log("Current wallpaper number old >>>> " + this.state.currentWallpaper)
                    this.setState({ currentWallpaper: this.state.currentWallpaper + 1 })
                    console.log("Current wallpaper number new >>>> " + this.state.currentWallpaper)
                    var wall = `wallpaper${this.state.currentWallpaper + 1}`
                    this.setState({ wallpaper: wall })

                }

            }
            console.log(temp)
        });

        socket.on("changeBrightness", (data) => {

            temp.push({
                userId: data.userId,
                username: data.username,
                text: data.text,
            });
            const level = `bright${data.text}`
            this.setState({ brightnessPercent: data.text })
            console.log(temp)
        });


        socket.emit("joinRoom", { username: "Dashboard", roomname: "dash" });
        socket.emit("getAvatar")

        socket.on("getAvatar", (data) => {

            // temp.push({
            //     userId: data.userId,
            //     username: data.username,
            //     text: data.text,
            // });

            // if (data.text === 'Welcome Dashboard') {
            //     this.setState({ dashBoardActive: true })
            // }
            console.log(data)
            const image = `data:image/png;base64, ${data.imageData}`
            this.setState({ avatarData: image, navigate: 'base' })


        });

    }

    componentWillUnmount() {
        // socket.emit("disconnectUser");
    }


    render() {
        return (
            <HashRouter>
                <div>
                    <Route path="/" exact render={(props) => (
                        <Welcome {...props} socket={socket}
                            mainState={this.state}
                        />
                    )} />
                    <Route path="/login" exact render={(props) => (
                        <App {...props} socket={socket}
                            mainState={this.state}
                        />
                    )} />
                    <Route path="/home" render={(props) => (
                        <Home {...props} socket={socket}
                            mainState={this.state}
                        />
                    )} />
                </div>
            </HashRouter>
        )
    }


}