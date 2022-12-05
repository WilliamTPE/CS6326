import { Container, Grid, Box, Button, InputAdornment, TextField } from "@mui/material";
import { Search } from '@mui/icons-material';
import React, { useEffect, useState } from "react";
import QuestionList from "../component/QuestionList";
import SideBar from "../component/SideBar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { db } from '../firebaseSetup/firebase';
import { collection, query, orderBy, onSnapshot, getCountFromServer, doc, getDoc } from "firebase/firestore";
// import firebase from "firebase";
import { Pagination } from 'react-bootstrap';
import { async } from "@firebase/util";

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
                <Grid container>
                    <Grid item container xs={12} spacing={2} justifyContent="center">
                        <Grid item xs={12} md={9}>
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
                        <Grid item xs={12} md={3}>
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
                    <Grid item container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <Grid item xs={3}>
                            <SideBar />
                        </Grid>
                        <Grid item xs={9}>
                            <QuestionList searchItem={searchItem}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    );
}
