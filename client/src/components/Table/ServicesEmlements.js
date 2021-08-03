import styled from 'styled-components'

export const ServicesContainer = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    align-items:center;
    width: 100%;
    background-color: #ffff;
    height: 100%;
    @media screen and (max-width: 480px){
        width: 100vw;
        height: 100%;
    }

    @media screen and (max-width:400px){
        width: 100vw;
        height: 100%;
    }
`


export const ServicesCard = styled.div`
    border: 2px solid black;
    border-radius: 10px;
    background-color: #14213d;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 400px;
    height: 400px;
    margin: 20px;
    font-size:10px;
    border: 2px solid #e5e5e5;
    box-shadow: 0 1px 30px rgba(0,0,0,0.5);
    transition: all 0.2s ease-in-out;
    &:hover{
        transform: scale(1.02);
        transition: all 0.2s ease-in-out;
        cursor: pointer;
    }
`

export const ServicesIcon = styled.img`
    height: 160px;
    width: 160px;
    border-radius: 25px;
    color: #e5e5e5;
    object-fit: cover;
    margin-bottom: 10px;
`


export const ServicesH1 = styled.h1`
    font-size: 1.6rem;
    color: #e5e5e5;
    margin-bottom: -10px;
    padding-bottom: 10px;

    @media screen and (max-width:480px){
        font-size: 2rem;
    }
`
export const ServicesValue = styled.h1`
    font-size: 1.6rem;
    color: #e5e5e5;
    margin-bottom: -10px;
    padding-bottom: 10px;

    @media screen and (max-width:480px){
        font-size: 2rem;
    }
`

export const ServicesH2 = styled.h2`
    font-size:1rem;
    color: #e5e5e5;
    margin-bottom: 10px;
`

export const ServicesP = styled.p`
    font-size: 1rem;
    color: #e5e5e5;
    text-align: center;
`

