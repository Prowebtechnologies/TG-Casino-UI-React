import React from "react";
import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setName, setUserName, setUserId, setHash } from "../../slices/user.slice";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
const Enter = () => {
    const query = useQuery();
    const name = query.get('name');
    const username = query.get('username');
    const userId = query.get('user_id')
    const navigate = query.get('navigate')
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        console.log(name, username, userId, navigate)
        dispatch(setName(name))
        dispatch(setUserName(username))
        dispatch(setUserId(userId))
        switch(navigate){
            case 'coinflip':
                history.push('/coinflip');
                break;
            case 'profile':
                history.push('/profile');
                break;
            default:
                history.push('/home');
                break;
        }
    }, [])
}

export default Enter;
