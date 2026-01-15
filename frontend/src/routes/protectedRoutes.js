

export default function protectedRoutes({children,role}){
    const {token,role:userRole}=useSelector((state)=>state.auth)
    if(!token) return <Navigate to='/' />
    if(role && userRole!==role) return <Navigate to='/'/>
    return children;
}