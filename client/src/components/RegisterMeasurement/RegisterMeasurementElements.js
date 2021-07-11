import styled from 'styled-components';
import {Link} from 'react-router-dom';

export const Container = styled.div`
    
    height: 100vh;
    position: relative;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    z-index:0;
    overflow: hidden;
    background: #ffff;
    /*background: linear-gradient(
        108deg,
        rgba(1,174,86,1) 0%,
        rgba(10,201,122,1) 100%
    );*/
`;

export const FormWrap = styled.div`
    height:100%;
    display: flex;
    flex-direction: column;
    justify-content:center;

    @media only screen and (max-width:400px){
        height: 80%;
    }
`;

export const Icon = styled(Link)`
    margin-left:32px;
    margin-top: 32px;
    text-decoration: none;
    color:#fff;
    font-weight: 700;
    font-size: 32px;

    @media screen and (max-width:480px){
        margin-left: 16px;
        margin-top: 15px;
    }
`;


export const FormContent = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 20px;
    @media screen and (max-width:480px){
        padding:10px;
    }
`;

export const Form = styled.form`
    background: #14213d;
    max-width: 400px;
    height: auto;
    width: 100%;
    z-index: 1;
    display: grid;
    margin: 0 auto;
    padding: 50px 32px;
    border: 2px solid #e5e5e5;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.9);
    @media screen and (max-width:480px){
        margin-top: 5px;
        padding: 32px 32px;
    }
`;

export const FormH1 = styled.h1`
    margin-bottom: 40px;
    color: #ffff;
    font-size: 20px;
    font-weight: 400;
    text-align: center;
`;

export const FormLabel =styled.label`
    margin-bottom: 8px;
    font-size: 14px;
    color: #fff;
`;

export const FormSelect = styled.select`
    padding: 16px 16px;
    margin-bottom: 32px;
    border: none;
    border-radius: 4px;
`;

export const FormInput = styled.input`
    padding: 16px 16px;
    margin-bottom: 32px;
    border: none;
    border-radius: 4px;
`;

export const FormInputImg = styled.input`
    padding: 16px 16px;
    margin-bottom: 32px;
    border: none;
    border-radius: 4px;
    background: white;
`;

export const FormButton = styled.button`
    background: #fca311;
    padding: 16px 0;
    border: none;
    border-radius: 4px;
    color:#fff;
    font-size: 20px;
    cursor: pointer;
`;

export const Text = styled.span`
    text-align: center;
    margin-top: 24px;
    color: #fff;
    font-size: 14px;
`;





