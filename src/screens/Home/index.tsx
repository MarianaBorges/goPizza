import React, { useEffect, useState, useCallback } from "react";
import { Alert, TouchableOpacity, FlatList } from "react-native";
import { MaterialIcons} from '@expo/vector-icons'
import firestore from '@react-native-firebase/firestore';
import { useNavigation, useFocusEffect } from "@react-navigation/native";

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
    MenuItemsNumber,
    NewProductButton 
} from "./styles";

import { useTheme } from "styled-components/native";
import { useAuth } from "@hooks/auth";

export function Home(){
    const [pizzas, setPizzas] = useState<ProductProps[]>([]);
    const [search, setSearch] = useState('');
    const { COLORS } = useTheme();
    const navigation = useNavigation();
    const { signOut, user } = useAuth();

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

    function handleOpen(id: string){
        const route = user?.isAdmin ? "Product" : "Order";
        navigation.navigate(route, { id });
    }

    function handleAdd(){
        navigation.navigate('Product', { } );
    }

    useFocusEffect(
       useCallback(()=>{
        fetchPizzas('');
       },[])
    );

    return (
        <Container>
            <Header>
                <Greeting>
                    <GreetingEmoji source={happyEmoje}/>
                    <GreetingText>
                        Olá, Mariana
                    </GreetingText>
                </Greeting>

                <TouchableOpacity onPress={signOut}>
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
                <MenuItemsNumber> {pizzas.length} pizzas</MenuItemsNumber>
            </MenuHeader>
            
            <FlatList 
                data={pizzas}
                renderItem={({item}) => <ProductCard 
                                            data={item} 
                                            onPress={()=>handleOpen(item.id)}/> }
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingTop: 20,
                    paddingBottom: 125,
                    marginHorizontal: 24,
                    backgroundColor:'red',
                }}
            />

            {
                user?.isAdmin &&
                <NewProductButton 
                    title="Cadastrar Pizza" 
                    type="secundary" 
                    onPress={handleAdd}
                /> 
            }
        </Container>
    )
}