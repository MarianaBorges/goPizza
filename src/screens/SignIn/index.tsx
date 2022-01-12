import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";

import brandImag from "@assets/brand.png";

import { Input } from "@components/Input";
import { Button } from "@components/Button";

import { 
    Container, 
    Content, 
    Title, 
    Brand,
    ForgotPasswordButton,
    ForgotPasswordLabel 
} from "./styles";

export function SignIn(){
    return (
        <Container>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
               <Content> 

                   <Brand source={brandImag}/>

                   <Title>Login</Title>

                    <Input 
                        placeholder="E-mail"
                        type="secundary"
                        autoCorrect={false}
                        autoCapitalize="none"
                    />

                    <Input 
                        placeholder="Senha"
                        type="secundary"
                        secureTextEntry
                    />

                    <ForgotPasswordButton>
                        <ForgotPasswordLabel>Esqueci minha senha</ForgotPasswordLabel>
                    </ForgotPasswordButton>

                    <Button
                        title="Entrar"
                        type="secundary"
                    />

                </Content>
            </KeyboardAvoidingView>
        </Container>
    )
}