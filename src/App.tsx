import React from 'react';
import Layout from './layouts/layout';
import { SnackbarProvider } from './components/SnackbarProvier';

const App: React.FC = () => {
    return (
        <>
            <SnackbarProvider>
                <Layout />
            </SnackbarProvider>
        </>
    );
}

export default App;