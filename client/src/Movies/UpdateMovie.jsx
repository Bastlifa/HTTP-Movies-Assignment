import React, {useState, useEffect} from "react"
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import axios from 'axios'

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
    const {movies, setMovies} = props
    console.log(props)
    const id = props.match.params.id

    const classes = useStyles();
    
    const [inputs, setInputs] = useState({ title: '', director: '', metascore: '', stars: '' })

    useEffect(() => {
        let movie 
        if (movies) movie = movies.find(el => el.id == id)
        if (movie) setInputs({title: movie.title, director: movie.director, metascore: movie.metascore, stars: movie.stars.join(',')})
    }, [movies])


    const handleChange = event =>
    {
        setInputs({ ...inputs, [event.target.name]: event.target.value })
    }

    const checkSubmit = event => event.keyCode === 13 ? handleSubmit(event) : null

    const handleSubmit = event =>
    {
        event.preventDefault()
        axios
        .put(`http://localhost:5000/api/movies/${id}`, 
        {id: id, title: inputs.title, director: inputs.director, metascore: inputs.metascore, stars: inputs.stars.split(',')})
        .then(res => 
            {
                console.log("res from put",res)
                props.history.push(`/movies/${id}`)
                setMovies(movies.map(el => el.id != id ? el : res.data))
            })
        .catch(err => console.log(err))
    }   
    return (
        <div className="update-movie">
            <form onSubmit={handleSubmit}>
                <TextField
                    id="standard-title"
                    label="Title"
                    className={classes.textField}
                    value={inputs.title}
                    onChange={handleChange}
                    margin="normal"
                    onKeyDown={checkSubmit}
                    name="title"
                />
                <TextField
                    id="standard-director"
                    label="Director"
                    className={classes.textField}
                    value={inputs.director}
                    onChange={handleChange}
                    margin="normal"
                    onKeyDown={checkSubmit}
                    name="director"
                />
                <TextField
                    id="standard-number"
                    label=" "
                    placeholder="Metascore"
                    value={inputs.metascore}
                    onChange={handleChange}
                    type="number"
                    className={classes.textField}
                    InputLabelProps={{
                    shrink: true,
                    }}
                    margin="normal"
                    name="metascore"
                    onKeyDown={checkSubmit}
                />
                <TextField
                    id="standard-stars"
                    label="Stars"
                    className={classes.textField}
                    value={inputs.stars}
                    onChange={handleChange}
                    margin="normal"
                    onKeyDown={checkSubmit}
                    name="stars"
                />
            </form>
        </div>
    )
}

export default UpdateMovie