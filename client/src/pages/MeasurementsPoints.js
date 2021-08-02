import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import React, { useState } from 'react';
import '../components/MeasurementsPoints/MeasurementsPoints.scss';
import Header from '../components/MeasurementsPoints/Header';
import Table from '../components/MeasurementsPoints/Table';
import axios from "axios";
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

const valores= (objeto) => {
  valor_K=tracksData;
  valor_E=tracksData;
  if (objeto.name == 'local-K'){
    nuevo_valor = objeto.valor
    valor_K=nuevo_valor
    idnt = 'K'
    
  }else{
    nuevo_valor = objeto.valor
    valor_E=nuevo_valor
    idnt = 'E'
  }
  idnt = 'se queda antiguo'
  return vlalork,nuevok,valore,nuevoE
}


const tracksData = [
  {
    name: 'Local K',
    co2: (ultimo_valor(data).idnt) ? ultimo_valor(data).medicion : valor_respaldo(data).medicion,
  },
  {
    name: 'Local E',
    co2: (!ultimo_valor(data).idnt) ? ultimo_valor(data).medicion : valor_respaldo(data).medicion,
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