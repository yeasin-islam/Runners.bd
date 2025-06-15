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
import MarathonDetails from "../pages/MarathonDetails";
import MarathonRegistration from "../pages/MarathonRegistration";


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
                loader: () => fetch(`${import.meta.env.VITE_API_URL}/marathons-section-posts`),
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
                element: <PrivateRoute><Marathons /></PrivateRoute>,
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
            {
                path: '/marathon-details/:id',
                loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/marathons/${params.id}`),
                element: <PrivateRoute><MarathonDetails /></PrivateRoute>,
            },
            {
                path: '/marathon-registration/:id',
                element: <PrivateRoute><MarathonRegistration /></PrivateRoute>,
            },
        ]
    },
]);

export default Router