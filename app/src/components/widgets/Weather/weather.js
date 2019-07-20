import React from 'react'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Divider from '@material-ui/core/Divider'
import { styled as MUIstyled } from '@material-ui/styles'
import styled from 'styled-components'

import Clouds from './clouds'

const Weather = (props) => {

    const { data: { region, temp, press, humid, clouds, maxTemp, cardMediaImageURL }} = props

    return (
        <StyledCard>
            <CardHeader
                title={
                    <React.Fragment>
                        <Typography
                            variant={'subtitle1'}
                            align={'center'}
                            paragraph={true}
                        >
                            {region}
                        </Typography>
                        <Divider/>
                    </React.Fragment>
                }
            >
            </CardHeader>
            <CardContent>
                <Grid container spacing={3}>
                    <Grid item align={'left'} xs={6} sm={6}>
                        {clouds ? (
                            <Clouds
                                clouds={clouds}
                            />
                        ) : (
                            <Typography variant={'subtitle2'}>
                                Getting Clouds Info...
                            </Typography>
                        )}
                    </Grid>
                    <Grid item align={'left'} xs={6} sm={6}>
                        {clouds ? (
                            <StyledIcon alt={'Icon'} src={`http://openweathermap.org/img/w/${clouds.icon}.png`} />
                        ) : null}
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <Typography align="left" variant="subtitle2" paragraph={false}>
                            Temperature: {temp}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <Typography align="left" variant="subtitle2" paragraph={false}>
                            {press}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <Typography align="left" variant="subtitle2" paragraph={false}>
                            {humid}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <Typography align="left" variant="subtitle2" paragraph={false}>
                            {maxTemp}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
            <StyledCardMedia src={cardMediaImageURL} image={cardMediaImageURL}/>
        </StyledCard>
    )
}

const StyledCard = MUIstyled(Card)({
    maxWidth: '300px',
    position: 'fixed',
    top: '80px',
    right: '20px'
})

const StyledIcon = styled.img`
    position: relative;
    top: -10px;
`

const StyledCardMedia = MUIstyled(CardMedia)({
    minHeight: '200px'
})

export default Weather
