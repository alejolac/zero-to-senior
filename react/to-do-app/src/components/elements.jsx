import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';

function Elements({ data }) {

    const setDate = () => {
        const fechaActual = data.date
        if (fechaActual == undefined ) {
            return ""
        }
        return fechaActual
    }

    return (
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <ImageIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={data.name} secondary={setDate()} />
            </ListItem>
    )
}

export default Elements 