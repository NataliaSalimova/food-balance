import { BASE_API_URL, AUTH_KEY } from './api.constants';

const headers = {
    AUTH_KEY: localStorage.getItem(AUTH_KEY)
}

const setUserApi = async (url, data)=> {
    const response = await fetch(`${BASE_API_URL}/${url}`, {
        method: 'POST',
        body: JSON.stringify(data),
    });

    return {
        status: response.status,
        responseJSON: await response.json()
    }
}

const getUserApi = async ()=> {
    const response = await fetch(`${BASE_API_URL}/getUser`, {
        method: 'GET',
        headers
    });

    return {
        status: response.status
    }
};

const setUserDataApi = async (data)=> {
    const response = await fetch(`${BASE_API_URL}/setUserData`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(data)
    });

    return {
        status: response.status
    }
}

const saveDishApi = async (data)=> {
    const response = await fetch(`${BASE_API_URL}/diary}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(data)
    });

    return {
        status: response.status,
        responseJSON: await response.json()
    }
}

const deleteDishApi = async (id)=> {
    const response = await fetch(`${BASE_API_URL}/diary/${id}`, {
        method: 'DELETE',
        headers: {
            'authKey': localStorage.getItem(AUTH_KEY),
            'date': new Date().toISOString()
        }
    })

    return {
        status: response.status
    }
}

const getUserDataApi = async ()=> {
    const response = await fetch(`${BASE_API_URL}/getUserData`, {
        method: 'GET',
        headers
    });

    return {
        status: response.status,
        responseJSON: await response.json()
    }
};

const getDishesApi = async ()=> {
    const response = await fetch(`${BASE_API_URL}/diary`, {
        method: 'GET',
        headers
    });

    return {
        status: response.status,
        responseJSON: await response.json()
    }
};

export {
    setUserApi,
    getUserApi,
    setUserDataApi,
    saveDishApi,
    deleteDishApi,
    getUserDataApi,
    getDishesApi
}