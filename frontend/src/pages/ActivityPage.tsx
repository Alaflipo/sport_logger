import { Button } from '@mui/material';
import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom';

export interface ActivityData {
    id: number;
    name: string;
    description: string;
    type: string;
} 

// props: ActivityDisplayProps

const ActivityPage = () => {

    let { activityId } = useParams() // to get params out 
    let [activity, setActivity] = useState<ActivityData | null>(null)

    useEffect(() => {
        getActivity();
    }, [activityId])

    let getActivity = async() => {
        let repsonse = await fetch(`/api/activ/${activityId}`); 
        let data: ActivityData = await repsonse.json();  
        setActivity(data);
    }

    console.log("hellloooooooooo")

    return (
        <div>
            <h3>Name: {activity?.name}</h3>
            <p>Type of sport: {activity?.type}</p>
            <p>Description: {activity?.description}</p>
            <Link to={`/activ`} style={{textDecoration: 'none'}}>  
                <Button variant='contained'>
                    Go back
                </Button>
            </Link>
        </div>
    )
}


export default ActivityPage 