import { withRouter } from "react-router";
import axios from "axios";
import { PurposeContainer, PruposeWrapper,  PruposeRow, Column1, TextWrapper, TopLine, Heading, Subtitle, ImgWrap, Img, Column2} from "./MeasurementStyle"



import React, { Component } from 'react'

class Measurement extends Component {

    state = {
        data: {},
    }

    async componentDidMount() {
        const id = (this.props.match.params.id)
        const res = await axios.get('http://localhost:5000/api/measurement/' + id)
        this.setState({ data: res.data.reduce((a, b) => Object.assign(a, b), {}) })
    }
    render() {
        return (
            <>
            <PurposeContainer>
                <PruposeWrapper>
                    <PruposeRow >
                        <Column1>
                            <TextWrapper>
                                <TopLine>{this.state.data.lugar}</TopLine>
                                <Heading >Valor: {this.state.data.valor_co2}</Heading>
                                <Subtitle >Reportado por: {this.state.data.nombre}</Subtitle>
                                <Subtitle >{this.state.data.comentario}</Subtitle>
                            </TextWrapper>
                        </Column1>

                        <Column2>
                            <ImgWrap>
                                <Img src={"http://localhost:5000/"+this.state.data.namefile} />
                            </ImgWrap>
                        </Column2>
                    </PruposeRow>
                </PruposeWrapper>
            </PurposeContainer>
        </>
            
        )
    }
}

export default withRouter(Measurement)