import React, {useState} from 'react'
import Navbar from '../components/Navbar'
import PurposeSection from '../components/Purpose'
import { socialDistancing, co2 } from '../components/Purpose/Data'
import Sidebar from '../components/Sidebar'

const More = () => {
    const [isOpen, setISOpen] = useState(false)
    const toogle = () =>{
        setISOpen(!isOpen)
    }
    return (
        <>
            <Sidebar isOpen={isOpen} toogle={toogle}/>
            <Navbar toogle={toogle}/>
            <PurposeSection {...socialDistancing} />
            <PurposeSection {...co2} />
        </>
    )
}

export default More