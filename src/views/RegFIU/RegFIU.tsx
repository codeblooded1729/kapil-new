import React, { useState, useEffect } from 'react';
import { TextField, Button, Table, TableBody, TableCell, TableHead, TableRow, Collapse, IconButton } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { useStyles } from './RegFIUStyles';

const BACKEND_DOMAIN = 'http://localhost:3000';

const RegFIU: React.FC = () => {
    const classes = useStyles();
    const [senderId, setSenderId] = useState<string>('');
    const [receiverId, setReceiverId] = useState<string>('');
    const [senderName, setSenderName] = useState<string>('');
    const [receiverName, setReceiverName] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [transactions, setTransactions] = useState<any[]>([]);
    const [openRow, setOpenRow] = useState<string | null>(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await fetch(`${BACKEND_DOMAIN}/viewAllTransactionsReg`);
                const data = await response.json();
                setTransactions(data);
            } catch (error) {
                console.error("Error fetching transactions:", error);
            }
        };

        fetchTransactions();
    }, []);

    const handleGetName = async (type: string) => {
        try {
            const id = type === 'sender' ? senderId : receiverId;
            const response = await fetch(`${BACKEND_DOMAIN}/viewNameFromID`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });
            const data = await response.json();
            if (type === 'sender') {
                setSenderName(data.name);
            } else {
                setReceiverName(data.name);
            }
        } catch (error) {
            console.error("Error fetching name:", error);
        }
    };

    const filteredTransactions = transactions.filter(transaction => 
        transaction.Transaction.includes(searchTerm)
    );

    return (
        <div className={classes.container}>
            <div className={classes.idSection}>
                <TextField label="Sender ID" value={senderId} onChange={(e) => setSenderId(e.target.value)} />
                <Button onClick={() => handleGetName('sender')}>Get the Name</Button>
                <span>{senderName}</span>

                <TextField label="Receiver ID" value={receiverId} onChange={(e) => setReceiverId(e.target.value)} />
                <Button onClick={() => handleGetName('receiver')}>Get the Name</Button>
                <span>{receiverName}</span>
            </div>

            <TextField 
                label="Search by Transaction"
                variant="outlined"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className={classes.search}
            />

            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Transaction</TableCell>
                        <TableCell>Sender Name</TableCell>
                        <TableCell>Receiver Name</TableCell>
                        <TableCell>Details</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredTransactions.map((transaction, idx) => (
                        <>
                            <TableRow key={transaction.Transaction}>
                                <TableCell>{transaction.Transaction}</TableCell>
                                <TableCell>{transaction.Sender_Name}</TableCell>
                                <TableCell>{transaction.Receiver_Name}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => setOpenRow(openRow === transaction.Transaction ? null : transaction.Transaction)}>
                                        {openRow === transaction.Transaction ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.collapsibleCell} colSpan={4}>
                                    <Collapse in={openRow === transaction.Transaction}>
                                        <pre>{JSON.stringify(transaction.Attestation, null, 2)}</pre>
                                    </Collapse>
                                </TableCell>
                            </TableRow>
                        </>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default RegFIU;
