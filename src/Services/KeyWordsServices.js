import axios from "axios";

const KeyWordsAPI = axios.create({baseURL: "http://localhost:8000/keywords"})

async function getKeyWords(word){
    const response = await KeyWordsAPI.get('', { params: { word } })
    return response.data
}

export default getKeyWords;