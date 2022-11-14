import React, {useState, useEffect} from 'react';
import {Box, Button, Typography, Pagination, Divider} from "@mui/material";
import {collection, query, orderBy, onSnapshot} from "firebase/firestore";
import {db} from '../firebaseSetup/firebase';
import QuestionBox from "./QuestionBox";
import { Link } from "react-router-dom";

export default function QuestionList() {
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
        <Box sx={{ m: 2 }}>
            <Box display="grid" sx={{ display: "flex", my:1, py:2}}>
                <Typography variant="h4" sx={{ flexGrow: 1 }}>
                    All Questions
                </Typography>
                <Link to={"/question/ask"} style={{textDecoration: 'none'}}>
                    <Button variant="contained" color="primary">Ask Question</Button>
                </Link>
            </Box>
            <Divider sx={{ border: 1 }}/>

            {questions.map((question) => (
                <QuestionBox
                    id = {question.id}
                    key = {question.id}
                    title = {question.data.title}
                    description = {question.data.description}
                    tag = {question.data.tag}
                />
            ))}

            {/* <Box sx={{p:3, justifyContent: 'center', display: 'flex',}}>
                <Pagination count={10} />
            </Box> */}
        </Box>
    );
}