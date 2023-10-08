import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    sidebar: {
        width: '240px',
        height: '100vh',
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
    logo: {
        fontWeight: 'bold',
        fontSize: '24px',
        marginBottom: theme.spacing(4),
    },
    item: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(2),
        borderRadius: '8px',
        marginBottom: theme.spacing(2),
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
        },
    },
    activeItem: {
        backgroundColor: theme.palette.primary.main,
        fontWeight: 'bold',
        color: 'white',
    },
}));
