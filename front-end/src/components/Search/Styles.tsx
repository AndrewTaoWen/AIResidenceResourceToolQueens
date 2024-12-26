import { makeStyles } from "@fluentui/react-components";

export const useStyles = makeStyles({
    searchContainer: {
        display: 'flex',
        alignItems: 'stretch',
        marginBottom: '20px',
        width: '100%',
    },
    inputBox: {
        color: 'white',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px 0 0 4px',
        flexGrow: 1,
        boxSizing: 'border-box',
        resize: 'vertical', 
        overflow: 'auto',
        minHeight: '50px', 
    },
    searchButton: {
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '0 4px 4px 0',
        backgroundColor: '#0078d4',
        color: 'white',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '80px',
    },
    table: {
        border: '1px solid #ddd',
        borderRadius: '8px',
        overflow: 'hidden',
    },
    tableHeaderContainer: {
        backgroundColor: '#000000',
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'left',
        padding: '10px',
    },
    tableRowContainer: {
        backgroundColor: '#fff',
        color: 'black',
        '&:nth-of-type(odd)': {
            backgroundColor: '#f9f9f9',
        },
    },
    tableCell: {
        padding: '10px',
        borderBottom: '1px solid #ddd',
        color: 'green',
    },
    tableHeaderCell: {
        backgroundColor: '#000000',
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: '10px',
    },
    errorMessage: {
        color: 'red',
        fontWeight: 'bold',
        marginTop: '20px',
    },
    noResultsMessage: {
        color: 'gray',
        marginTop: '20px',
    },
});
