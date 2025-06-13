import './Login.css'
import Heading from '../components/Heading'
import Box from '../components/Box'

function Login() {
    return (
        <>
        <div className='container'>
            <div className="heading-wrapper">
                <Heading />
            </div>
            <div className="log-in">
                <Box/>
            </div>
        </div>
        </>
    )
}

export default Login;