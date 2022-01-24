import React, { useEffect, useState } from "react";
import { Alert, TouchableOpacity, FlatList } from "react-native";
import { MaterialIcons} from '@expo/vector-icons'
import firestore from '@react-native-firebase/firestore';

import happyEmoje from "@assets/happy.png";
import { Search } from "@components/Search";
import { ProductCard, ProductProps } from "@components/ProductCard";

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
    const [pizzas, setPizzas] = useState<ProductProps[]>([]);
    const [search, setSearch] = useState('');
    const { COLORS } = useTheme();

    function fetchPizzas(value: string){
        const formattedValue = value.toLocaleLowerCase().trim();

        firestore()
        .collection('pizzas')
        .orderBy('name_insensive')
        .startAt(formattedValue)
        .endAt(`${formattedValue}\uf8ff`)
        .get()
        .then(response => {
            const data = response.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data(),
                }
            }) as ProductProps[];

            setPizzas(data);
        })
        .catch(() => Alert.alert('Consulta', 'Não foi possível fazer a consulta.'))
    }

    function handleSearch(){
        fetchPizzas(search);
    }

    function handleSearchClear(){
        setSearch('');
        fetchPizzas('');
    }

    useEffect(()=>{
        fetchPizzas('');
    },[]);

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

            <Search 
                onChangeText={setSearch}
                value={search}
                onSearch={handleSearch} 
                onClear={handleSearchClear}
            />

            <MenuHeader>
                <Title>Cardápio</Title>
                <MenuItemsNumber> 10 pizzas</MenuItemsNumber>
            </MenuHeader>

            <FlatList 
                data={pizzas}
                renderItem={({item}) => <ProductCard data={item}/> }
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingTop: 20,
                    paddingBottom: 125,
                    marginHorizontal: 24
                }}
            />

        </Container>
    )
}