import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import Layout from './components/Layout/layout'


const App = () => {
    return(
        <BrowserRouter>
                <Layout />
        </BrowserRouter>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));

