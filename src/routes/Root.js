import { Navigate } from 'react-router-dom';

const Root = () => {
    const getRootUrl = () => {
        let url = 'dashboard/shipments';
        return url;
    };

    const url = getRootUrl();

    console.log('in Root, will navigate to ', url);

    return <Navigate to={`/${url}`} />;
};

export default Root;
