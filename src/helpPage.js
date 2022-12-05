import React, { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import './helpPage.css'
import { useNavigate } from "react-router-dom";

function HelpPage(){
    return (
        <Container>
            <Row className='justify-content-center'>
            {/* <div className='row'> */}
                <h2 className='help-heading'>Help on how to use this website.</h2>
                <h4 style={{'textAlign':'center', 'marginBottom':'2rem'}}>(Key points are marked by red boxes.)</h4>
                <h3 className='help-subtitle'>We offer three services and they can be navigated to through the Navbar or buttons in the homepage: </h3>
                <div className='col-md-6'>
                    <img className="img-fluid" src="/img/helpHomePage.png" alt="help home page" />
                </div>
                <h3 className='help-subtitle'> 1. Search and upload pictures for a house.</h3>
                <h5 >&nbsp; &nbsp; &nbsp; You can search for address with the search box and upload your own pictures with the upload link.</h5>
                <div className='col-md-6'>
                        <img className="img-fluid" src="/img/helpSearchPic.png" alt="help search" />
                </div>
                <h3 className='help-subtitle'> 2. Download checklists for a self-inspection.</h3>
                <h5 >&nbsp; &nbsp; &nbsp; You can narrow-down the range with dropdown selections and reset the search with the reset button.</h5>
                <div className='col-md-6'>
                        <img className="img-fluid" src="/img/helpChecklist.png" alt="help check" />
                </div>
                <h3 className='help-subtitle'> 3. Ask and answer questions in the forum.</h3>
                <h5 >&nbsp; &nbsp; &nbsp; You can search for questions with the search box, upload your own questions with the ask-question button and access any question with a click.</h5>
                <div className='col-md-6'>
                        <img className="img-fluid" src="/img/helpForum.png" alt="help check" />
                </div>
            {/* </div> */}
            </Row>
        </Container>
    )
}

export default HelpPage;