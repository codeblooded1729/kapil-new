import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Collapse, IconButton } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { useStyles } from './ArcharnaStyles'; // Assuming you have a styles file for Archarana
import { TextField } from '@material-ui/core';

const BACKEND_DOMAIN = 'http://54.169.5.180:3000';

const Archarana: React.FC = () => {
    const classes = useStyles();
    const [transactions, setTransactions] = useState<any[]>([]);
    const [openRow, setOpenRow] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const filteredTransactions = transactions.filter(transaction => 
        transaction.Transaction_Commitment.includes(searchTerm)
    );
    
    
    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await fetch(`${BACKEND_DOMAIN}/viewAllTransactionsArcharna`);
                const data = await response.json();
                setTransactions(data);
            } catch (error) {
                console.error("Error fetching transactions:", error);
            }
        };

        fetchTransactions();
    }, []);

    return (
        <div className={classes.container}>
                    <TextField 
            label="Search by Commitment ID"
            variant="outlined"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className={classes.search}
        />
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Transaction Commitment</TableCell>
                        <TableCell>Value</TableCell>
                        <TableCell>Details</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredTransactions.map((transaction, idx) => (
                        <>
                            <TableRow key={transaction.Transaction_Commitment}>
                                <TableCell>{transaction.Transaction_Commitment}</TableCell>
                                <TableCell>{transaction.value}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => setOpenRow(openRow === transaction.Transaction_Commitment ? null : transaction.Transaction_Commitment)}>
                                        {openRow === transaction.Transaction_Commitment ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.collapsibleCell} colSpan={3}>
                                    <Collapse in={openRow === transaction.Transaction_Commitment}>
                                        {/* Display nested proof data here */}
                                        {/* This can be further improved and broken down as needed */}
                                        <pre>{JSON.stringify(transaction.proof, null, 2)}</pre>
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

export default Archarana;
