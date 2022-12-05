import React, {useState, useEffect} from 'react';
import {Box, Button, Typography, Pagination, Divider} from "@mui/material";
import {collection, query, orderBy, onSnapshot} from "firebase/firestore";
import {db} from '../firebaseSetup/firebase';
import QuestionBox from "./QuestionBox";
import { Link } from "react-router-dom";

export default function QuestionList(props) {
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

    console.log("text" + props.searchItem);
    const searchResult = [];

    
    questions.forEach((question) => {
        if (question.data.title.toLowerCase().indexOf(props.searchItem.toLowerCase()) === -1 ){
            return
        }
        searchResult.push(question);
    })


    return (
        <Box sx={{ m: 2 }}>
            {searchResult.map((question) => (
                <QuestionBox
                    id = {question.id}
                    key = {question.id}
                    title = {question.data.title}
                    description = {question.data.description}
                    tag = {question.data.tag}
                />
            ))}
        </Box>
    );
}