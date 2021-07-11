import React, {useState} from 'react'
import InformationSection from '../components/InformationSection'
import Navbar from '../components/Navbar'
import PurposeSection from '../components/Purpose'
import { homeObjOne, importantObjOne } from '../components/Purpose/Data'
import Sidebar from '../components/Sidebar'

const Home = () => {
    const [isOpen, setISOpen] = useState(false)
    const toogle = () =>{
        setISOpen(!isOpen)
    }
    return (
        <>
            <Sidebar isOpen={isOpen} toogle={toogle}/>
            <Navbar toogle={toogle}/>
            <InformationSection/>
            <PurposeSection {...homeObjOne} />
            <PurposeSection {...importantObjOne} />
        </>
    )
}

export default Home