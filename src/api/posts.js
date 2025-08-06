import axios from "axios";

//Função que será usada pelo Tanstack Query
export const fetchPosts = async () =>{
    const response = await axios.get("https://689343aac49d24bce86a10f4.mockapi.io/users");
    return response.data;//Retorna os dados
}

export const createUser = async(newUser) =>{
    const response = await axios.post("https://689343aac49d24bce86a10f4.mockapi.io/users", newUser);
    return response.data;
}