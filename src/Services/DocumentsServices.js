import axios from "axios";

const documentsAPI = axios.create({baseURL: "http://localhost:8000/"})

async function getDocuments(query) {
    const response = await documentsAPI.get(`documents/${query}`)
    return response.data
}

async function getDocumentsByID(id) {
    const response = await documentsAPI.get(`document/${id}`)
    return response.data
}

async function createDocument(documentData) {
    try {
        const response = await axios.post('http://localhost:8000/documents', documentData);
        console.log('Document created: ', response.data);
    } catch (error) {
        console.error('Error: ', error);
    }
}

export {
    getDocuments,
    getDocumentsByID,
    createDocument
}