import { createContext, useEffect, useContext, useReducer, useCallback } from "react";

const CitiesContext = createContext();

const connectionString = 'http://localhost:9000';

const initialState = {
    isLoading: false,
    cities: [],
    currentCity: {},
    error: ''
}

const reducer = (state, action) =>
{
    switch (action.type)
    {
        case 'loading':
            return {
                ...state,
                isLoading: true
            }
            break;
        case 'cities/loaded':
            return {
                ...state,
                isLoading: false,
                cities: action.payload
            }
            break;
        case 'city/current':
            return {
                ...state,
                isLoading: false,
                currentCity: action.payload
            }
            break;
        case 'city/post':
            return {
                ...state,
                isLoading: false,
                cities: [...state.cities, action.payload]
            }
            break;
        case 'city/delete':
            return {
                ...state,
                isLoading: false,
                cities: state.cities.filter(city => city.id !== action.payload)
            }
            break;
        case 'rejected':
            return {
                ...state,
                error: action.payload
            }

        default: throw new Error(state.error)
            break;
    }
}

const CitiesProvider = ({ children }) =>
{
    const [{ isLoading, cities, currentCity, error }, dispatch] = useReducer(reducer, initialState);


    useEffect(() =>
    {
        const fetching = async () =>
        {
            dispatch({ type: 'loading' });
            try
            {
                const res = await fetch(`${connectionString}/cities`);
                const data = await res.json();
                dispatch({ type: 'cities/loaded', payload: data });
            } catch
            {
                dispatch({ type: 'rejected', payload: 'There was an error loading cities' })
            }

        }
        fetching();
    }, [])

    const getCity = useCallback(async (id) =>
    {   
        dispatch({ type: 'loading' })
        try
        {
            const res = await fetch(`${connectionString}/cities/${id}`);
            const data = await res.json();
            dispatch({ type: 'city/current', payload: data })
        } catch
        {
            dispatch({ type: 'rejected', payload: 'There was an error loading current city' })
        }
    }, [currentCity.id]
    )

    const postCity = async (newCity) =>
    {
        dispatch({ type: 'loading' })

        try
        {
            const res = await fetch(`${connectionString}/cities`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newCity)
            });
            const data = await res.json();
            dispatch({ type: 'city/post', payload: data })

        } catch
        {
            dispatch({ type: 'rejected', payload: 'There was an error post new city' })
        }
    }
    const deleteCity = async (id) =>
    {
        dispatch({ type: 'loading' })

        try
        {
            await fetch(`${connectionString}/cities/${id}`, {
                method: 'DELETE'
            });
            dispatch({ type: 'city/post', payload: id })

        } catch
        {
            dispatch({ type: 'rejected', payload: 'There was an error delete a city' })

        }
    }


    return (
        <CitiesContext.Provider value={{
            cities,
            isLoading,
            currentCity,
            error,
            getCity,
            postCity,
            deleteCity
        }}>
            {children}
        </CitiesContext.Provider>
    )

}

const useCities = () =>
{
    const context = useContext(CitiesContext);
    if (context === undefined) throw new Error('Cities bega');
    return context;
}


export { CitiesProvider, useCities }