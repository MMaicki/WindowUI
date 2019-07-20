import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { styled as MUIstyled } from '@material-ui/styles'
import Container from '@material-ui/core/Container'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'

const Post = (props) => {

    const [postContent, setPostContent] = useState()
    const postId = props.match.params.id

    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/photos?id=${postId}`)
            .then(res => {
                setPostContent(res.data[0])
                capitalizeFirstLetter(res.data[0].title)
            })
    }, [postId])

    const capitalizeFirstLetter = (value) => {
        let spreadArr = [...value]
        let firstLetter = spreadArr[0]

        spreadArr[0] = firstLetter.toUpperCase()

        return spreadArr.join('')
    }

    return (
        <StyledContainer>
            <Typography variant={'h2'}>
                <FontAwesomeIcon
                    icon={faArrowCircleRight}
                    style={{ color: '#f0aff0' }}
                />
                    {postContent ? (
                    ` ${capitalizeFirstLetter(postContent.title)}`
                    ) : (
                        null
                    )}
            </Typography>
            <Grid container item xs={12} sm={12} alignItems={'center'} justify={'center'}>
                {postContent ? (
                    <img
                        alt={postContent.title}
                        src={`https://picsum.photos/id/${postId}/200/300`}
                        style={{ width: '400px', height: '600px', marginTop: '50px' }}
                    />
                ) : (
                    null
                )}
            </Grid>
        </StyledContainer>
    )
}

const StyledContainer = MUIstyled(Container)({
    paddingTop: '100px'
})

export default Post
