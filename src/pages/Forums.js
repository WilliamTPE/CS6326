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
    // set display limit
    var pageLimit = 6;
    const [numPages, setNumPages] = useState(0)
    // console.log(Math.ceil(questions.length / pageLimit))
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

    // console.log(questions.length)
    const [curPage, setCurPage] = useState(0);
    // setNumPages(Math.ceil(questions.length / pageLimit))
    //pagination
    var pageNumbers = []
    for(let i = 0; i < numPages; i++){
        pageNumbers.push(
            <Pagination.Item id={"page" + i} onClick={clickPage.bind(this, i)}>{i + 1}</Pagination.Item>
        )
    }
    function clickPage(gotNum){
        setCurPage(gotNum)
        // console.log(gotNum)
    }

    function goToSmallerPage(){
        if(curPage > 0){
            // setFilter(display[curPage - 1])
            setCurPage(curPage - 1)
        }
    }
    function goToLargerPage(){
        // console.log(display.length / pageLimit)
        if(curPage < Math.ceil(questions.length / pageLimit) ){
            // setFilter(display[curPage + 1])
            setCurPage(curPage + 1)
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Container style={{marginTop:'2rem'}}>
                <Grid container spacing={2}>
                    <Grid xs={3}>
                        <SideBar />
                    </Grid>
                    <Grid xs={9}>
                        <QuestionList />
                    </Grid>
                </Grid>
                <div className='page-number-content'>
                <Pagination>
                    <Pagination.Prev onClick={goToSmallerPage}/>
                    {pageNumbers}
                    <Pagination.Next onClick={goToLargerPage}/>
                </Pagination>
                </div>
            </Container>
        </ThemeProvider>
    );
}
