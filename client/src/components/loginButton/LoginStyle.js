import styled from 'styled-components'
import { Link as LinkR} from 'react-router-dom'

export const LogInLinks = styled(LinkR)`
    border-radius: 50px;
    background: #fca311;
    white-space: nowrap;
    padding: 10px 22px;
    color: #010606;
    font-size: 16px;
    outline: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;

    &:hover{
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #010606;
    }
`