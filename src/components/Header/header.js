import React from 'react'
import {Link} from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { styled } from '@material-ui/styles'

const StyledButton = styled(Button)({
    margin: '0 5px'
})

const Header = () => {
    return (
        <AppBar position="fixed" color="default">
            <Container>
                <Toolbar>
                    <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="flex-start"
                    >
                        <Link to='/'>
                            <StyledButton variant="text" color='primary'>
                                Home
                            </StyledButton>
                        </Link>
                        <Link to='/main'>
                            <StyledButton variant="text" color='primary'>
                                Search For Info
                            </StyledButton>
                        </Link>
                        <Link to='/posts'>
                            <StyledButton variant="text" color='primary'>
                                Posts
                            </StyledButton>
                        </Link>
                        <Link to='/document'>
                            <StyledButton variant="text" color='primary'>
                                Document
                            </StyledButton>
                        </Link>
                    </Grid>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header
