import ReactDOM from 'react-dom/client'
import Navbar from './navbar'
import './billing.css'

const Billing = () => {
    return (
        <div>
            <h1>New Bill</h1>

            <h3 className='bold'>*** Be sure all members splitting this bill</h3>

            <Navbar />
        </div>
    )
}

export default Billing