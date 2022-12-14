import React, {useState, useEffect} from 'react';
import {Box, Button, Container, Typography, Grid, Divider, Stack} from "@mui/material";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {Link, useParams} from 'react-router-dom';
import {db} from '../firebase';
import {doc, onSnapshot, collection, addDoc, Timestamp, query, orderBy, limit, where} from "firebase/firestore";
import QuestionContent from "../component/QuestionContent";
import ReactQuill from "react-quill";
import CommentContent from "../component/CommentContent";

const theme = createTheme({
    palette: {
        primary: {
            main: "#363F59"
        },
    }
});

export default function QuestionDetail() {

    const {id} = useParams();
    const [content, setContent] = useState([]);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [questions, setQuestions] = useState([]);

    /** function to get part of questions from firestore in realtime **/
    useEffect(() => {
        const questionColRef = query(collection(db, 'questions'), orderBy('created', 'desc'), limit(5));
        onSnapshot(questionColRef, (snapshot) => {
            setQuestions(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
    }, [])

    /** function to get question content from firestore in realtime by id **/
    useEffect(() => {
        const questionContent = doc(db, "questions", id);
        onSnapshot(questionContent, (doc) => {
            const data = doc.data();
            setContent(data);
        })
    }, [id]);

    /** function to get comments from firestore in realtime **/
    useEffect(() => {
        const commentColRef = query(collection(db, 'comments'), where('questionId', '==', id));
        onSnapshot(commentColRef, (snapshot) => {
            setComments(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
    }, [])

    /* function to add a new comment to firestore */
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await addDoc(collection(db, 'comments'), {
                comment: comment,
                questionId: id,
                created: Timestamp.now()
            });
        } catch (err) {
            alert(err)
        }
    }

    /* Quilljs */
    const modules = {
        toolbar: [
            [{header: [1, 2, 3, 4, 5, 6, false]}],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{list: "ordered"}, {list: "bullet"}],
            ["link", "image"]
        ]
    };

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <Box display="grid" sx={{display: "flex", m: 2}}>
                    <Typography variant="h4" sx={{flexGrow: 1}}>{content.title}</Typography>
                    <Link to={"/question/ask"} style={{textDecoration: 'none'}}>
                        <Button variant="contained" color="primary">Ask Question</Button>
                    </Link>
                </Box>
                <Divider sx={{my: 2, border: 1}}/>
                <Grid container spacing={2}>
                    <Grid xs={9}>
                        <Box sx={{p: 2}}>
                            <QuestionContent
                                description={content.description}
                                tag={content.tag}
                            />
                            <Box>
                                <Divider sx={{my: 1, border: 1}}/>
                                <Typography variant="h6" sx={{py: 1}}>
                                    Comments
                                </Typography>
                                {comments.map((comment) => (
                                    <CommentContent
                                        comment = {comment.data.comment}
                                    />
                                ))}
                                <Divider sx={{mt: 2, mb:1, border: 1}}/>
                                <form onSubmit={handleSubmit} name='addComment'>
                                    <ReactQuill
                                        theme="snow"
                                        modules={modules}
                                        value={comment}
                                        onChange={setComment}
                                    />
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        sx={{my: 2, py: 1}}
                                        type="submit"
                                        value="Submit"
                                    >Post Answer</Button>
                                </form>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid xs={3}>
                        <Box sx={{p: 2}}>
                            <Typography variant="h6" gutterBottom>
                                Latest Questions
                            </Typography>
                            {questions.map((question) => (
                                <Link to={"/question/" + question.id}
                                      style={{color: 'inherit', textDecoration: 'inherit'}}>
                                    <Typography variant="subtitle2"
                                                gutterBottom>{question.data.title.slice(0, 50)}</Typography>
                                </Link>
                            ))}
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    );
}