import React, { useState } from 'react'
import axios from 'axios'
import Link from '@material-ui/core/Link'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import Divider from '@material-ui/core/Divider'
import Container from '@material-ui/core/Container'
import { styled as MUIstyled } from '@material-ui/styles'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'

import wiki from 'wikijs'

const Main = (props) => {
    const [searchValue, setSearchValue] = useState('What are we searching for?')
    const [wikiRes, setWikires] = useState(null)
    const [openSearchRes, setOpenSearchRes] = useState()
    const [searchLimit, setSearchLimit] = useState(3)

    const { isWeatherVisible, toggleWeather } = props
    toggleWeather(isWeatherVisible)

    const errorMessage = 'Article Not Found :('

    const handleSearchValue = (e) => {
        if(e.target.value){
            setSearchValue(e.target.value)
        } else {
            setSearchValue('What are we searching for?')
        }
    }

    const handleSearchLimit = (e) => {
        setSearchLimit(e.target.value)
    }

    const handleWikiRes = (res) => {
        if(res === errorMessage){
            return(
                <Typography variant={'subtitle1'}>
                    {errorMessage}
                </Typography>
            )
        }

        let resArr = []

        for (const key in res) {
            if (res.hasOwnProperty(key)) {
                const element = res[key]
                if(typeof element === 'string'){
                    resArr.push(`${key}:`, element)
                }
            }
        }

        return resArr.map((item, i) => {
            return(
                <React.Fragment key={i}>
                    <Typography
                        variant={'subtitle1'}
                    >
                        {item}
                    </Typography>
                    <Divider />
                </React.Fragment>
            )
        })
    }

    const handleOpenSearch = (value) => {
        return value.map((item, i) => {
            if(item.search('http') === -1){
                if(item !== ''){
                    return (
                        <React.Fragment key={i}>
                            <Typography
                                variant={'subtitle1'}
                            >
                                {item}
                            </Typography>
                            <Divider />
                        </React.Fragment>
                    )
                } else {
                    return null
                }
            } else {
                return (
                    <React.Fragment key={i}>
                        <Typography
                            variant={'subtitle1'}
                        >
                            <Link rel="noopener noreferrer" target="_blank" href={item}>
                                {item}
                            </Link>
                        </Typography>
                        <Divider/>
                    </React.Fragment>
                )
            }
        })
    }

    const getWikiResult = (value) => {
        wiki().page(value)
            .then(page => page.info())
            .then(res => setWikires(res))
            .catch(error => setWikires(errorMessage))

        axios.get(`https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=opensearch&search=${value}&limit=${searchLimit}&namespace=0&format=json`)
            .then(res => setOpenSearchRes(res.data))
    }

    return (
        <StyledContainer>
            <Typography variant={'h2'}>
                <FontAwesomeIcon icon={faArrowCircleRight } style={{color: '#f0aff0'}} /> {`${searchValue}`}
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <TextField
                        id="standard-search"
                        label="Search Wikipedia"
                        type="search"
                        margin="normal"
                        fullWidth
                        onChange={handleSearchValue}
                    />
                </Grid>
                <Grid item xs={2} sm={2}>
                    <TextField
                        id="standard-number"
                        label="Results Limit"
                        value={searchLimit}
                        onChange={handleSearchLimit}
                        type="number"
                        margin="normal"
                    />
                </Grid>
                <Grid container item xs={10} sm={10} alignItems={'center'}>
                    <Button
                        variant={'contained'}
                        color={'primary'}
                        onClick={() => getWikiResult(searchValue)}
                    >
                        Search
                    </Button>
                </Grid>
                <Grid item xs={2} sm={2}>
                    <Typography variant={'h6'}>
                        Articles
                    </Typography>
                </Grid>
                <Grid item xs={5} sm={5}>
                    <Typography variant={'h6'}>
                        External Links
                    </Typography>
                </Grid>
                <Grid item xs={3} sm={3}>
                    <Typography variant={'h6'}>
                        Article Brief
                    </Typography>
                </Grid>
                <Grid item xs={2} sm={2}>
                    <Typography variant={'h6'}>
                        Additional Info
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Divider/>
                </Grid>
                <Grid item xs={2} sm={2}>
                        {openSearchRes ? (
                            <StyledCard>
                                {handleOpenSearch(openSearchRes[1])}
                            </StyledCard>
                        ) : null}
                </Grid>
                <Grid item xs={5} sm={5}>
                    {openSearchRes ? (
                        <StyledCard>
                            {handleOpenSearch(openSearchRes[3])}
                        </StyledCard>
                    ) : null}
                </Grid>
                <Grid item xs={3} sm={3}>
                    {openSearchRes ? (
                        <StyledCard>
                            {handleOpenSearch(openSearchRes[2])}
                        </StyledCard>
                    ) : null}
                </Grid>
                <Grid item xs={2} sm={2}>
                    {wikiRes ? (
                        <StyledCard>
                            {handleWikiRes(wikiRes)}
                        </StyledCard>
                    ) : null}
                </Grid>
            </Grid>
        </StyledContainer>
    )
}

const StyledCard = MUIstyled(Card)({
    padding: '10px'
})
const StyledContainer = MUIstyled(Container)({
    paddingTop: '100px'
})

export default Main
