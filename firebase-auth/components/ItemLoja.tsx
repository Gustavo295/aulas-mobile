import { StyleSheet, View, Text, Pressable } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

export default function ItemLoja(){
    return(
    <View style={styles.container}>
        <Pressable>
            <AntDesign name="checkcircleo" color='darkgreen' size={24}/>
        </Pressable>
        <Text style={styles.title}>Mouse Gamer</Text>
        <Pressable>
            <MaterialIcons name='delete' color='red' size={24}/>
        </Pressable>
    </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        backgroundColor:'lightgray',
        justifyContent:'space-between',
        padding: 10,
        alignItems: 'center',
        alignSelf: 'center',
        width:'90%',
        borderRadius: 10,
        marginTop: 10
    },
    title:{
        flex:1,
        marginLeft: 10,
        fontSize: 17,
        fontWeight: 'bold'
    }
})
