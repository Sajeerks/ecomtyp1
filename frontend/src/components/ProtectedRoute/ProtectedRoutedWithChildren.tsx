
import {useSelector} from "react-redux"
import {Navigate, useLocation} from "react-router-dom"
import { RootState } from '../../redux/store';

interface ProtectedRoutedWithChildrenType{
  children:string | JSX.Element| JSX.Element[], 
}

const ProtectedRoutedWithChildren = ({children}:ProtectedRoutedWithChildrenType) => {
    // console.log("children==", children);
    // console.log("children= typeof=", typeof children);

    const {user} = useSelector((state:RootState) => state.user);
    let location = useLocation();
    // console.log({location});
    // console.log("user in ProtectedRoutedWithChildren==",user);

    if(!user) {
        return <Navigate to="/login" state={{ from: location}} replace />
    }
 return children

};

export default ProtectedRoutedWithChildren