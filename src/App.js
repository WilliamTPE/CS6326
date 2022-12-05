import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-quill/dist/quill.snow.css';
import MyNavbar from './navbar.js';
import FooterPage from './footer.js';
import CheckListPage from './checklistpage.js';
import HomeSection from './HomeSection.js'
import SignUpPage from './signup.js'
import LoginPage from './login.js'
import SearchPic from './SearchPic.js'
import Display from './display.js'
import Upload from './Upload.js'
import Forum from "./pages/Forums";
import QuestionForms from "./pages/QuestionForms";
import QuestionDetail from "./pages/QuestionDetail";
import HelpPage from './helpPage';

function App() {
  const [logged, setLogged] = useState(false)
  const [curUser, setCurUser] = useState(null)
  const [curDisplayPicture, setCurDisplayPicture] = useState(null)
  const [singleData, setSingleData] = useState([])

  useEffect(() => {
    if(localStorage.getItem("user") != null){
      // console.log(JSON.parse(localStorage.getItem("user")).username)
      setLogged(true);
      setCurUser(JSON.parse(localStorage.getItem("user")));
    }

  },[])
  return (
    <Router>
      <MyNavbar isLogged = {logged}  userName = {curUser} />
      <Routes>
        <Route path='/' element={<HomeSection /> }></Route> 
        <Route path='/signup' element={<SignUpPage /> }></Route> 
        <Route path='/login' element={<LoginPage /> }></Route>   
        <Route path='/searchPictures' element={<SearchPic getPicture={setCurDisplayPicture} newPic={singleData} method={setSingleData}/>}></Route>
        <Route path='/displayPictures' element={<Display info = {curDisplayPicture}/>}></Route>
        <Route path='/checklist' element={<CheckListPage />}></Route>
        <Route path='/upload' element={<Upload formdata={setSingleData} />}></Route>
        <Route exact path="/forum" element={<Forum/>}/>
        <Route path="/question/ask" element={<QuestionForms/>} />
        <Route path="/question/:id" element={<QuestionDetail/>} />
        <Route path='/help' element={<HelpPage/>}></Route>
      </Routes>
      {/* <FooterPage /> */}
      <FooterPage /> 
      </Router>
  );
}

export default App;
