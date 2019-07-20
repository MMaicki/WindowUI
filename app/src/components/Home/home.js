import React, { useState, useEffect } from 'react'
import axios from 'axios'

import styled from 'styled-components'

import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Drawer from '@material-ui/core/Drawer'
import Container from '@material-ui/core/Container'
import CircularProgress from '@material-ui/core/CircularProgress'
import { styled as MUIstyled } from '@material-ui/styles'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'

const Home = (props) => {
    const headerText = 'Choose Country for further info'
    const [state, setState] = useState({
        left: false
    })
    const [countries, setCountries] = useState()
    const [selectedCountry, setSelectedCountry] = useState(null)
    const [countryData, setCountryData] = useState()
    const [showLoader, setShowLoader] = useState(false)

    const { isWeatherVisible, toggleWeather } = props
    toggleWeather(isWeatherVisible)

    useEffect(() => {
        axios.get(`https://cors-anywhere.herokuapp.com/http://api.worldbank.org/v2/country?format=json&per_page=304`)
            .then(res => setCountries(res.data[1]))
    }, [])

    useEffect(() => {
        let unmounted = false

        if (!unmounted && countries && selectedCountry){
            setShowLoader(true)
            axios.get(`https://cors-anywhere.herokuapp.com/https://restcountries.eu/rest/v2/name/${selectedCountry}`)
                .then(res => {
                    setShowLoader(false)
                    setCountryData(res.data[0])
                })
        }

        return () => {
            unmounted = true
        }
    }, [selectedCountry, countries])

    const toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return null
        }

        setState({ ...state, [side]: open })
    }

    const hideDrawer = () => {
        setState({ ...state, left: false })
    }

    const handleCountryChoice = value => e => {
        setSelectedCountry(value)
        hideDrawer()
    }

    const handleCountries = (value) => {
        return value.map((item, i) => {
            if (item.capitalCity) {
                return (
                    <StyledCountryItem
                        key={i}
                    >
                        <Button
                            onClick={handleCountryChoice(item.name)}
                        >
                            {item.name}
                        </Button>
                    </StyledCountryItem>
                )
            } else {
                return null
            }
        })
    }

    return (
        <StyledContainer>
            <Grid container spacing={3}>
                <Grid item xs={9} sm={9}>
                    <Typography
                        variant={'h2'}
                        style={{ marginBottom: '20px' }}
                    >
                        <FontAwesomeIcon
                            icon={faArrowCircleRight}
                            style={{ color: '#f0aff0' }}
                        />
                        {selectedCountry ? (
                            ` ${selectedCountry}`
                        ) : (
                            ` ${headerText}`
                        )}
                    </Typography>
                </Grid>
                <Grid item xs={1} sm={1}>
                    {showLoader ? (
                        <CircularProgress />
                    ) : (
                            null
                        )}
                </Grid>
                <Grid item xs={2} sm={2}>
                    {countryData ? (
                        <StyledCountryFlag
                            style={{ backgroundImage: `url('${countryData.flag}')` }}
                        />
                    ) : (
                        null
                    )}
                </Grid>
                <Grid container item xs={12} sm={12} alignItems={'center'}>
                    <Button
                        color={'primary'}
                        variant={'contained'}
                        onClick={toggleDrawer('left', true)}
                    >
                        Open Country List
                    </Button>
                </Grid>
                <Grid item xs={12} sx={12}>
                    {countryData ? (
                        <React.Fragment>
                            <Typography variant={'body1'}>
                                Domain: {countryData.topLevelDomain} ...More to Come ;)
                            </Typography>
                        </React.Fragment>
                    ) : (
                         null
                    )}
                </Grid>
            </Grid>
            <Drawer
                open={state.left}
                onClose={toggleDrawer('left', false)}
            >
                {countries ? (
                    handleCountries(countries)
                ) : (
                    null
                )}
            </Drawer>
        </StyledContainer>
    )
}

const StyledCountryItem = styled.div`
    padding: 5px;
    margin-top: 3px;
`

const StyledCountryFlag = styled.div`
    width: 100px;
    height: 80px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
`
const StyledContainer = MUIstyled(Container)({
    paddingTop: '100px'
})
export default Home
