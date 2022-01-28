import React, { useState, useEffect} from "react";
import { Platform, Alert, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useAuth } from "@hooks/auth";
import firestore from '@react-native-firebase/firestore';

import { ButtonBack } from "@components/ButtonBack";
import { RadioButton } from "@components/RadioButton";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { ProductProps } from "@components/ProductCard";

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
import { ProductNaviagtionProps } from "@src/@types/navigation";

type PizzaResponse = ProductProps & {
    prices_sizes:{
        [key: string]: number;
    }

}
export function Order(){
    const [pizza, setPizza] = useState<PizzaResponse>({} as PizzaResponse);
    const [size, setSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [tableNumber, setTableNumber] = useState('0');
    const [sendingOrder, setSendingOrder] = useState(false);

    const { user } = useAuth();
    const { navigate, goBack } = useNavigation();
    const route = useRoute();
    const { id } = route.params as ProductNaviagtionProps;

    const amount = size ? pizza.prices_sizes[size] * quantity : "0,00";

    function handleOrder(){
        if(!size){
            return Alert.alert('Pedido', 'selecione o tamanho da pizza');
        }

        if(!tableNumber){
            return Alert.alert('Pedido', 'Informe o número da mesa');
        }

        if(!quantity){
            return Alert.alert('Pedido', 'Informe a quantidade');
        }

        setSendingOrder(true);

        firestore()
            .collection('orders')
            .add({
                quantity,
                amount,
                pizza: pizza.name,
                size,
                table_number: tableNumber,
                status: "Preparando",
                waiter_id: user?.id,
                image: pizza.photo_url
            })
            .then(() => navigate('Home'))
            .catch(() => {
                Alert.alert('Pedido','Não foi possível realizar o pedido');
                setSendingOrder(false);
            })
    }

    useEffect(() =>{
        if (id) {
            firestore()
            .collection('pizzas')
            .doc(id)
            .get()
            .then(response => setPizza(response.data() as PizzaResponse))
            .catch(() => Alert.alert('Pedido', 'Não foi possível carregar o produto'));
        }
    }, [id])

    return (
        <Container behavior={Platform.OS === "ios" ? 'padding' : undefined }>
            <Content>
                <Header>
                    <ButtonBack
                        onPress={() => goBack()}
                        style={{ marginBottom: 108 }}
                    />
                </Header>
                <Photo source={{ uri: pizza.photo_url }}/>
                <Form>
                    <Title>{pizza.name}</Title>
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
                            <Input keyboardType="numeric"  onChangeText={setTableNumber}/>
                        </InputGroup>

                        <InputGroup>
                            <Label>Quantidade</Label>
                            <Input keyboardType="numeric" 
                                value={String(quantity)} 
                                onChangeText={(value) => setQuantity(Number(value))}
                            />
                        </InputGroup>
                    </FormRow>
                    
                    <Price>Volor de R$ {amount}</Price>

                    <Button 
                        title="Confirmar pedido"
                        onPress={handleOrder}
                        isLoading={sendingOrder}
                    />
                    <View />
                </Form>
            </Content>
        </Container>
    )
}