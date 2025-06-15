import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import MainLayout from "../Layout/MainLayout";
import Login from "../pages/Login";
import ErrorPage from "../pages/ErrorPage";
import LoadingFallback from "../components/shared/LoadingFallback";
import SignUp from "../pages/SignUp";
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
                path: '/signup',
                element: <SignUp />,
            },
            {
                path: '/marathons',
                element: <PrivateRoute><Marathons /></PrivateRoute>,
                hydrateFallbackElement: <LoadingFallback />,
            },
            {
                path: '/dashboard',
                element: <Dashboard />,
                children: [
                    {
                        path: 'add-marathon',
                        element: <PrivateRoute><AddMarathon /></PrivateRoute>
                    },
                    {
                        path: 'my-marathons',
                        element: <PrivateRoute><MyMarathonList /></PrivateRoute>
                    },
                    {
                        path: 'my-applications',
                        element: <PrivateRoute><MyApplyList /></PrivateRoute>
                    },
                ]
            },
            {
                path: '/profile',
                element: <PrivateRoute><Profile /></PrivateRoute>,
            },
            {
                path: '/marathon-details/:id',
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