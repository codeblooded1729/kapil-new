import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    search: {
        marginBottom: '20px',
    },
    cardsContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '20px',
    },
    card: {
        width: '200px',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#f5f5f5',
        },
    },
    cardHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});
