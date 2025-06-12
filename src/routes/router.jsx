import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import MainLayout from "../Layout/MainLayout";
import Login from "../pages/Login";
import ErrorPage from "../pages/ErrorPage";
import LoadingFallback from "../components/shared/LoadingFallback";
import SingUp from "../pages/SingUp";
import Marathons from "../pages/Marathons";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import AddMarathon from "../pages/DashboardPages/AddMarathon";
import MyMarathonList from "../pages/DashboardPages/MyMarathonList";
import MyApplyList from "../pages/DashboardPages/MyApplyList";


const Router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                index: true,
                path: '/',
                Component: Home,
                hydrateFallbackElement: <LoadingFallback />,
            },
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/singup',
                element: <SingUp />,
            },
            {
                path: '/marathons',
                loader: () => fetch(`${import.meta.env.VITE_API_URL}/marathons`),
                element: <Marathons />,
                hydrateFallbackElement: <LoadingFallback />,
            },
            {
                path: '/dashboard',
                element: <PrivateRoute><Dashboard /></PrivateRoute>,
                children: [
                    {
                        path: 'add-marathon',
                        element: <AddMarathon />
                    },
                    {
                        path: 'my-marathons',
                        element: <MyMarathonList />
                    },
                    {
                        path: 'my-applications',
                        element: <MyApplyList />
                    },
                ]
            },
            {
                path: '/profile',
                element: <PrivateRoute><Profile /></PrivateRoute>,
            },
        ]
    },
]);

export default Router