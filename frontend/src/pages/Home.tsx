import React from 'react'
import { Link } from 'react-router-dom';

const HomeScreen = () => {

    return (
        <div>
            <p>Welcome user there are a few things you can do here: </p>
            <h3>View the current list of activities here: </h3>
            <Link to={`/activ/`}>
                <p>activity list</p>
            </Link>
            <h3>View the current list of users here: </h3>
            <Link to={`/users/`}>
                <p>user list</p>
            </Link>
            
        </div>
    );
}

export default HomeScreen; 