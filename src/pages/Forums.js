import { Divider, Typography, Box, Button, InputAdornment, TextField } from "@mui/material";
import { Search } from '@mui/icons-material';
import React, { useEffect, useState } from "react";
import QuestionList from "../component/QuestionList";
import SideBar from "../component/SideBar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { db } from '../firebaseSetup/firebase';
import { collection, query, orderBy, onSnapshot, getCountFromServer, doc, getDoc } from "firebase/firestore";
import { Container, Row } from 'react-bootstrap';
import { async } from "@firebase/util";
import { Link } from "react-router-dom";

const theme = createTheme({
    palette: {
        primary: {
            main: "#6A79A6"
        }
    }
});

export default function Forum() {
    const [questions, setQuestions] = useState([]);
    const [searchItem, setSearchItem] = useState('');

    const handleSearch = (event) => {
        
    }

    /** function to get all questions from firestore in realtime **/
    useEffect(() => {
        const questionColRef = query(collection(db, 'questions'), orderBy('created', 'desc'))
        onSnapshot(questionColRef, (snapshot) => {
            setQuestions(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })

    }, [])

    return (
        <ThemeProvider theme={theme}>
            <Container style={{ marginTop: '2rem', marginBottom: '10rem' }}>
                <div className="row">
                    <div className="col-md-3">
                        <SideBar />
                    </div>
                    <div className="col-md-9">                        
                        <Row className="justify-content-between">
                            <div className="col-sm-9">
                                <Typography sx={{ flexGrow: 1, typography: { sm: 'h4', xs: 'h5' } }}>
                                    All Questions
                                </Typography>
                            </div>
                            <div className="col-sm-3 d-flex justify-content-end">
                                <Link to={"/question/ask"} style={{textDecoration: 'none'}}>
                                    <Button variant="contained" color="primary" style={{'width':'9rem', 'fontSize':'14px'}}>Ask Question</Button>
                                </Link>
                            </div>
                        </Row>


                        <Row className="justify-content-between" style={{'marginTop':'1rem'}}>
                            <div className="col-sm-9">
                                <TextField
                                    id="forum-search"
                                    label="Search"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Search />
                                            </InputAdornment>
                                        ),
                                    }}
                                    variant="outlined"
                                    fullWidth
                                    size='small'
                                    type="text"
                                    name="searchItem"
                                    onChange={(event) => setSearchItem(event.target.value)}
                                />
                            </div>
                            <div className="col-sm-3 d-flex justify-content-end">
                                <Button
                                    variant="contained"
                                    fullWidth
                                    size='medium'
                                    type="submit"
                                    value="Submit"
                                    style={{'width':'9rem', 'fontSize':'14px'}}
                                    onClick={handleSearch}
                                >
                                    Search
                                </Button>
                            </div>
                        </Row>
                        <Divider sx={{ border: 1 }} style={{'marginTop':'1rem'}}/>
                        <QuestionList searchItem={searchItem}/>
                    </div>
                </div>



                {/* <Grid container>
                    
                    <Grid item container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} direction='row'>
                        <Grid item xs={3} style={{'padding':'none'}}>
                            <SideBar />
                        </Grid>
                        <Grid item xs={9}>
                            <QuestionList searchItem={searchItem}/>
                        </Grid>
                    </Grid>
                    <Grid item container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} direction='column'>
                        <Grid item container xs={12} spacing={2} justifyContent="flex-end" alignItems="center">
                            <Grid item xs={12} md={8} >
                                <TextField
                                    id="forum-search"
                                    label="Search"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Search />
                                            </InputAdornment>
                                        ),
                                    }}
                                    variant="outlined"
                                    fullWidth
                                    size='small'
                                    type="text"
                                    name="searchItem"
                                    onChange={(event) => setSearchItem(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} md={1}>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        size='medium'
                                        type="submit"
                                        value="Submit"
                                        onClick={handleSearch}
                                    >
                                        Search
                                    </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item container xs={12} spacing={2} justifyContent="flex-end" alignItems="center">
                        
                    </Grid>
                </Grid> */}
            </Container>
        </ThemeProvider>
    );
}
