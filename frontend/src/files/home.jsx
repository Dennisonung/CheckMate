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
        "name": "person A",
        "iconURL": "data:image/jpeg;base64,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",
        "balance": "0.03"
    },
    "group2": {
        "name": "person B",
        "iconURL": "https://wallpapers.com/images/hd/gaming-profile-pictures-4tkf7tmn3ieutn18.jpg",
        "balance": "0.02"
    },
    "group3": {
        "name": "person C",
        "iconURL": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXMMdfGVo0DUO60HH2rPeiBySnx-93spUlmw&usqp=CAU",
        "balance": "0.01"
    }
}





const GroupsDiv = () => {
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

    return (<>
        <div id='groups'>
            {Object.keys(groupInfo).map((key) => (
                <div key={key} className="groupDiv">
                    <img src={groupInfo[key].iconURL} alt={`Icon for ${groupInfo[key].name}`} className="profilePic" />
                    <div className='groupDivText'>
                        <h2>{groupInfo[key].name}</h2>
                        <p>Balance: {groupInfo[key].balance}</p>
                    </div>
                </div>
            ))}
        </div>
    </>
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

const Home = () => {
    return (
        <div id='home'>
            <Greeting />
            <Navbar />
            <GroupsDiv />

        </div>
    )
}

export {
    GroupsDiv
}
export default Home;