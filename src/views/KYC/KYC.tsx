import React, { useState, useEffect } from 'react';
import { useStyles } from './KYCStyles'; // Assuming you have a styles file for KYC
import { TextField, Card, CardContent, Typography, Collapse, IconButton } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';


const BACKEND_DOMAIN = 'http://localhost/:3000';

const KYC: React.FC = () => {
    const classes = useStyles();
    const [users, setUsers] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedCard, setExpandedCard] = useState<string | null>(null);


    useEffect(() => {
        const fetchKYCUsers = async () => {
            try {
                const response = await fetch(`${BACKEND_DOMAIN}/viewAllUsersKYC`);
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error("Error fetching KYC users:", error);
            }
        };

        fetchKYCUsers();
    }, []);

    const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className={classes.container}>
            <TextField
                label="Search User"
                variant="outlined"
                className={classes.search}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
            <div className={classes.cardsContainer}>
                {filteredUsers.map(user => (
                    <Card key={user.name} className={classes.card}>
                        <CardContent onClick={() => setExpandedCard(expandedCard === user.name ? null : user.name)}>
                            <div className={classes.cardHeader}>
                                <Typography variant="h6">
                                    {user.name}
                                </Typography>
                                <IconButton>
                                    <PersonIcon />
                                </IconButton>
                            </div>
                        </CardContent>
                        <Collapse in={expandedCard === user.name}>
                            <CardContent>
                                <Typography variant="body2" color="textSecondary">
                                    DUI: {user.id}
                                </Typography>
                            </CardContent>
                        </Collapse>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default KYC;
