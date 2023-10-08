import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(3),
    },
    input: {
        marginBottom: theme.spacing(2),
    },
    button: {
        margin: '20px 0',
        marginBottom: theme.spacing(2),
    },
    divider: {
        width: '100%',
        margin: theme.spacing(4, 0),
    }, 
    transactionModal: {
        width: '80%',
        maxWidth: '500px',
        margin: 'auto',
        marginTop: theme.spacing(6),
    },
    dropdown: {
        width: '100%',
        marginBottom: theme.spacing(2),
        
    },
    transactionModalContent: {
        backgroundColor: '#fff', // white background
        padding: '20px',
        borderRadius: '10px',
        position: 'relative', // this is for the close button
        outline: 'none',  // to remove default focus outline
    },
    
    closeButton: {
        position: 'absolute',
        right: '10px',
        top: '10px',
        cursor: 'pointer',
    },

    table: {
        marginTop: '20px',
        '& th, & td': {
            border: '1px solid #ddd',
            padding: '8px',
        },
        '& tr:nth-child(even)': {
            backgroundColor: '#f2f2f2',
        },
        '& tr:hover': {
            backgroundColor: '#ddd',
        },
    },
}));
