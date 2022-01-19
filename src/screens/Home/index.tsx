import React from "react";
import { TouchableOpacity } from "react-native";
import { MaterialIcons} from '@expo/vector-icons'

import happyEmoje from "@assets/happy.png";
import { Search } from "@components/Search";
import { ProductCard } from "@components/ProductCard";

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

const DATA = {
    id:'1',
    name: 'Magherita',
    description: 'Mussarela, manjericão fresco, parmesão e tomate',
    photo_url: "https://firebasestorage.googleapis.com/v0/b/gopizza-e0e5f.appspot.com/o/pizzas%2F1642431932561.png?alt=media&token=06a3d0da-4ca3-4670-9a50-3cfe10fa8a3d"
}

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
            
            <ProductCard data={DATA}/>
            <ProductCard data={DATA}/>
        </Container>
    )
}