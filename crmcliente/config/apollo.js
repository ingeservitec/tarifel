import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import fetch from 'node-fetch'
import { setContext } from 'apollo-link-context';

console.log('servidor de API:', process.env.NEXT_PUBLIC_API_URL);

const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_API_URL,
    fetch   
});

const authLink = setContext((_, { headers }) => {
    // Leer el storage almacenado
    const token = localStorage.getItem('token');
    // console.log(token);
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
            // authorization: token ? `Bearer ${token}` : ''
        }
    }
});

const client = new ApolloClient({
    connectToDevTools: true,
    cache: new InMemoryCache(),
    link: authLink.concat( httpLink )
});

export default client;



