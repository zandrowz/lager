import { View, Text, TextInput, Button, Pressable } from "react-native";
import { Typography, Forms, Base } from '../../styles';
import { showMessage } from 'react-native-flash-message';

export default function AuthFields({ auth, setAuth, title, submit, navigation}) {

    function validateEmail(text: string) {
        const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!text.match(pattern)) {
            showMessage({
                message: "Ogiltig email",
                description: "Emailadressen måste uppfylla typ aaa@aa.aa",
                type: "warning"
            })
        }
    }

    function validatePassword(text: string) {
        const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!\.-]).{4,}$/
        // ^               : Start
        // (?=.*\d)        : Digits
        // (?=.* [a-z])    : lower Letters
        // (?=.* [A-Z])    : upper Letters
        // (?=.* [!\.-])   : Special charachters
        // (?=.{4,})       : Length
        // $
        if (!text.match(pattern)) {
            showMessage({
                message: "Ogiltigt lösenord",
                description: "Lösenordet måste innehålla minst 4 tecken, små och stora bokstäver, siffror och ett specialtecken(!.-?)",
                type: "warning"
            })
        }
    }
    return (
        <View style={Base.base}>
            <Text style={Typography.header2}>{title}</Text>
            <Text style={Typography.label}>E-post</Text>
            <TextInput
                style={Forms.input}
                onChangeText={(content: string) => {
                    validateEmail(content);
                    setAuth({ ...auth, email: content })
                }}
                value={auth?.email}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                testID="email-field"
            />
            <Text style={Typography.label}>Lösenord</Text>
            <TextInput
                style={Forms.input}
                onChangeText={(content: string) => {
                    validatePassword(content)
                    setAuth({ ...auth, password: content })
                }}
                value={auth?.password}
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
                testID="password-field"
            />
            {/* <Button
                title={title}
                color="#e26b8b"
                onPress={() => {
                    submit();
                }}
            /> */}

            <Pressable style={Base.button} onPress={() => {
                    submit();
                }}>
                <Text style={Typography.buttonText}>{title}</Text>
            </Pressable>

            {title === "Logga in" &&
                // <Button
                //     title="Registrera istället"
                //     color="#e26b8b"
                //     onPress={() => {
                //         navigation.navigate("Register");
                //     }}
                // />
                <Pressable style={Base.button} onPress={() => {
                    navigation.navigate("Register");
                }}>
                <Text style={Typography.buttonText}>Registrera istället</Text>
                </Pressable>
            }
        </View>
    );
};