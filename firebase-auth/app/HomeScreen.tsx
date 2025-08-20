import { Button, Text, Alert, TextInput, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { auth } from "../services/firebaseConfig";
import { deleteUser } from "firebase/auth";
import ItemLoja from "../components/ItemLoja";

export default function HomeScreen(){
    const router = useRouter()

    const realizarLogoff = async()=>{
        await AsyncStorage.removeItem('@user')
        router.push('/')
    }

    const excluirConta = ()=>{
        Alert.alert("CONFIRMAR EXCLUSÃO","Tem certeza que deseja excluir? Esta ação não poderá ser desfeita.",
            [
                {text:'Cancelar', style:'cancel'},
                {text:'Excluir', style:'destructive',
                    onPress:async()=>{
                        try{
                            const user = auth.currentUser
                            if(user){
                                await deleteUser(user)//Deleta o user do firebase Auth
                                await AsyncStorage.removeItem('@user')
                                Alert.alert("Conta Excluída","Sua conta foi excluída com sucesso.")
                                router.replace('/')
                            }else{
                                Alert.alert("Erro","Nenhum usuário logado")
                            }
                        }catch(error){
                            console.log("Erro ao excluir conta", error)
                            Alert.alert("Erro","Não foi possível excluir a conta")
                        }
                    }
                }
            ],{
                cancelable:true
            }
        )
    }

    return(
        <SafeAreaView style={styles.container}>
            <Text>Seja bem-vindo - Você está Logado!!</Text>
            <Button title="Sair" onPress={realizarLogoff}></Button>
            <Button title="Excluir conta" color='red' onPress={excluirConta}></Button>
            <Button title="Alterar Senha" onPress={()=>router.push("AlterarSenhaScreen")}></Button>

            <ItemLoja/>
            <ItemLoja/>
            <ItemLoja/>

            <TextInput                 
                placeholder="Digite o nome do produto"
                style={styles.input}
                >
            </TextInput>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    input:{
        backgroundColor:'lightgray',
        width: '80%',
        alignSelf: 'center',
        marginTop: 10
    }
})