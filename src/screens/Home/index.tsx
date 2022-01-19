import React from "react";
import { TouchableOpacity } from "react-native";
import { MaterialIcons} from '@expo/vector-icons'

import happyEmoje from "@assets/happy.png";
import { Search } from "@components/Search";

import { 
    Container, 
    Greeting, 
    GreetingEmoji, 
    GreetingText, 
    Header,
    Title,
    MenuHeader,
    MenuItemsNumber 
} from "./styles";
import { useTheme } from "styled-components/native";

export function Home(){

    const { COLORS } = useTheme();

    return (
        <Container>
            <Header>
                <Greeting>
                    <GreetingEmoji source={happyEmoje}/>
                    <GreetingText>
                        Olá, Mariana
                    </GreetingText>
                </Greeting>

                <TouchableOpacity>
                    <MaterialIcons name="logout" color={COLORS.TITLE} size={24}/>
                </TouchableOpacity>
            </Header>

            <Search onSearch={()=>console.log('funciona')} onClear={()=>console.log('limpo')}/>

            <MenuHeader>
                <Title>Cardápio</Title>
                <MenuItemsNumber> 10 pizzas</MenuItemsNumber>
            </MenuHeader>
        </Container>
    )
}