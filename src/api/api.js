import { BASE_API_URL, AUTH_KEY } from './api.constants';

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
        headers: {
            'authKey': localStorage.getItem(AUTH_KEY)
        }
    });

    return {
        status: response.status
    }
};

const setUserDataApi = async (data)=> {
    const response = await fetch(`${BASE_API_URL}/setUserData`, {
        method: 'PUT',
        headers: {
            'authKey': localStorage.getItem(AUTH_KEY)
        },
        body: JSON.stringify(data)
    });

    return {
        status: response.status
    }
}

const saveDishApi = async (data)=> {
    const response = await fetch(`${BASE_API_URL}/diary`, {
        method: 'PUT',
        headers: {
            'authKey': localStorage.getItem(AUTH_KEY)
        },
        body: JSON.stringify(data)
    });

    return {
        status: response.status,
        responseJSON: await response.json()
    }
}

const deleteDishApi = async (id, date)=> {
    const response = await fetch(`${BASE_API_URL}/diary/${id}`, {
        method: 'DELETE',
        headers: {
            'authKey': localStorage.getItem(AUTH_KEY),
            'date': date
        }
    })

    return {
        status: response.status
    }
}

const getUserDataApi = async ()=> {
    const response = await fetch(`${BASE_API_URL}/getUserData`, {
        method: 'GET',
        headers: {
            'authKey': localStorage.getItem(AUTH_KEY)
        }
    });

    return {
        status: response.status,
        responseJSON: await response.json()
    }
};

const getDishesApi = async (data)=> {
    const response = await fetch(`${BASE_API_URL}/diary`, {
        method: 'POST',
        headers: {
            'authKey': localStorage.getItem(AUTH_KEY)
        },
        body: JSON.stringify(data)
    });

    return {
        status: response.status,
        responseJSON: await response.json()
    }
};

const getRecipeApi = async (recipeId)=> {
    const response = await fetch(`${BASE_API_URL}/recipe/${recipeId}`, {
        method: 'GET',
        headers: {
            'authKey': localStorage.getItem(AUTH_KEY)
        }
    });

    return {
        status: response.status,
        responseJSON: await response.json()
    }
}

export {
    setUserApi,
    getUserApi,
    setUserDataApi,
    saveDishApi,
    deleteDishApi,
    getUserDataApi,
    getDishesApi,
    getRecipeApi
}