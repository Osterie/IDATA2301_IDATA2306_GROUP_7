import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from '../components/header/Nav';
import Footer from '../components/footer/Footer';

const MainLayout = () => {
    return (
        <>
        <Nav />
        <Outlet />
        <Footer />
        </>
    );
};