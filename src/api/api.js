const baseApi = 'http://194.147.33.39';

const setUserApi = async (url, data)=> {
    const response = await fetch(`${baseApi}/${url}`, {
        method: 'POST',
        body: JSON.stringify(data),
    });

    return {
        status: response.status,
        responseJSON: await response.json()
    }
}

const getUserApi = async ()=> {
    const response = await fetch(`${baseApi}/getUser`, {
        method: 'GET',
        headers: {
            'authKey': localStorage.getItem('authKey')
        }
    });

    return {
        status: response.status
    }
};

const setUserDataApi = async (data)=> {
    const response = await fetch(`${baseApi}/setUserData`, {
        method: 'PUT',
        headers: {
            'authKey': localStorage.getItem('authKey')
        },
        body: JSON.stringify(data)
    });

    return {
        status: response.status
    }
}

const saveDishApi = async (data)=> {
    const response = await fetch(`${baseApi}/diary}`, {
        method: 'PUT',
        headers: {
            'authKey': localStorage.getItem('authKey')
        },
        body: JSON.stringify(data)
    });

    return {
        status: response.status,
        responseJSON: await response.json()
    }
}

const deleteDishApi = async (id)=> {
    const response = await fetch(`${baseApi}/diary/${id}`, {
        method: 'DELETE',
        headers: {
            'authKey': localStorage.getItem('authKey'),
            'date': new Date().toISOString()
        }
    })

    return {
        status: response.status
    }
}

const getUserDataApi = async ()=> {
    const response = await fetch(`${baseApi}/getUserData`, {
        method: 'GET',
        headers: {
            'authKey': localStorage.getItem('authKey')
        }
    });

    return {
        status: response.status,
        responseJSON: await response.json()
    }
};

const getDishesApi = async ()=> {
    const response = await fetch(`${baseApi}/diary`, {
        method: 'GET',
        headers: {
            'authKey': localStorage.getItem('authKey')
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