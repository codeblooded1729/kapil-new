import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
    },
    idSection: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '10px',
    },
    search: {
        marginBottom: '20px',
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
    collapsibleCell: {
        paddingBottom: 0,
        paddingTop: 0,
    }
});
