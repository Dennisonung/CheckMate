import ReactDOM from 'react-dom/client'
import Navbar from './navbar'
import './billing.css'
import { useState } from 'react'

const Billing = ({ groupInfo }) => {

    const [total, setTotal] = useState('')

    const tempPeopleArray = [
        { "name": "john", "id": 1 },
        { "name": "dennis", "id": 2 },
        { "name": "sidak", "id": 3 }
    ]
    const divFactor = tempPeopleArray.length

    const handleChange = e => {
        setTotal(e.target.value);
    }

    const handleClick = e => {
        e.preventDefault();
    }

    var max = (total > 3000) ? false : true

    return (
        <div>
            <div className="containerDiv">
                <div id='textDiv'>
                    <h1> Create a New Bill</h1>
                    <h3 id='subheading'>Be sure all members splitting this bill have been selected on the Group page</h3>
                </div>
                <div className="billDiv">

                    <div className="totalInput">
                        <label htmlFor="total">Total Bill (Max. $3000)</label>
                        <input min={divFactor} max='3000' type="number" id="total" onChange={handleChange} placeholder='$' />
                        <button className="button" onClick={handleClick}>Confirm</button>
                    </div>

                    <div className="payeeList">
                        <h2>Payee List:</h2>
                        <div className="payeeContainer">
                            <ul>
                                {tempPeopleArray.map(p => {
                                    return (
                                        <li key={p.id}>{p.name}</li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>

                </div>

                <div className="container">

                    <div className="summary">
                        {max && total && <h3>${total} split {divFactor} ways, each party pays ${Math.round(100 * total / divFactor) / 100}</h3>}
                        {!max && total && <h3>Total too high</h3>}
                    </div>

                </div>

                <div className="buttonDiv">
                    <button className="button">
                        Send
                    </button>
                </div>

            </div>

            <Navbar />
        </div>
    )
}

export default Billing