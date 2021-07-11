import styled from 'styled-components'

export const PurposeContainer = styled.div`
    color: #fff;
    background-color: #f9f9f9;
    @media screen and (max-width: 768px){
        padding: 100px 0;
    }
`

export const PruposeWrapper = styled.div`
    display: grid;
    z-index:1;
    height:860px;
    width: 100%;
    max-width: 1100px;
    margin-right: auto;
    margin-left: auto;
    padding:0 24px;
    justify-content: center;
`

export const PruposeRow = styled.div`
    display: grid;
    grid-auto-columns: minimax(auto, 1fr);
    align-items: center;
    margin-top: 20px;
    grid-template-areas: 'col1 col2';
    @media screen and (max-width: 768px){
        grid-template-areas: 'col1' 'col2';
    }
`

export const Column1 = styled.div`
    margin-bottom: 15px;
    padding: 0 15px;
    grid-area: col1;
`

export const Column2 = styled.div`
    margin-bottom: 15px;
    padding: 0 15px;
    grid-area: col2;
`

export const TextWrapper = styled.div`
    max-width: 540px;
    padding-top: 0;
    padding-bottom:60px;
`

export const TopLine = styled.div`
    color: #fca311;
    font-size: 30px;
    line-height: 16px;
    font-weight: 700;
    letter-spacing: 1.4px;
    text-transform: uppercase;
    margin-bottom: 16px;
`
export const Heading = styled.h1`
    margin-bottom: 24px;
    font-size: 48px;
    line-height: 1.1;
    font-weight: 600;
    color : #010606;

    @media screen and (max-width:480px){
        font-size: 32px;
    }
`

export const Subtitle = styled.p`
    max-width: 440px;
    margin-bottom: 35px;
    font-size: 18px;
    line-height: 24px;
    color : #010606;
`

export const BtnWrap = styled.div`
    display: flex;
    justify-content: flex-start;
`

export const ImgWrap = styled.div`
    max-width: 555px;
    height: 100%;
`

export const Img = styled.img`
    width: 100%;
    margin: 0 0;
    border-radius: 50px;
    padding-right: 0;
`