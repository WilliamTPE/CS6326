import {Box, Typography, Stack, Chip} from "@mui/material";
import React, {useEffect, useState} from "react";
import {Button} from  "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {collection, query, orderBy, onSnapshot, limit} from "firebase/firestore";
import {db} from '../firebaseSetup/firebase';

export default function SideBar() {
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

    let navigate = useNavigate();

    function goBack() {
        navigate('/')
    }

    return (
        <Box sx={{p: 0}}>
            {/* <Box sx={{p: 2}}>
                <Button variant="contained" color="primary" onClick={goBack}>Go Back123</Button>
            </Box> */}
            <Box sx={{p: 0}}>
                <Typography variant="h6" gutterBottom>
                    Latest Questions
                </Typography>
                {questions.map((question) => (
                    <Link to={"/question/" + question.id} style={{color: 'inherit', textDecoration: 'inherit'}}>
                        <Typography variant="subtitle2" gutterBottom>{question.data.title.slice(0, 50)}</Typography>
                    </Link>
                ))}

            </Box>
        </Box>
    );
}