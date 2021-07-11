import React, {useState} from 'react'
import MTable from '../components/Table/MTable'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
const CommunityMearsument = () => {
    const [isOpen, setISOpen] = useState(false)
    const toogle = () =>{
        setISOpen(!isOpen)
    }
    return (
        <>
            <Sidebar isOpen={isOpen} toogle={toogle}/>
            <Navbar toogle={toogle}/>
            <MTable />
        </>
    )
}

export default CommunityMearsument
