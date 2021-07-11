import React from 'react'
import {
    PurposeContainer,
    PruposeRow,
    PruposeWrapper,
    Column1,
    Column2,
    TopLine,
    TopLineRed,
    TextWrapper,
    Heading,
    Subtitle,
    ImgWrap,
    Img
} from './PurposeElement'
const PurposeSection = ({lightBg,id,imgStart,topLine,lightText,headline
, darkText,description,img,alt}) => {
    return (
        <>
            <PurposeContainer lightBg = {lightBg} id = {id}>
                <PruposeWrapper>
                    <PruposeRow imgStart = {imgStart}>
                        <Column1>
                            <TextWrapper>
                                <TopLine>{topLine}</TopLine>
                                <Heading lightText = {lightText}>{headline}</Heading>
                                <Subtitle darkText = {darkText}>{description}</Subtitle>
                            </TextWrapper>
                        </Column1>

                        <Column2>
                            <ImgWrap>
                                <Img src={img} alt = {alt} />
                            </ImgWrap>
                        </Column2>
                    </PruposeRow>
                </PruposeWrapper>
            </PurposeContainer>
        </>
    )
}

export default PurposeSection
