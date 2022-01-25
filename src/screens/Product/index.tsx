import React, { useState, useEffect } from "react";
import { Platform, TouchableOpacity, ScrollView, Alert, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import { useNavigation, useRoute } from "@react-navigation/native";

import { ProductNaviagtionProps } from "@src/@types/navigation";

import { ButtonBack } from "@components/ButtonBack";
import { Photo } from "@components/Photo";

import { 
    Container, 
    Header, 
    Title, 
    DeleteLabel,
    Upload,
    PickImageButton,
    Form,
    Label,
    InputGroup,
    InputGroupHeader,
    MaxCharacters
} from "./styles";

import { Input } from "@components/Input";
import { InputPrice } from "@components/InputPrice";
import { Button } from "@components/Button";

import { ProductProps } from "@components/ProductCard";

type PizzaResponse = ProductProps & {
    photo_path: string;
    prices_sizes:{
        p: string;
        m: string;
        g: string;
    }

}

export function Product(){
    
    const [ image, setImage ] = useState('');
    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ priceSizeP, setPriceSizeP ] = useState('');
    const [ priceSizeM, setPriceSizeM ] = useState('');
    const [ priceSizeG, setPriceSizeG ] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);
    const [ photoPath, setPhotoPath] = useState('');

    const route = useRoute();
    const { id } = route.params as ProductNaviagtionProps;
    const navigation = useNavigation();

    async function handleImagePicker(){
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if(status === 'granted'){
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                aspect: [4, 4]
            });

            if(!result.cancelled){
                setImage(result.uri);
            }
        }
    }

    async function handleAdd(){
        if(!name.trim()){
            return Alert.alert('Cadastro', 'Informe o nome da Pizza.');
        }

        if(!description){
            return Alert.alert('Cadastro', 'Informe a descrição da Pizza.');
        }

        if(!image){
            return Alert.alert('Cadastro', 'Selecione a image da Pizza.');
        }

        if(!priceSizeP || !priceSizeM || !priceSizeG ){
            return Alert.alert('Cadastro', 'Informe o preço de todos os tamanhos da pizza.');
        }

        setIsLoading(true);

        const fileName = new Date().getTime();
        const reference = storage().ref(`/pizzas/${fileName}.png`);

        await reference.putFile(image);
        const photo_url = await reference.getDownloadURL();

        firestore()
            .collection('pizzas')
            .add({
                name,
                name_insensive: name.toLowerCase().trim(),
                description,
                prices_sizes:{
                    p: priceSizeP,
                    m: priceSizeM,
                    g: priceSizeG,
                },
                photo_url,
                photo_path: reference.fullPath
            })
            .then(() => navigation.navigate('Home'))
            .catch(() =>{
                setIsLoading(false);
                Alert.alert('Cadastro','Não foi possível cadastrar a pizza.')
            });

        setIsLoading(false);
    }

    function handleGoBack(){
        navigation.goBack();
    }

    function handleDeleteProduct(){
        firestore()
            .collection('pizzas')
            .doc(id)
            .delete()
            .then(()=>{
                storage()
                    .ref(photoPath)
                    .delete()
                    .then(() => navigation.navigate('Home'));
            });
    }

    useEffect(()=>{
        if (id) {
            firestore()
            .collection('pizzas')
            .doc(id)
            .get()
            .then(response => {
                const product = response.data() as PizzaResponse;

                setImage(product.photo_url);
                setName(product.name);
                setDescription(product.description);
                setPriceSizeP(product.prices_sizes.p);
                setPriceSizeM(product.prices_sizes.m);
                setPriceSizeG(product.prices_sizes.g);
                setPhotoPath(product.photo_path);
            })
        }

    }, [id])

    return( 
        <Container behavior={Platform.OS === "ios" ? "padding" : undefined}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Header>
                    <ButtonBack onPress={handleGoBack}/> 

                    <Title>Cadastrar</Title>

                    { id ?
                        <TouchableOpacity onPress={handleDeleteProduct}>
                            <DeleteLabel>Deletar</DeleteLabel>
                        </TouchableOpacity>
                        :
                        <View style={{width: 20}}/>
                    }
                </Header>

                <Upload>
                    <Photo uri={image}/>   

                    { !id && 
                        <PickImageButton 
                            title="Carregar" 
                            type="secundary"
                            onPress={handleImagePicker}
                        />  
                    }           
                </Upload>

                <Form>
                    <InputGroup>
                        <Label>Nome</Label>
                        <Input 
                            value={name}
                            onChangeText={setName}
                        />
                    </InputGroup>

                    <InputGroup>
                        <InputGroupHeader>
                            <Label>Descrição</Label>
                            <MaxCharacters>0 de 60</MaxCharacters>
                        </InputGroupHeader>
                        <Input
                            multiline
                            maxLength={60}
                            style={{ height: 80}}
                            value={description}
                            onChangeText={setDescription}
                        />
                    </InputGroup>

                    <InputGroup>
                        <Label>Tamanhos e Preços</Label>

                        <InputPrice 
                            size="P"
                            value={priceSizeP}
                            onChangeText={setPriceSizeP}    
                        />
                        <InputPrice 
                            size="M"
                            value={priceSizeM}
                            onChangeText={setPriceSizeM}   
                        />
                        <InputPrice 
                            size="G"
                            value={priceSizeG}
                            onChangeText={setPriceSizeG}       
                        />
                    </InputGroup>

                    { !id && 
                        <Button 
                            title="Cadastrar Pizza"
                            isLoading={isLoading}
                            onPress={handleAdd}
                        />
                    }
                
                </Form>
            </ScrollView>
        </Container>
    )
}