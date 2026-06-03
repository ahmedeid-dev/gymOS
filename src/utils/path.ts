import type { IconName, IconPrefix } from "@fortawesome/fontawesome-svg-core";

interface Icon {
    name: string;
    path: string;
    icon: {
        name: IconName;
        prefix: IconPrefix;
    };
}
export const PATH: Icon[] = [
    {
        name: 'Dashboard',
        path: '/',
        icon: {
            name: "tachometer-alt",
            prefix: "fas",
        }
    },
    // ! couches
    {
        name: 'Couches',
        path: '/couches',
        icon: {
            name: "person-running",
            prefix: "fas",
        },
    },
    // ! clients
    {
        name: 'Clients',
        path: '/clients',
        icon: {
            name: "user-friends",
            prefix: "fas",
        },
    },
    // ! exercises
    {
        name: 'Exercises',
        path: '/exercises',
        icon: {
            name: "dumbbell",
            prefix: "fas",
        },
    },
    // ! subscriptions
    {
        name: 'Subscriptions',
        path: '/subscriptions',
        icon: {
            name: "bell",
            prefix: "fas",
        },
    },
    // ! tools
    {
        name: 'Tools',
        path: '/tools',
        icon: {
            name: "tools",
            prefix: "fas",
        },
    },
    // ! settings
    {
        name: 'Settings',
        path: '/settings',
        icon: {
            name: "cog",
            prefix: "fas",
        },
    },
];