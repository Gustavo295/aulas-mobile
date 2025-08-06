import { View, Text, Image, FlatList, StyleSheet, ActivityIndicator, Button } from 'react-native';
import { useQuery, useMutation } from '@tanstack/react-query';//Hook para fazer queries
import { fetchPosts, createUser} from './api/posts'


export default function App() {

    const { data, isLoading, isError,error, isFetching, refetch} = useQuery({
        queryKey: ['posts'], //Chave da query
        queryFn: fetchPosts //Função que busca os dados
    });

    const mutation = useMutation({
        mutationFn:createUser,
        onSuccess:()=>{
            refetch();
        }
    })

    const newUser = {
        name:"Fernando",
        avatar: "https://www.google.com.br"
    }

    //Exibe um carregando enquanto os dados não chegam
    if (isLoading) {
        return <ActivityIndicator size="large" style={styles.center} />
    }

    //Exibe um erro caso ocorra
    if (isError) {
        return (
            <View>
                <Text style={styles.center}>Erro ao carregar os dados</Text>
                <Text style={styles.center}>{error.message}</Text>
            </View>
        )
    }

    return(
        <View>
            <Button
                title={mutation.isPending?'Criando usuário':'Criar novo usuário'}            
                onPress={()=>mutation.mutate(newUser)}
                disabled={mutation.isPending}
            />
            <FlatList
                data={data}
                refreshing={isFetching}
                onRefresh={refetch}
                renderItem={({item})=>(
                    <View style={styles.item}>
                        <Text style={styles.title}>{item.name}</Text>
                        <Image source={{uri:item.avatar}} width={200} height={200}></Image>
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    center:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    item:{
        padding:16,
        borderBottomWidth:1,
        borderBottomColor:'#ccc',
    },
    title:{
        fontWeight:'bold',
        marginBottom:4,
    },
})