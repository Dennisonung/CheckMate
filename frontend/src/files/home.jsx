import { React, useState } from 'react'
import ReactDOM from 'react-dom/client'
import Navbar from './navbar'
import "./home.css"
import axios from 'axios'

const blankGroupData = {
    "group1": {
        "name": "",
        "iconURL": "",
        "balance": ""
    },
    "group2": {
        "name": "",
        "iconURL": "",
        "balance": ""
    },
    "group3": {
        "name": "",
        "iconURL": "",
        "balance": ""
    }
}
const testGroupData = {
    "group1": {
        "name": "group A",
        "iconURL": "",
        "balance": "0.03"
    },
    "group2": {
        "name": "group B",
        "iconURL": "",
        "balance": "0.02"
    },
    "group3": {
        "name": "group C",
        "iconURL": "",
        "balance": "0.01"
    }
}

const Home = () => {
    return (
        <div id='home'>
            <Greeting />
            <Navbar />
            <Groups />

        </div>
    )
}

const Groups = () => {
    const [groupInfo, setGroupInfo] = useState(blankGroupData);
    const getGroupInfoPost = () => {
        axios.post('http://localhost:3000/home', {})
            .then(response => {

                setGroupInfo(response.data);
            })
            .catch(error => {

                console.error('Error:', error);
            })
    }
    setTimeout(() => {
        setGroupInfo(testGroupData);
    }, 2000);

    return (
        <div id='Groups'>
            {Object.keys(groupInfo).map((key) => (
                <div key={key}>
                    <h2>{groupInfo[key].name}</h2>
                    <img src={groupInfo[key].iconURL} alt={`Icon for ${groupInfo[key].name}`} />
                    <p>Balance: {groupInfo[key].balance}</p>
                </div>
            ))}
        </div>
    );
}

const Greeting = () => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const emojis = ["👋", "🌞", "🙌", "👍", "🎉", "😊", "👋🏼", "😃", "🤗", "✨"];
    const greetingEmojis = emojis[Math.floor(Math.random() * emojis.length)]
    let today = new Date();
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    let greeting = today.getHours() < 12 ? "morning" : (today.getHours() < 18 ? "afternoon" : "evening");

    function getWeekday(dateStr) {
        const dateObj = new Date(dateStr);
        const weekdayIndex = dateObj.getDay();
        return daysOfWeek[weekdayIndex];
    }
    const weekday = getWeekday(date.toString());




    return (

        <div id='greeting'>
            <h1>{`Good ${greeting}, ${name} ${greetingEmojis}`}</h1>
            <div id='subHeading'>  <h2>{` ${today.getDate()} ${months[today.getMonth()]}`}</h2></div>
        </div>
    )


}


export default Home
