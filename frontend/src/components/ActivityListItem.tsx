import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { ActivityData } from '../pages/ActivityPage'

interface ActivityListItemProps {
    activity: ActivityData
}

const ActivityListItem = (props: ActivityListItemProps) => {


    return (
        <Link to={`/activ/${props.activity.id}`}>
            <h3>{props.activity.name} ({props.activity.type})</h3>
        </Link>
    )
}


export default ActivityListItem 