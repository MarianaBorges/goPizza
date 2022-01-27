import React from "react";
import { TouchableOpacityProps } from "react-native";

import { 
    Container,
    Image,
    Name,
    Description,
    StatusContainer,
    StatusLabel,
 } from './styles';

 type Props = TouchableOpacityProps &{
    index: number;
 }

 export function OrderCard({index, ...rest}: Props){
    return (
        <Container index={index} {...rest}>
            <Image source={{ uri: "https://firebasestorage.googleapis.com/v0/b/gopizza-e0e5f.appspot.com/o/pizzas%2F1643065888934.png?alt=media&token=859a9ffe-8563-4569-896d-7ca36793d2da"}} />
           
            <Name>4 Queijos</Name>

            <Description>
                Mesa 5 ● Quant: 1 
            </Description>

            <StatusContainer status="Preparando">
                <StatusLabel status="Preparando">
                    Preparando
                </StatusLabel>
            </StatusContainer>
        </Container>
    )
 }