const MENU_ITEMS = [
    {
        key: 'dashboards',
        label: 'Home',
        isTitle: false,
        icon: 'uil-home-alt',
        children: [
            {
                key: 'ds-ecommerce',
                label: 'Shipments Dashboard',
                url: '/dashboard/shipments',
                parentKey: 'dashboards',
            }
        ],
    },
    {
        key: 'page-quickprint',
        label: 'Quick Print',
        isTitle: false,
        icon: 'uil-fast-mail',
        url: '/pages/quickprint',
    },
    {
        key: 'page-shipping-log',
        label: 'Orders',
        isTitle: false,
        icon: 'uil-comments-alt',
        url: '/pages/orders',
    },
    {
        key: 'page-shipments',
        label: 'Shipments',
        isTitle: false,
        icon: 'uil-box',
        url: '/pages/shipments',
    },
    {
        key: 'page-manifests',
        label: 'Manifests',
        isTitle: false,
        icon: 'uil-file-alt',
        url: '/pages/manifests',
    },
    {
        key: 'page-picksups',
        label: 'Pickups',
        isTitle: false,
        icon: 'uil-schedule',
        url: '/pages/pickups',
    },
    {
        key: 'page-addresses',
        label: 'Addresses',
        isTitle: false,
        icon: 'uil-building',
        url: '/pages/addresses',
    },
    {
        key: 'page-products',
        label: 'Products',
        isTitle: false,
        icon: 'uil-tag-alt',
        url: '/pages/products',
    },
    {
        key: 'page-analytics',
        label: 'Analytics',
        isTitle: false,
        icon: 'uil-chart',
        url: '/pages/analytics',
    },
    {
        key: 'reports',
        label: 'Reports',
        isTitle: false,
        icon: 'uil-table',
        children: [
            {
                key: 'reports-shipments',
                label: 'Shipments',
                url: '/reports/shipments',
                parentKey: 'reports',
            },
            {
                key: 'reports-refunds',
                label: 'Refunds',
                url: '/reports/refunds',
                parentKey: 'reports',
            },
            {
                key: 'reports-refunds',
                label: 'Tracking',
                url: '/reports/tracking',
                parentKey: 'reports',
            },
            {
                key: 'reports-payments',
                label: 'Payments',
                url: '/reports/payments',
                parentKey: 'reports',
            },
            {
                key: 'reports-finance',
                label: 'Finance',
                url: '/reports/finance',
                parentKey: 'reports',
            },
            {
                key: 'reports-invoices',
                label: 'Invoices',
                url: '/reports/invoices',
                parentKey: 'reports',
            },
        ],
    },
    {
        key: 'integrations',
        label: 'Integrations',
        isTitle: false,
        icon: 'uil-cloud-data-connection',
        children: [
            {
                key: 'integrations-stores',
                label: 'Stores',
                url: '/integrations/stores',
                parentKey: 'integrations',
            },
            {
                key: 'integrations-carrier-accounts',
                label: 'Carrier Accounts',
                url: '/integrations/carrier-accounts',
                parentKey: 'integrations',
            },
            {
                key: 'integrations-api',
                label: 'API',
                url: '/integrations/api',
                parentKey: 'integrations',
            },
            {
                key: 'integrations-webhooks',
                label: 'Webhooks',
                url: '/integrations/webhooks',
                parentKey: 'integrations',
            },
            {
                key: 'integrations-hardware',
                label: 'Hardware',
                url: '/integrations/hardware',
                parentKey: 'integrations',
            }
        ],
    },
    {
        key: 'settings',
        label: 'Settings',
        isTitle: false,
        icon: 'uil-cog',
        children: [
            {
                key: 'settings-company',
                label: 'Company',
                url: '/settings/company',
                parentKey: 'settings',
            },
            {
                key: 'settings-carrier-Labels',
                label: 'Labels',
                url: '/settings/labels',
                parentKey: 'settings',
            },
            {
                key: 'settings-manifests',
                label: 'Manifests',
                url: '/settings/manifests',
                parentKey: 'settings',
            },
            {
                key: 'settings-rates',
                label: 'Rates',
                url: '/settings/rates',
                parentKey: 'settings',
            },
            {
                key: 'settings-tracking',
                label: 'Tracking',
                url: '/settings/tracking',
                parentKey: 'settings',
            },
            {
                key: 'settings-notifications',
                label: 'Notifications',
                url: '/settings/notifications',
                parentKey: 'settings',
            },
            {
                key: 'settings-rules',
                label: 'Rules',
                url: '/settings/rules',
                parentKey: 'settings',
            }
        ],
    },
];

export default MENU_ITEMS;
