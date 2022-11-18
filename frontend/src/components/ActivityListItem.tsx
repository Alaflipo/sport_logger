import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { ActivityData } from '../pages/ActivityPage'

// Styling
import CSS from 'csstype'
import { Box, Button, Divider, SxProps, Typography } from "@mui/material"
import { textAlign } from '@mui/system'


const ItemContainer: CSS.Properties = {
    // width: '300px', 
    // minHeight: '200px', 
    // margin: 'auto', 
    // boxSizing: 'border-box',
    // border: 'solid black', 
}

const CardStyling: SxProps = {
    backgroundColor: 'secondary.light', 
    maxWidth: '700px',
    margin: '10px auto', 
    borderRadius: 2, 
    padding: '10px', 
    border: '5px solid',
    borderColor: 'primary.main' , 
    align: 'center', 
    textAlign:'center'
}

const BodyStyling: SxProps = {
    width: '300px', 
    textAlign: 'left', 
    margin: '10px auto', 
}

const DividerStyling: SxProps = {
    maxWidth: '350px', 
    margin: '10px auto', 
    border: 1,
    borderColor: 'primary.main',  
}

interface ActivityListItemProps {
    activity: ActivityData
    
}

const ActivityListItem = (props: ActivityListItemProps) => {

    return (
        <div style={ItemContainer}>
            <Box sx={CardStyling}>
                <Typography variant='body1' sx={{fontSize: '200%'}}>{props.activity.name}</Typography>
                <Divider sx={DividerStyling}/>
                <Box sx={BodyStyling}>
                    <Typography variant='body1'>Sport type: {props.activity.type}</Typography>
                    <Typography variant='body1'>Description: {props.activity.description}</Typography>
                    
                    
                </Box>
                <Link to={`/activ/${props.activity.id}`} style={{textDecoration: 'none'}}>  
                    <Button variant='contained'>
                        edit
                    </Button>
                </Link>
            </Box>
        </div>
    )
}


export default ActivityListItem 