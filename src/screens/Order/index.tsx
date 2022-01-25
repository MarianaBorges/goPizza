import React, { useState} from "react";
import { Platform } from "react-native";

import { ButtonBack } from "@components/ButtonBack";
import { RadioButton } from "@components/RadioButton";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

import { 
    Container, 
    Content,
    Header, 
    Photo, 
    Sizes, 
    Form,
    Title,
    Label,
    FormRow,
    InputGroup,
    Price
} from './styles';

import { PIZZA_TYPES } from "../../utils/pizzaTypes";

export function Order(){
    const [size, setSize] = useState('');

    return (
        <Container behavior={Platform.OS === "ios" ? 'padding' : undefined }>
            <Content>
                <Header>
                    <ButtonBack
                        onPress={() => {}}
                        style={{ marginBottom: 108 }}
                    />
                </Header>
                <Photo source={{ uri: "https://firebasestorage.googleapis.com/v0/b/gopizza-e0e5f.appspot.com/o/pizzas%2F1643065888934.png?alt=media&token=859a9ffe-8563-4569-896d-7ca36793d2da"}}/>
                <Form>
                    <Title>Nome da Pizza</Title>
                    <Label>Selecione um tamanho</Label>
                    <Sizes>
                        {
                            PIZZA_TYPES.map(item => (
                                <RadioButton 
                                    key={item.id}
                                    title={item.name} 
                                    onPress={() => setSize(item.id)}
                                    selected={size === item.id}
                                    />
                            ))
                        }
                    </Sizes>

                    <FormRow>
                        <InputGroup>
                            <Label>Número de mesas</Label>
                            <Input keyboardType="numeric"/>
                        </InputGroup>

                        <InputGroup>
                            <Label>Quantidade</Label>
                            <Input keyboardType="numeric"/>
                        </InputGroup>
                    </FormRow>

                    <Price>Volor de R$ 00,00</Price>

                    <Button title="Confirmar pedido"/>
                </Form>
            </Content>
        </Container>
    )
}