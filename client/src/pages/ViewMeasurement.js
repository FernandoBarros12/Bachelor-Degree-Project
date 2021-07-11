import React, {useState} from 'react'
import Measurement from '../components/Measurement/Measurement'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
const ViewMeasurement = () => {
    const [isOpen, setISOpen] = useState(false)
    const toogle = () =>{
        setISOpen(!isOpen)
    }
    return (
        <>
            <Sidebar isOpen={isOpen} toogle={toogle}/>
            <Navbar toogle={toogle}/>
            <Measurement />
        </>
    )
}

export default ViewMeasurement
