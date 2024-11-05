const BASE_API = 'http://194.147.33.39';
const AUTH_KEY = 'authKey';

const setUserApi = async (url, data)=> {
    const response = await fetch(`${BASE_API}/${url}`, {
        method: 'POST',
        body: JSON.stringify(data),
    });

    return {
        status: response.status,
        responseJSON: await response.json()
    }
}

const getUserApi = async ()=> {
    const response = await fetch(`${BASE_API}/getUser`, {
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
    const response = await fetch(`${BASE_API}/setUserData`, {
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
    const response = await fetch(`${BASE_API}/diary}`, {
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

const deleteDishApi = async (id)=> {
    const response = await fetch(`${BASE_API}/diary/${id}`, {
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
    const response = await fetch(`${BASE_API}/getUserData`, {
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

const getDishesApi = async ()=> {
    const response = await fetch(`${BASE_API}/diary`, {
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

export {
    setUserApi,
    getUserApi,
    setUserDataApi,
    saveDishApi,
    deleteDishApi,
    getUserDataApi,
    getDishesApi
}