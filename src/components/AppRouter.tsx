import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import {authRoutes, publicRoutes, adminRoute} from '../routes'
import {SHOP_ROUTE} from '../utils/consts'
const AppRouter = () => {
    const isAuth = useSelector((state: RootState) => state.user.isAuth);
    const user = useSelector((state: RootState) => state.user.user)
    return(
    <Routes>
        {isAuth && user?.role === "ADMIN" && adminRoute.map(({path, Component}) => 
            <Route key={path} path={path} element={<Component/>}/>
        )}
        {isAuth && authRoutes.map(({path, Component}) => 
            <Route key={path} path={path} element={<Component/>}/>
        )}
        {publicRoutes.map(({path, Component}) => 
            <Route key={path} path={path} element={<Component/>}/>
        )}
        <Route path="*" element={<Navigate to={SHOP_ROUTE} replace />} />
    </Routes>
    )
};
export default AppRouter;
