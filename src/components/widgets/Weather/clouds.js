import React from 'react'
import Typography from '@material-ui/core/Typography'

const Clouds = (props) => {
    const { clouds } = props
    return (
        <React.Fragment>
            <Typography variant={'subtitle2'}>
                {clouds.description.toUpperCase()}
            </Typography>
        </React.Fragment>
    )
}

export default Clouds
