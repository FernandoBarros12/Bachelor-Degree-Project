
import React, {useState} from 'react'
import RegisterMearsument from '../components/RegisterMeasurement/index'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
const RegisterMearsurements = () => {
    const [isOpen, setISOpen] = useState(false)
    const toogle = () =>{
        setISOpen(!isOpen)
    }
    return (
        <>
            <Sidebar isOpen={isOpen} toogle={toogle}/>
            <Navbar toogle={toogle}/>
            <RegisterMearsument />
        </>
    )
}

export default RegisterMearsurements
