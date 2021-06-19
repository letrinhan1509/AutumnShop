import React, { useEffect } from 'react';

const admin = JSON.parse(localStorage.getItem('user'));
console.log(admin);
const Dashboard = () => {
    
    return (
        <div>
            <h2>Xin chào {admin.username}</h2>
        </div>
    );
}

export default Dashboard;