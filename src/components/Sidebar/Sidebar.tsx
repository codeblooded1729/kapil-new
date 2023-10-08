import React from 'react';
import { useStyles } from './SidebarStyles';
import { useLocation } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
// Import the icons you want to use for each menu item
import KycIcon from '@material-ui/icons/Assignment';
import UserExchangeIcon from '@material-ui/icons/People';
import ArchanaIcon from '@material-ui/icons/Star';
import RegFIUIcon from '@material-ui/icons/Report';
import AdminIcon from '@material-ui/icons/Settings';

const menuItems = [
    { label: 'KYC', icon: <KycIcon />, path: '/kyc' },
    { label: 'User/Ex', icon: <UserExchangeIcon />, path: '/user-exchange' },
    { label: 'Archana', icon: <ArchanaIcon />, path: '/archana' },
    { label: 'Reg/FIU', icon: <RegFIUIcon />, path: '/reg-fiu' },
    { label: 'Admin', icon: <AdminIcon />, path: '/admin' },
];

const Sidebar: React.FC = () => {
    const classes = useStyles();
    const location = useLocation();

    return (
        <div className={classes.sidebar}>
            <Typography className={classes.logo}>archarna</Typography>
            <List>
                {menuItems.map((item) => (
                    <ListItem
                        key={item.label}
                        className={`${classes.item} ${location.pathname === item.path ? classes.activeItem : ''}`}
                        component="a"
                        href={item.path}
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.label} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default Sidebar;
