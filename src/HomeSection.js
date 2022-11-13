import React from "react";
import './home.css'
import { useNavigate } from 'react-router-dom';
import {Container, Button} from 'react-bootstrap';

export default function HomeSection() {
    const navigate = useNavigate();

    const navigateToSearchPic = () => {
        navigate('/searchPictures');
    };

    const navigateCheckList = () => {
        navigate('/Checklist');
    };

    const navigateQA = () => {
        navigate('/forum');
    };
    return (
        <Container style={{marginBottom:'5rem'}}>
            <div className="row " style={{marginTop:'7rem'}}>
                <div className="col-md-6">
                    <div className="realH">Find Out the Real House Looking</div>
                    <div className="uploadH">Upload your review to help more people.</div>
                    <Button className="search" onClick={navigateToSearchPic} style={{marginBottom:'2rem'}}>Search</Button>
                </div>
                <div className="col-md-6">
                    <img className="img-fluid" src="/img/findpic.jfif" alt="a logo" />
                </div>
            </div>
            <div className="row " style={{marginTop:'10rem', marginBottom:'10rem'}}>
                <div className="col-md-9 ">
                        <p className="inspec">Self House Inspection CheckList</p>
                        <p className="down">Download it today.</p>
                </div>
                <div className="col-md-3 button-col">
                    <Button className="download" onClick={navigateCheckList}>Download</Button>
                </div>
            </div>
            <div className="row" style={{ marginTop:'5rem' }}>
                    <div className="col-md-4">
                        <div className="faq">Frequently Asked Questions</div>
                        <Button className="askbutton" onClick={navigateQA}>Ask a Question</Button>
                    </div>
                    <div className="col-md-1"></div>
                    <div className="col-md-7">
                        <h6 className="q">How to fix roof damage? </h6>
                        <p className="answer">The roofer will typically use a primer and adhesive patch to seal the damaged area. Alternatively, the roofer may use a specially-designed glue to repair small holes or cracks. Larger repairs often require replacing an entire section of rubber roofing. </p>
                        <h6 className="q">Why won’t my toilet stop running?</h6>
                        <p className="answer">The three most common causes are a broken or dirty flapper, too long or too short of a chain between the flush lever and the flapper or a float that is out of position.</p>
                        <h6 className="q">How to fix impropoer electrical wiring? </h6>
                        <p className="answer">If you connect the circuit wires to the wrong terminals on an outlet, the outlet will still work, but the polarity will be backward. When this happens, a lamp, for example, will have its bulb socket sleeve energized rather than the little tab inside the socket</p>
                    </div>
            </div>
        </Container>

    )
}
