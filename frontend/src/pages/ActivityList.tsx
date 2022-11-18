import { Stack } from '@mui/material'
import React, {useState, useEffect} from 'react'
import ActivityListItem from '../components/ActivityListItem'
import { ActivityData } from './ActivityPage'

const ActivityList = () => {
    
    let [activities, setActivities] = useState([])

    useEffect(() => {
        getActivities()
    }, [])

    let getActivities = async () => {
        let response = await fetch('/api/activ/')
        let data = await response.json()
        console.log(data)
        setActivities(data)
    }

    console.log('hellooooo wroooonnngg')

    return (
        <div>
            <div className='notes-list'>
                <Stack>
                {activities.map((activity: ActivityData, index) => (
                    <ActivityListItem key={index} activity={activity}/>
                ))}
                </Stack>
                
            </div>
        </div>
    ); 
}

export default ActivityList