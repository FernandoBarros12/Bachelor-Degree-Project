import "./App.css";
import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import {Button} from '../ButtonElement' 
import {ServicesContainer, ServicesCard,ServicesH2,ServicesH1, ServicesP,ServicesIcon, ServicesValue} from './ServicesEmlements'
import Icon1 from '../../images/complete.svg'
import{
  ArrowForward,
  ArrowRight
}from '../InformationSection/InformationElements'

function RenderPaintation({list, page, change}){

  if(list.length > 9){

      return(

        <>

      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={page}
        onPageChange={change}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        // disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />

      </>

      );

  }else{

    return (<></>)

  }

}
function MTable() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/api/measurement')
      .then(res => res.json())
      .then(res => setData(res))
  }, [])
  const [hover, setHover] = useState(false);

  const onHover = () =>{
      setHover(!hover)
  }
  //const [users, setUsers] = useState(JsonData.slice(0, 50));
  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 9;
  const pagesVisited = pageNumber * usersPerPage;

  const displayUsers = data
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((data) => { 
      let colorChange = "";
      if(data.valor_co2 > 1200){
        colorChange = "#B03A2E";
      } else if (data.valor_co2<1200 && data.valor_co2 >= 801 ){
        colorChange = "#F4D03F";
      }else {
        colorChange = "#229954";
      }
      return (

        <ServicesCard>
          <ServicesIcon src={"http://localhost:5000/"+data.namefile} />
          <ServicesH1>Lugar: {data.lugar}</ServicesH1>
          <ServicesValue style = {{color : colorChange}}>Valor : {data.valor_co2}</ServicesValue> 
          <ServicesH2>Categoría : {data.categoria}</ServicesH2>
          <ServicesP></ServicesP>
          <Button to = {'/measurement/'+ data.id} onMouseEnter = {onHover} onMouseLeave = {onHover}
                        primary = 'true'
                        dark = ' true'
          >
            Ver medición {hover ? <ArrowForward/> : <ArrowRight/>}
          </Button>
        </ServicesCard>
      );
    });

  const pageCount = Math.ceil(data.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <ServicesContainer>
      {displayUsers}
      <RenderPaintation list={data} page = {pageCount} change = {changePage} />
    </ServicesContainer>
  );
}

export default MTable;