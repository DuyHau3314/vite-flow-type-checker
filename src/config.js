const config = {
    LABELS_URL:  window.LABELS_URL  === "__LABELS_URL__"  ? process.env.REACT_APP_LABELS_URL  : window.LABELS_URL,
    USERS_URL:   window.USERS_URL   === "__USERS_URL__"   ? process.env.REACT_APP_USERS_URL   : window.USERS_URL,
    ORDERS_URL:  window.ORDERS_URL  === "__ORDERS_URL__"  ? process.env.REACT_APP_ORDERS_URL  : window.ORDERS_URL,
    MANIFESTS_URL:  window.MANIFESTS_URL  === "__MANIFESTS_URL__"  ? process.env.REACT_APP_MANIFESTS_URL  : window.MANIFESTS_URL,
    PRICING_URL: window.PRICING_URL === "__PRICING_URL__" ? process.env.REACT_APP_PRICING_URL : window.PRICING_URL,
    INTEGRATIONS_URL: window.INTEGRATIONS_URL === "__INTEGRATIONS_URL__" ? process.env.REACT_APP_INTEGRATIONS_URL : window.INTEGRATIONS_URL,
    SHIPMENTS_URL: window.SHIPMENTS_URL === "__SHIPMENTS_URL__" ? process.env.REACT_APP_SHIPMENTS_URL : window.SHIPMENTS_URL,
    ADDRESSBOOK_URL: window.ADDRESSBOOK_URL === "__ADDRESSBOOK_URL__" ? process.env.REACT_APP_ADDRESSBOOK_URL : window.ADDRESSBOOK_URL
};

export default config;
