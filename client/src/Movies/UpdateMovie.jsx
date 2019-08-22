import React, {useState} from "react"
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
}));

const UpdateMovie = (props) =>
{
    const classes = useStyles();

    const [inputs, setInputs] = useState({ title: '', director: '', metascore: '', stars: [] })

    const handleChange = event =>
    {
        
    }

    const handleSubmit = event =>
    {
        event.preventDefault()
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <TextField
                    id="standard-title"
                    label="Title"
                    className={classes.textField}
                    value={inputs.title}
                    onChange={handleChange}
                    margin="normal"
                />
            </form>
        </div>
    )
}

export default UpdateMovie