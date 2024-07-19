import React from "react";
import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setName, setUserName, setUserId, setHash } from "../../slices/user.slice";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
const Enter = () => {
    const user_id = useSelector((state) => state.user.userid)

    const query = useQuery();
    const name = query.get('name');
    const username = query.get('username');
    const userId = query.get('user_id')
    const navigate = query.get('navigate')
    const history = useHistory();
 
    if(name && username && userId && navigate) {
        const dispatch = useDispatch();
        dispatch(setName(name))
        dispatch(setUserName(username))
        dispatch(setUserId(userId))
    } else {
        history.push('/home');
    }
    useEffect(() => {
        switch(navigate){
            case 'coinflip':
                history.push('/coinflip');
                break;
            case 'slot':
                history.push('/slot');
                break;
                case 'profile':
                history.push('/profile');
                break;
            default:
                history.push('/home');
                break;
        }
    }, [user_id])
}

export default Enter;
