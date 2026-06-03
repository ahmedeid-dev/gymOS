import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

const App = lazy(() => import('../App'));
const ListCouches = lazy(() => import('../pages/couches/ListCouches'));
const ViewCouch = lazy(() => import('../pages/couches/ViewCouch'));
const FormCouch = lazy(() => import('../pages/couches/FormCouch'));


export const ROUTES: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        errorElement: <App />,
    },
    {
        path: 'admin',
        element: <App />,
        children: [
            {
                path: 'dashboard',
                element: <App />,
            },
            {
                path: 'couches',
                element: <ListCouches />,
                children: [
                    {
                        path: ':id',
                        element: <ViewCouch />,
                    },
                    {
                        path: 'create',
                        element: <FormCouch />,
                    },
                    {
                        path: 'edit/:id',
                        element: <FormCouch />,
                    }
                ],
            },
            {
                path: 'clients',
                element: <App />,
                children: [
                    {
                        index: true,
                        element: <App />,
                    },
                    {
                        path: ":id",
                        element: <div>Client</div>,
                    },
                ],
            }
        ],
    }
    // {
    //     path: '*',
    //     element: <h1>404 Not Found</h1>,
    // }
];