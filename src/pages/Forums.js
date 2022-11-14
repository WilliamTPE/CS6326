import { Container, Grid } from "@mui/material";
import React,{ useEffect, useState }  from "react";
import QuestionList from "../component/QuestionList";
import SideBar from "../component/SideBar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {db} from '../firebaseSetup/firebase';
import {collection, query, orderBy, onSnapshot, getCountFromServer, doc, getDoc} from "firebase/firestore";
// import firebase from "firebase";
import {Pagination} from 'react-bootstrap';

const theme = createTheme({
    palette: {
        primary: {
            main: "#363F59"
        },
        secondary: {
            main: "#6A79A6"
        }
    }
});

export default function Forum() {
    const [questions, setQuestions] = useState([]);

    /** function to get all questions from firestore in realtime **/
    useEffect(()=>{
        const questionColRef = query(collection(db, 'questions'), orderBy('created', 'desc'))
        onSnapshot(questionColRef, (snapshot) => {
            setQuestions(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
   
    },[])

    return (
        <ThemeProvider theme={theme}>
            <Container style={{marginTop:'2rem', marginBottom:'10rem'}}>
                <Grid container spacing={{xs:2, md:3}} columns={{xs:4, sm:8, md:12}}>
                    <Grid item xs={3}>
                        <SideBar />
                    </Grid>
                    <Grid item xs={9}>
                        <QuestionList />
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    );
}
