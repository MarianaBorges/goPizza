import React from "react";

import { Input } from "@components/Input";
import { Button } from "@components/Button";

import { Container } from "./styles";

export function SignIn(){
    return (
        <Container>

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

            <Button
                title="Entrar"
                type="secundary"
            />

        </Container>
    )
}