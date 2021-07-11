import React from 'react'
import Video  from '../../videos/video.mp4';
import{
    InformationContainer,
    InformationBg,
    VideoBg,
    InformationContent,
    InformarionH1,
    InformationP,
    InformationBtnWrapper,
}from './InformationElements'

const InformationSection = () => {


    return (
        <InformationContainer>
            <InformationBg>
                <VideoBg autoPlay loop muted src = {Video} type= 'video/mp4'/>
            </InformationBg>
            <InformationContent>
                <InformarionH1>¿Quienes Somos?</InformarionH1>
                <InformationP>
                    Somos un grupo destinado al estudio e implementación de tecnología con el fin
                    de proteger la salud de las personas
                </InformationP>
                <InformationBtnWrapper>
                </InformationBtnWrapper>
            </InformationContent>
        </InformationContainer>
    )
}

export default InformationSection
