import React, { useContext } from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'

import LayoutContext from '../Context/LayoutContext/layoutcontext'

const StyledFooter = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    color: #1f1f1f;
    padding: 10px 20px;
    box-sizing: border-box;
    background-color: #1f1f1f;
    color: #fefefe;
    text-align: center
`

const Footer = () => {
    const numbers  = useContext(LayoutContext)

    return (
        <React.Fragment>
            <Container>
                <StyledFooter>
                    <Typography variant={'caption'} paragraph={true} display={'block'}>
                        Marcin Maicki {new Date().getFullYear()} | Context Value: {numbers}
                    </Typography>
                </StyledFooter>
            </Container>
        </React.Fragment>
    )
}

export default Footer
