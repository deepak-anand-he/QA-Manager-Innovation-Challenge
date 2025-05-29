import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faChartLine, faPlusCircle, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo.png';

const menuItems = [
  { name: 'Project Status', icon: faChartLine },
  { name: 'Setup Alerts', icon: faBolt },
  { name: 'Test Case Analysis', icon: faChartLine },
  { name: 'Add New Test Cases', icon: faPlusCircle },
];

const NAVBAR_HEIGHT = 64;

const colors = {
  pastelYellow: '#FFF9DB',
  darkGray: '#333333',
  mediumBrown: '#8B5C2A',
  brown: '#6D4C41',
  darkBrown: '#4E342E',
  white: '#FFFFFF',
};

function Navbar({ setActiveModule, activeModule }) {
  const [hoveredItem, setHoveredItem] = useState(null);

  const getButtonStyles = (item) => {
    // Project Status: hover or active
    if (
      (hoveredItem === item.name && item.name === 'Project Status') ||
      (activeModule === item.name && item.name === 'Project Status')
    ) {
      return {
        backgroundColor: colors.brown,
        color: colors.white,
      };
    }
    // Setup Alerts: hover or active
    if (
      (hoveredItem === item.name && item.name === 'Setup Alerts') ||
      (activeModule === item.name && item.name === 'Setup Alerts')
    ) {
      return {
        backgroundColor: colors.darkBrown,
        color: colors.white,
      };
    }
    // Any hovered item
    if (hoveredItem === item.name) {
      return {
        backgroundColor: colors.brown,
        color: colors.white,
      };
    }
    // Default
    return {
      backgroundColor: 'transparent',
      color: colors.mediumBrown,
    };
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: colors.pastelYellow,
        borderBottom: `2px solid #E2E2E2`,
        height: NAVBAR_HEIGHT,
        width: '100%',
        boxShadow: 'none',
        paddingY: '5px',
      }}
    >
      <Toolbar sx={{ minHeight: NAVBAR_HEIGHT, display: 'flex', justifyContent: 'space-between' }}>
        {/* Far Left Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 0 }}>
          <img
            src={logo}
            alt="Hitachi Energy Logo"
            style={{ height: 40, marginRight: 16 }}
          />
        </Box>
        {/* Centered Menu Items */}
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {menuItems.map((item) => (
            <Button
              key={item.name}
              onClick={() => setActiveModule(item.name)}
              onMouseEnter={() => setHoveredItem(item.name)}
              onMouseLeave={() => setHoveredItem(null)}
              sx={{
                ...getButtonStyles(item),
                fontWeight: 600,
                fontSize: '20px',
                mx: 2,
                borderRadius: '8px',
                padding: '8px 16px',
                transition: 'all 0.2s',
                textTransform: 'none',
              }}
            >
              {item.name}
            </Button>
          ))}
        </Box>
        {/* Far Right Profile Icon */}
        <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
          <Button sx={{ color: colors.mediumBrown, fontSize: '20px', fontWeight: 600 }}>
            <FontAwesomeIcon icon={faUserCircle} size="lg" style={{ marginRight: 8 }} />
            Profile
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;