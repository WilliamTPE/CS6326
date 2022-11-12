import React, {useState, useEffect} from 'react';
import {Box, Button, Container, Typography, Grid, Divider} from "@mui/material";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Editor from "../component/Editor";
import { Link, useParams} from 'react-router-dom';
import {db} from '../firebase';
import { doc, onSnapshot } from "firebase/firestore";
import QuestionContent from "../component/QuestionContent";

const theme = createTheme({
    palette: {
        primary: {
            main: "#2D3648"
        },
    }
});

export default function QuestionDetail() {

    const {id} = useParams();
    console.log(id);
    const [content, setContent] = useState([]);

    /** function to get question content from firestore in realtime by id **/
    useEffect(() => {
        const questionContent = doc(db, "questions", id);
        onSnapshot(questionContent,(doc) => {
            console.log("Current data1: ", doc.data());
            const data = doc.data();
            setContent(data);
        })
    },[id]);

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <Box display="grid" sx={{display: "flex", m:2}}>
                    <Typography variant="h4" sx={{flexGrow: 1}}>{content.title}</Typography>
                    <Link to={"/question/ask"} style={{textDecoration: 'none'}}>
                        <Button variant="contained" color="primary">Ask Question</Button>
                    </Link>
                </Box>
                <Divider sx={{my:2, border: 1}}/>

                <Grid container spacing={2}>
                    <Grid xs={9}>
                        <Box sx={{p: 2}}>
                            <QuestionContent
                                description = {content.description}
                                tag = {content.tag}
                            />
                            <Divider />
                            <Box>
                                <Typography variant="h6" sx={{py:1}}>
                                    Comments
                                </Typography>
                                <Editor/>
                                <Button variant="contained" color="primary" sx={{my:2, py:1}}>Post Answer</Button>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid xs={3}>
                        <Box sx={{p: 2}}>
                            <Typography variant="h6" gutterBottom>
                                Related Questions
                            </Typography>
                            <Typography variant="subtitle2" gutterBottom>
                                subtitle2. Lorem ipsum dolor sit amet,
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    );
}