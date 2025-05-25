import { ApolloProvider } from '@apollo/client'
import client from '../config/apollo';
import '../App.css'
import 'antd/dist/reset.css'; // Estilos de Ant Design

const MyApp = ({ Component, pageProps}) => {

    console.log('Desde app.js')
    return(
      <ApolloProvider client={client}>
          <Component {...pageProps} />
      </ApolloProvider>
    )
}

export default MyApp;