import React, { useState, useEffect } from 'react';
import { Layout, Button } from 'antd';
import { DoubleLeftOutlined, DoubleRightOutlined, FundOutlined, LogoutOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import UploadComponent from './adminScreens/Upload/Upload';
import PaymentDashboard from './adminScreens/Payment/PaymentDashboard';

// Dummy Components for the menu items
const Dashboard = () => <div>Dashboard Content</div>;
const Users = () => <div>Users Content</div>;
const Reports = () => <div>Reports Content</div>;

const { Header, Sider, Content } = Layout;

const Admin = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [activeComponent, setActiveComponent] = useState('Dashboard'); // Track which component is active

  // Update the time every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      const current = new Date();
      setCurrentTime(current.toLocaleString());
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = () => {
    console.log('Logging out...');
    // Add your logout logic here
  };

  // Handle menu item clicks
  const handleMenuClick = (component) => {
    setActiveComponent(component);
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Users':
        return <Users />;
      case 'upload':
        return <UploadComponent />;
      case 'reports':
        return <Reports />;
      case 'payment':
        return <PaymentDashboard />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sider
        collapsible
        collapsed={isCollapsed}
        onCollapse={toggleCollapse}
        trigger={null}
        className="bg-gray-800"
        style={{ position: 'fixed', top: '64px', left: 0, height: 'calc(100vh - 64px)' }}
      >
        {/* Toggle Button for Sidebar Collapse/Expand */}
        <div className="px-6 mt-4 flex justify-end ">
          <button
            onClick={toggleCollapse}
            className="text-white p-2 rounded-full"
          >
            {isCollapsed ? (
              <span className="text-white text-xl cursor-pointer"><DoubleRightOutlined /></span> // Right arrow when collapsed
            ) : (
              <span className="text-white text-xl cursor-pointer"><DoubleLeftOutlined /></span> // Left arrow when expanded
            )}
          </button>
        </div>

        {/* Menu Items */}
        <ul className="space-y-4 text-white mt-6">
          <li className="flex items-center p-4 hover:bg-gray-700 rounded" onClick={() => handleMenuClick('Dashboard')}>
            <span className={`mr-4 ${isCollapsed ? 'block text-xl' : 'hidden'}`}><FundOutlined /></span>
            <span className={`${isCollapsed ? 'hidden' : 'text-xl'}`}>Dashboard</span>
          </li>
          <li className="flex items-center p-4 hover:bg-gray-700 rounded" onClick={() => handleMenuClick('Users')}>
            <span className={`mr-4 ${isCollapsed ? 'block text-xl' : 'hidden'}`}><UsergroupAddOutlined /></span>
            <span className={`${isCollapsed ? 'hidden' : 'text-xl'}`}>Users</span>
          </li>
          <li className="flex items-center p-4 hover:bg-gray-700 rounded" onClick={() => handleMenuClick('upload')}>
            <span className={`mr-4 ${isCollapsed ? 'block text-xl' : 'hidden'}`}>⚙️</span>
            <span className={`${isCollapsed ? 'hidden' : 'text-xl'}`}>Upload Fies</span>
          </li>
          <li className="flex items-center p-4 hover:bg-gray-700 rounded" onClick={() => handleMenuClick('reports')}>
            <span className={`mr-4 ${isCollapsed ? 'block text-xl' : 'hidden'}`}>📊</span>
            <span className={`${isCollapsed ? 'hidden' : 'text-xl'}`}>Reports</span>
          </li>
          <li className="flex items-center p-4 hover:bg-gray-700 rounded" onClick={() => handleMenuClick('payment')}>
            <span className={`mr-4 ${isCollapsed ? 'block text-xl' : 'hidden'}`}>📊</span>
            <span className={`${isCollapsed ? 'hidden' : 'text-xl'}`}>Payments</span>
          </li>
        </ul>
      </Sider>

      <Layout className="site-layout" style={{ marginLeft: isCollapsed ? 80 : 200 }}>
        {/* Header */}
        <Header className="bg-gray-800 text-white flex justify-between items-center px-6" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 10 }}>
          {/* Admin Panel Text always visible */}
          <div className="text-white text-lg font-semibold">
            Admin Panel
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-white">{currentTime}</div>
            <span className="text-lg font-semibold text-white">Admin Name</span>
            <Button
              icon={<LogoutOutlined />}
              type="primary"
              danger
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </Header>

        {/* Main Content */}
        <Content className="p-8 bg-gray-100" style={{ marginTop: '64px' }}>
          {/* Display the corresponding component based on the selected menu item */}
          {renderComponent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Admin;
