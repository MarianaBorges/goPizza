import React, { useState } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { useAuth } from "@hooks/auth";

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
    const {signIn, forgotPassword, isLogging} = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSignIn(){
        signIn(email,password);
    }

    function handleForgotPassword(){
        forgotPassword(email);
    }
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
                        onChangeText={setEmail}
                    />

                    <Input 
                        placeholder="Senha"
                        type="secundary"
                        secureTextEntry
                        onChangeText={setPassword}
                    />

                    <ForgotPasswordButton onPress={handleForgotPassword}>
                        <ForgotPasswordLabel>Esqueci minha senha</ForgotPasswordLabel>
                    </ForgotPasswordButton>

                    <Button
                        title="Entrar"
                        type="secundary"
                        onPress={handleSignIn}
                        isLoading={isLogging}
                    />

                </Content>
            </KeyboardAvoidingView>
        </Container>
    )
}