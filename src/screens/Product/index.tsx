import React, { useState } from "react";
import { Platform, TouchableOpacity, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";

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

export function Product(){
    const [ image, setImage ] = useState('');
    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ priceSizeP, setPriceSizeP ] = useState('');
    const [ priceSizeM, setPriceSizeM ] = useState('');
    const [ priceSizeG, setPriceSizeG ] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);


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
    return( 
        <Container behavior={Platform.OS === "ios" ? "padding" : undefined}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Header>
                    <ButtonBack /> 

                    <Title>Cadastrar</Title>

                    <TouchableOpacity>
                        <DeleteLabel>Deletar</DeleteLabel>
                    </TouchableOpacity>
                </Header>

                <Upload>
                    <Photo uri={image}/>   

                    <PickImageButton 
                        title="Carregar" 
                        type="secundary"
                        onPress={handleImagePicker}
                    />             
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

                    <Button 
                        title="Cadastrar Pizza"
                        isLoading={isLoading}
                    />
                
                </Form>
            </ScrollView>
        </Container>
    )
}