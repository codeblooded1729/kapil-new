import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useStyles } from './UserExchangeStyles';
import { Modal, TextField, Select, Divider, MenuItem, InputLabel, FormControl, LinearProgress, Snackbar, IconButton, Button,Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';


import CloseIcon from '@material-ui/icons/Close';

const BACKEND_DOMAIN = 'http://localhost:3000'; 
const socket = io(BACKEND_DOMAIN);

const UserExchange: React.FC = () => {
    const classes = useStyles();
    
    const [transactions, setTransactions] = useState<any[]>([]);

    const [selectedUser, setSelectedUser] = useState<string>('');

    const [userName, setUserName] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarColor, setSnackbarColor] = useState<'success' | 'error'>('success');
    
    const [isModalOpen, setModalOpen] = useState(false);
    const [users, setUsers] = useState<string[]>([]);
    const [sender, setSender] = useState('');
    const [receiver, setReceiver] = useState('');
    const [value, setValue] = useState(0);
    const [isLoading, setLoading] = useState(false);
    const [transactionMessages, setTransactionMessages] = useState<string[]>([]);

    const handleAddUser = async () => {
        if (userName.includes(' ')) {
            // Handle validation error
            setSnackbarMessage('Name should not contain spaces.');
            setSnackbarColor('error');
            setSnackbarOpen(true);
            return;
        }

        try {
            const response = await fetch(`${BACKEND_DOMAIN}/addUser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: userName }),
            });

            if (response.status === 200) {
                setSnackbarMessage('User added successfully!');
                setSnackbarColor('success');
            } else {
                setSnackbarMessage('Error adding user.');
                setSnackbarColor('error');
            }
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Error:', error);
            setSnackbarMessage('Something went wrong.');
            setSnackbarColor('error');
            setSnackbarOpen(true);
        }
    };
    
    useEffect(() => {
        // Fetch the list of users when the component mounts
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${BACKEND_DOMAIN}/getUsers`);
                const data = await response.json();
                setUsers(data.users_name_list);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
        
        // Set up listeners for socket events
        socket.on('start transaction', (msg) => {
            setTransactionMessages((prevMessages) => [...prevMessages, msg.progress_msg]);
        });

    // Listener for 'transaction commitment' event
    socket.on('transaction commitment', (msg) => {
        const { SPD_KY_S, TRR, VAL, RADDR_R } = msg;
        const message = `Transaction commitment details: ${SPD_KY_S}, ${TRR}, ${VAL}, ${RADDR_R}`;
        setTransactionMessages((prevMessages) => [...prevMessages, message]);
    });

    // Listener for 'preparation' event
    socket.on('preparation', (msg) => {
        const message_string = msg.progress_msg;
        setTransactionMessages((prevMessages) => [...prevMessages, message_string]);
    });

    // Listener for 'information sent' event
    socket.on('information sent', (msg) => {
        const { COMM, PRF, EID_S, EID_R, value } = msg;
        const message = `Information sent details: ${COMM}, ${PRF}, ${EID_S}, ${EID_R}, ${value}`;
        setTransactionMessages((prevMessages) => [...prevMessages, message]);
    });

    // Listener for 'compliancy not established' event
    socket.on('compliancy not established', (msg) => {
        const message_string = msg.progress_msg;
        setTransactionMessages((prevMessages) => [...prevMessages, message_string]);
    });

    // Listener for 'confirmation received' event
    socket.on('confirmation received', (msg) => {
        const { SIGM_C } = msg;
        const message = `Confirmation received details: ${SIGM_C}`;
        setTransactionMessages((prevMessages) => [...prevMessages, message]);
    });

    // Listener for 'transaction completed' event
    socket.on('transaction completed', (msg) => {
        const message_string = msg.progress_msg;
        setTransactionMessages((prevMessages) => [...prevMessages, message_string]);
    });

        // ... set up other event listeners in a similar way

        // Clean up the listeners when the component is unmounted
        return () => {
            socket.off('start transaction');
            socket.off('transaction commitment');
            socket.off('preparation');
            socket.off('information sent');
            socket.off('compliancy not established');
            socket.off('confirmation received');
            socket.off('transaction completed');
        };
    }, []);

    const handleTransaction = async () => {
        if (value <= 0) {
            setSnackbarMessage('Value should be greater than 0.');
            setSnackbarColor('error');
            setSnackbarOpen(true);
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`${BACKEND_DOMAIN}/genTransaction`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ value, sender, receiver }),
            });

            const data = await response.json();

            if (response.status === 201) {
                setSnackbarMessage(data.message);
                setSnackbarColor('success');
            } else {
                setSnackbarMessage(data.error);
                setSnackbarColor('error');
            }
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Error:', error);
            setSnackbarMessage('Something went wrong.');
            setSnackbarColor('error');
            setSnackbarOpen(true);
        } finally {
            setLoading(false);
        }
    };



    const handleFetchTransactions = async () => {
        try {
            const response = await fetch(`${BACKEND_DOMAIN}/viewTransactionOfUser`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: selectedUser }),
            });
            const data = await response.json();
            setTransactions(data);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    };

    return (
        <div className={classes.container}>
            {/* Add User Section */}
            <TextField
                className={classes.input}
                label="Name"
                variant="outlined"
                helperText="Please add the valid name here"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
            />
            <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={handleAddUser}
            >
                ADD USER
            </Button>

            <Divider className={classes.divider} />

            <Button
    variant="contained"
    color="primary"
    onClick={() => setModalOpen(true)}
    className={classes.button}
>
    Generate Transaction
</Button>
            {/* TODO: Generate Transaction Section */}

            {/* TODO: View Transaction Section */}

            {/* Snackbar for messages */}
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage}
                action={
                    <>
                        <IconButton size="small" color="inherit" onClick={() => setSnackbarOpen(false)}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </>
                }
                style={{ backgroundColor: snackbarColor === 'success' ? 'green' : 'red' }}
            />
            
            {/* Generate Transaction Modal */}
            <Modal
                open={isModalOpen}
                onClose={() => setModalOpen(false)}
                className={classes.transactionModal}
            >
                <div className={classes.transactionModalContent}>
                    
                    <h3>Generate Transaction</h3>
                    
                    <CloseIcon className={classes.closeButton} onClick={() => {
    setModalOpen(false);
    setTransactionMessages([]); // Clear the previous messages
}} />

                    <FormControl variant="outlined" className={classes.dropdown}>
                        <InputLabel>Sender</InputLabel>
                        <Select
                            value={sender}
                            onChange={(e) => setSender(e.target.value as string)}
                            label="Sender"
                        >
                            {users.map((user) => (
                                <MenuItem key={user} value={user}>
                                    {user}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl variant="outlined" className={classes.dropdown}>
                        <InputLabel>Receiver</InputLabel>
                        <Select
                            value={receiver}
                            onChange={(e) => setReceiver(e.target.value as string)}
                            label="Receiver"
                        >
                            {users.map((user) => (
                                <MenuItem key={user} value={user}>
                                    {user}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        type="number"
                        label="Value"
                        variant="outlined"
                        value={value}
                        onChange={(e) => setValue(Number(e.target.value))}
                        fullWidth
                        className={classes.input}
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleTransaction}
                    >
                        Generate Transaction
                    </Button>

                    {isLoading && <LinearProgress />}

                    <div>
                        {transactionMessages.map((message, index) => (
                            <p key={index}>{message}</p>
                        ))}
                    </div>
                </div>
            </Modal>

            {/* Snackbar for messages */}
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage}
                action={
                    <>
                        <IconButton size="small" color="inherit" onClick={() => setSnackbarOpen(false)}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </>
                }
                style={{ backgroundColor: snackbarColor === 'success' ? 'green' : 'red' }}
            />
        



        <Divider className={classes.divider} />
        <br>
        </br>
        <h2> view transaction by user</h2>

    <FormControl variant="outlined" className={classes.dropdown}>
            <InputLabel>User</InputLabel>
            <Select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value as string)}
                label="User"
            >
                {users.map((user) => (
                    <MenuItem key={user} value={user}>
                        {user}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>

        <Button variant="contained" color="primary" onClick={handleFetchTransactions}>
            Fetch
        </Button>

        <Table className={classes.table}>
            <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Value</TableCell>
                    <TableCell>Confirmation</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                        <TableCell>{transaction.id}</TableCell>
                        <TableCell>{transaction.value}</TableCell>
                        <TableCell>{transaction.confirmation ? '✅' : '❌'}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>

        </div>

    );
};

export default UserExchange;
