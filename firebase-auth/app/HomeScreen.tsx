import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function HomeScreen(){
    const router = useRouter()

    const realizarLogoff = async()=>{
        await AsyncStorage.removeItem('@user')
        router.push('./')
    }

    return(
        <SafeAreaView>
            <Text>Seja bem-vindo - Você está Logado!!</Text>
            <Button title="Sair" onPress={realizarLogoff}></Button>
        </SafeAreaView>
    )
}