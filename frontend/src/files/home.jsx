import { React, useState, useContext } from 'react'
import ReactDOM from 'react-dom/client'
import Navbar from './navbar'
import "./home.css"
import axios from 'axios'
import { GroupContext } from '../contexts/GroupContext'


let billUsers = []


const GroupsDiv = ({ userInfo }) => {


    const [selectedGroup, setSelectedGroup] = useState(null);
    const [buttonClicked, setButtonClicked] = useState(false)
    const [people, setPeople] = useState([])

    setTimeout(() => {
        setGroupInfo(testGroupData);
    }, 2000);
    function handleCreateBill({ info }) {
        console.log(info);
    }
    const handleSubmit = () => { }
    return (
        <>
            <div id='groups'>
                {Object.keys(groupInfo).map((key) => (
                    <div key={key} className="groupDiv">
                        <img src={groupInfo[key].iconURL} alt={`Icon for ${groupInfo[key].name}`} className="profilePic" />
                        <div className='groupDivText'>
                            <h2>{groupInfo[key].name}</h2>
                            <p>Balance: {groupInfo[key].balance}</p>
                        </div>
                        <button onClick={() => {
                            handleCreateBill({ info: groupInfo[key] });

                        }} className="radioBtn"></button>
                    </div>
                ))}
                <div id="createBillDiv">
                    <button id='createBill' onClick={handleSubmit} > Create New Bill </button>
                </div>
            </div>

    </>
);
}


const BalanceCom = () => {
    const [balance, setBalance] = useState(29);
    const getBalance = () => {
        axios.post('http://localhost:3000/api/balance', {})
            .then(response => {
                setBalance(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            })
    }
    return (
        <div id='balance'> <h1> balance: {balance}CAD</h1> </div>
    )
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
const Home = ({ userInfo, balance }) => {
    return (
        <>
            <div id='home'>
                <Greeting />
                <div id="mainGroupDiv">
                    <BalanceCom />
                    <GroupsDiv userInfo={userInfo} />
                </div>
            </div>
            <Navbar />
        </>
    )
}

export {
    GroupsDiv
}
export default Home;