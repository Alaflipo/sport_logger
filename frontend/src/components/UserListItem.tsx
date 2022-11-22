import React from "react";
import { Link } from "react-router-dom";
import { UserData } from "../pages/UserList";

interface UserDataItemProps {
    user: UserData;
}

const UserListItem = (props: UserDataItemProps) => {
    return (
        <Link to={`/users/${props.user.id}`}>
            <h3>{props.user.name}</h3>
        </Link>
    );
};

export default UserListItem;
