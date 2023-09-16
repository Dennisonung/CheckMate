import ReactDOM from 'react-dom/client'
import Navbar from './navbar'
import './billing.css'
import { useState } from 'react'

const Billing = () => {

    const [total, setTotal] = useState('')

    const divFactor = 2;

    const handleChange = e => {
        setTotal(e.target.value);
    }

    const handleClick = e => {
        e.preventDefault();
        console.log(total)
    }


    return (
        <div>
            <div className="containerDiv">
                <h1>New Bill</h1>

                <h3 className='bold'>*** Be sure all members splitting this bill have been selected on the Group page</h3>

                <div className="billDiv">

                    <div className="totalInput">
                        <label htmlFor="total">Total Bill</label>
                        <input type="text" id="total" onChange={handleChange} placeholder='$'/>
                        <button className="button" onClick={handleClick}>Confirm</button>
                    </div>

                    <div className="payeeList">
                        <h2>Payee List:</h2>
                        <ul>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>

                </div>

                <div className="container">

                    <div className="summary">
                    <h3>${total} split {divFactor} ways, each party pays ${Math.ceil(total/divFactor)}</h3>
                    </div>

                    <div className="buttonDiv">
                        <button className="button">
                            Send
                        </button>
                    </div>

                </div>
            </div>

            <Navbar />
        </div>
    )
}

export default Billing