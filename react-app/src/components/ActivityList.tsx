import React, {useState, useEffect} from 'react'

const ActivityList = () => {
    
    let [activities, setActivities] = useState([])

    useEffect(() => {
        getActivities()
    }, [])

    let getActivities = async () => {
        let response = await fetch('http://127.0.0.1:8000/api/activ/')
        let data = await response.json()
        console.log(data)
        setActivities(data)
    }

    return (
        <div>
            test 
        </div>
    ); 
}

export default ActivityList