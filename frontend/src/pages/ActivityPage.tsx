import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';

export interface ActivityData {
    id: number;
    name: string;
    description: string;
    type: string;
} 

// props: ActivityDisplayProps

const ActivityDisplay = () => {

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

    return (
        <div>
            <h3>Name: {activity?.name}</h3>
            <p>Type of sport: {activity?.type}</p>
            <p>Description: {activity?.description}</p>
        </div>
    )
}


export default ActivityDisplay 