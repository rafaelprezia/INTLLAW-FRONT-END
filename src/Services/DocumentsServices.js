import axios from "axios";

const documentsAPI = axios.create({baseURL: "http://localhost:3000/media/legal-cases"})

async function getDocuments(query, title, date, parties, category, tags) {
    if (query) {
        const response = await documentsAPI.get('/basicSearch', { params: { query } })
        return response.data
    }

    const response = await documentsAPI.get('/advancedSearch', {
        params: {
            title,
            date,
            parties,
            category,
            tags
        }
    })
    return response.data
}

async function getDocumentsByID(id) {
    const response = await documentsAPI.get(`/${id}`)
    return response.data
}

async function postDocuments(documentData) {
    const response = await documentsAPI.post('', documentData);
    return response.data;
  }

async function patchDocuments(id) {
    const response = await documentsAPI.patch(`/${id}`)
    return response.data
}

async function deleteDocuments(id) {
    const response = await documentsAPI.delete(`/${id}`)
    return response.data
}

export {
    getDocuments,
    getDocumentsByID,
    postDocuments,
    patchDocuments,
    deleteDocuments
}
