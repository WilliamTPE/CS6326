import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './display.css';

export default function Display(props) {
    let navigate = useNavigate();
    function goBackPicClick(){
        navigate('/searchPictures')
    }
    
    var picfilename = []
    // console.log(props.info)
    for (let i = 0; i < props.info.picture.length; i++) {
        picfilename.push(
            <img className="g-img" src={props.info.picture[i]} alt="a logo" />
        )
    }
    return (
        // <div className='part' >
        <Container style={{marginBottom:"25rem"}}>
        <div className='row'>
            {/* <div className='shortcut' > */}
            <div className='col-md-3'>
                <div className='row resetPlace' >
                    <Button className='goBackButton'  onClick={goBackPicClick}>Go Back</Button>{' '}
                </div>
                <div className='row shortcut'>
                    <img className="short-img" src={props.info.picture[0]} alt="a logo" />
                    <h5 className='short-address'>{props.info.addressLine1}</h5>
                    <h6 className="house-info">Type: {props.info.type}</h6>
                    <h6 className='house-info'>Size: {props.info.size}</h6>
                    <h6 className='house-info'>Discription: {props.info.description}</h6>
                </div>
            </div>
            <div className='col-md-1'></div>
            {/* <div className='gallery'> */}
            <div className='col-md-8 gallery'>
                <p>Gallery Images</p>
                <hr className="solid" />
                <div className='img-group'>
                    {picfilename}
                </div>
            </div>
        </div >
        </Container>
    )
}