import React, {useState, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import axios from 'axios'

import Footer from '../Footer/footer'
import Header from '../Header/header'
import Content from '../Content/content'
import Weather from '../widgets/Weather/weather'
import Home from '../Home/home'
import Main from '../Main/main'
import Posts from '../Posts/posts'
import Post from '../Post/post'
import Document from '../Document/document'
import Routes from '../../routes'
import LayoutContext from '../Context/LayoutContext/layoutcontext'

import './layout.css'

const Layout = () => {

    const [showWeather, setShowWeather] = useState()
    const [lat, setLat] = useState()
    const [lon, setLon] = useState()
    const [region, setRegion] = useState(' Your location...')
    const [temp, setTemp] = useState('Waiting for temperature...')
    const [press, setPress] = useState('Waiting for preassure...')
    const [humid, setHumid] = useState('Waiting for humidity...')
    const [clouds, setClouds] = useState()
    const [maxTemp, setMaxTemp] = useState('Waiting for max temperature...')
    const cardMediaImageURL = `https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Poland_wojewodztwo_mazowieckie_zbiornik_niewiadoma_dolina.JPG/800px-Poland_wojewodztwo_mazowieckie_zbiornik_niewiadoma_dolina.JPG`

    useDocumentTitle(region, temp)

    useEffect(() => {

        const getPosition = () => {
            return new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject)
            })
        }

        if (!lat && !lon) {
            getPosition()
                .then((position) => {
                    const { coords } = position
                    const { latitude, longitude } = coords
                    setLat(latitude)
                    setLon(longitude)
                })
        }

        if (lat && lon) {
            axios.get(`https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=bdb482c8614b9ac69c8f291d8e686e43`)
                .then(res => {
                    const { data } = res
                    const { name, main, weather } = data
                    const { temp, pressure, humidity, temp_max } = main
                    setRegion(`${name}`)
                    setHumid(`Humidity: ${humidity}%`)
                    setPress(`Pressure: ${pressure} hPa`) // hard space between template and hPa
                    setClouds(weather[0])
                    setMaxTemp(`Max Temp: ${Math.round(temp_max - 273.15)}°C`)
                    setTemp(`${Math.round(temp - 273.15)}°C`)
                })
                .catch(err => console.log(err))
        }
    }, [lat, lon])

    const toggleWeather = (value) => {
        setShowWeather(value)
    }

    return(
        <LayoutContext.Provider value={42}>
            <Header />
            <Content>
                <Routes>
                    <Switch>
                        <Route exact path='/posts/:id' render={props => <Post {...props} isWeatherVisible={false} toggleWeather={toggleWeather} />} />
                        <Route exact path='/document' render={props => <Document {...props} isWeatherVisible={false} toggleWeather={toggleWeather} />} />
                        <Route exact path='/posts' render={props => <Posts {...props} isWeatherVisible={false} toggleWeather={toggleWeather} />} />
                        <Route exact path='/main' render={props => <Main {...props} isWeatherVisible={true} toggleWeather={toggleWeather} />} />
                        <Route exact path='/' render={props => <Home {...props} isWeatherVisible={true} toggleWeather={toggleWeather} />} />
                    </Switch>
                </Routes>
                {showWeather ? (
                    <Weather data={{ region, temp, press, humid, clouds, maxTemp, cardMediaImageURL }} />
                ) : (
                        null
                    )}
            </Content>
            <Footer />
        </LayoutContext.Provider>
    )
}

const useDocumentTitle = (title, temp) => {
    useEffect(() => {
        document.title = `Marty | ${title} | ${temp}`
    }, [title, temp])
}

export default Layout