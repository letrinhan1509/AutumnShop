import React from 'react';

const admin = JSON.parse(localStorage.getItem('user'));

const Dashboard = () => {
    return (
        <div>
            <h2>Xin chào {admin.username}</h2>
        </div>
    );
}

export default Dashboard;