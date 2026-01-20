import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


export default function ProtectedRoutes({children,alloewdRole}){
    const {token,role}=useSelector((state)=>state.auth)
    if(!token) return <Navigate to='/login' replace />
    if(alloewdRole && role!==alloewdRole) return <Navigate to='/unauthorized' replace />
    return children;
}