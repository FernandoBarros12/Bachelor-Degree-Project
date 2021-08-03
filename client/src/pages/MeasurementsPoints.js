import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import React, { useState } from 'react';
import '../components/MeasurementsPoints/MeasurementsPoints.scss';
import Header from '../components/MeasurementsPoints/Header';
import Table from '../components/MeasurementsPoints/Table';
import axios from "axios";
import {valores} from './constants'
import { objectOf } from 'prop-types';
// import { element } from 'prop-types';


const MeasurementsPoints = () => {
    const [isOpen, setISOpen] = useState(false)
    const toogle = () =>{
        setISOpen(!isOpen)
    }
    
const [data, isData] = useState({})


const datos = async() => {
  const res = await axios.get('http://localhost:5000/api/mongo-mediciones')
  const objeto=res.data[Object.keys(res.data)[Object.keys(res.data).length-1]]
  isData(objeto)
}
datos()



function ultimo_valor (objeto){
  if (objeto.name == 'local-K'){
    valores.valor_k=objeto.valor
   
  }else{
    valores.valor_E=objeto.valor
    
  }
  return objeto.valor
}

ultimo_valor(data);


const tracksData = [
  {
    name: 'Local K',
    co2: valores.valor_k,
  },
  {
    name: 'Local E',
    co2:  valores.valor_E,
  }
  
];

  return (
    <>
        <Sidebar isOpen={isOpen} toogle={toogle}/>
        <Navbar toogle={toogle}/>
      <Header title="Mediciones de Locales Afiliados" />
      <Table 
        tableData={tracksData}
        headingColumns={['Lugar', 'Medición']}
        title="Tabla de mediciones"
        breakOn="small"
      />
    </>
  );
}

export default MeasurementsPoints;