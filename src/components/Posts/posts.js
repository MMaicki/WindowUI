import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroller'
import axios from 'axios'

import Typography from '@material-ui/core/Typography'
import { CardMedia } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader'
import Grid from '@material-ui/core/Grid'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import Card from '@material-ui/core/Card'
import CircularProgress from '@material-ui/core/CircularProgress'
import { styled as MUIstyled } from '@material-ui/styles'
import Container from '@material-ui/core/Container'
import styled from 'styled-components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'

const Posts = (props) => {

    const [posts, setPosts] = useState()
    const [scrollParent, setScrollParent] = useState()

    const { isWeatherVisible, toggleWeather } = props
    toggleWeather(isWeatherVisible)

    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/photos?albumId=1`)
            .then(res => {
                setPosts(res.data)
            })
    }, [])

    const loadAlbumPhotos = (id) => {
        axios.get(`https://jsonplaceholder.typicode.com/photos?albumId=${id}`)
            .then(res => {
                setPosts(posts.concat(res.data))
            })
    }

    const handlePosts = (value) => {
        return(
            value.map((item, i) => {
                return (
                    <StyledGridListTile key={item.id}>
                        <Link to={`/posts/${item.id}`}>
                            <Card>
                                <CardHeader
                                    title={item.title}
                                />
                                <CardMedia
                                    // image={item.thumbnailUrl}
                                    // src={item.thumbnailUrl}
                                    image={`https://picsum.photos/id/${item.id}/200/480`}
                                    src={`https://picsum.photos/id/${item.id}/200/480`}
                                    component={StyledInnerCardMedia}
                                />
                            </Card>
                        </Link>
                    </StyledGridListTile>
                )
            })
        )
    }

    return (
        <React.Fragment>
            <StyledContainer>
                <Typography variant={'h2'}>
                    <FontAwesomeIcon icon={faArrowCircleRight} style={{ color: '#f0aff0' }} /> Latest Posts
                </Typography>
            </StyledContainer>
            {posts ? (
                <div
                    style={{ height: '700px', overflowX: 'hidden', overflowY: 'auto', marginTop: '50px'}}
                    ref={(ref) => setScrollParent(ref)}
                >
                    <InfiniteScroll
                        pageStart={1}
                        loadMore={loadAlbumPhotos}
                        hasMore={true}
                        loader={
                            <Grid container item alignItems={'center'} justify={'center'} xs={12} sm={12}>
                                <CircularProgress />
                            </Grid>
                        }
                        useWindow={false}
                        threshold={250}
                        getScrollParent={() => scrollParent}
                    >
                        <StyledGridList
                            cols={4}
                            cellHeight={'auto'}
                            spacing={8}
                        >
                            {handlePosts(posts)}
                        </StyledGridList>
                    </InfiniteScroll>
                </div>
            ) : (
                null
            )}
        </React.Fragment>
    )
}

const StyledInnerCardMedia = styled.div`
    width: 100%;
    height: 480px;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
`
const StyledContainer = MUIstyled(Container)({
    paddingTop: '100px'
})
const StyledGridList = MUIstyled(GridList)({
    padding: '8px'
})
const StyledGridListTile = MUIstyled(GridListTile)({
    padding: '5px'
})

export default Posts
