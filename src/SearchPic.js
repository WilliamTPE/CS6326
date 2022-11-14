import React, { useEffect, useState, useCallback } from 'react';
import './searchPic.css'
import { useNavigate, Link } from 'react-router-dom';
import data from './house.json'
import {Card, Pagination, Button, Container} from 'react-bootstrap';
// import { hasSelectionSupport } from '@testing-library/user-event/dist/utils';
// import Pagination from '@mui/material/Pagination';

export default function SearchPic(props) {
    const [address, setAddress] = useState("")
    function handleChange(event) {
        setAddress(event.target.value)
    }
    
    const navigate = useNavigate();
    const navigateToDetail = (curData) => {
        // console.log(curData)
        // localStorage.setItem('curDisplayPicture', JSON.stringify(curData));
        props.getPicture(curData)
        navigate('/displayPictures');
    };

    // set uploaded data by 'upload.js'
    if (props.newPic.type != null) {
        if (props.newPic.added === false) {
            data.push(props.newPic)
            let tmp = props.newPic
            tmp.added = true
            props.method(tmp)
        }
    }
    data.sort((a, b) => a.addressLine1.localeCompare(b.addressLine1))
    // set display limit
    var pageLimit = 6;

    const [numPages, setNumPages] = useState(Math.ceil(data.length / pageLimit))

    var showlist = []
    var curLevel = []
    for(let i = 0; i < data.length; i++){
        curLevel.push(
                <Card className="show-each" onClick={navigateToDetail.bind(this, data[i])}>
                    <Card.Img src={data[i].picture[0]} className="list-img" />
                    <Card.Body>
                        <div className='address'>
                            {data[i].addressLine1}
                        </div>
                        <h6 className="house-info">Type: {data[i].type}</h6>
                        <h6 className='house-info'>Size: {data[i].size}</h6>
                    </Card.Body>
                </Card>
        )
        if(curLevel.length === pageLimit || i === data.length - 1){
            showlist.push([curLevel])
            curLevel = []
        }
    }
    // final display of contents
    const [display, setDisplay] = useState(showlist)
    // current page
    const [curPage, setCurPage] = useState(0)
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
        // console.log(display)
        setFilter(display[gotNum])
    }
    function goToSmallerPage(){
        if(curPage > 0){
            setFilter(display[curPage - 1])
            setCurPage(curPage - 1)
        }
    }
    function goToLargerPage(){
        // console.log(display.length / pageLimit)
        if(curPage < Math.ceil(display.length / pageLimit) ){
            setFilter(display[curPage + 1])
            setCurPage(curPage + 1)
        }
    }

    // display after search
    const [filter, setFilter] = useState(showlist[curPage])
    function resetClick(){
        setFilter(showlist[0])
        setDisplay(showlist)
        setCurPage(0)
        setAddress("")
        setNumPages(Math.ceil(data.length / pageLimit))
    }
    //console.log(showlist)
    
    function handleSearch() {
        const a = address.trim()
        var newdata = []
        setDisplay([])

        for (let i = 0; i < data.length; i++) {
            const cur = data[i].addressLine1
            if (cur.indexOf(a) !== -1) {
                newdata.push(data[i])
            }
        }
        newdata.sort((a, b) => a.addressLine1.localeCompare(b.addressLine1))
        var searchDisplay = []
        for(let i = 0; i < newdata.length; i++){
            curLevel.push(
                <Card className="show-each" onClick={navigateToDetail.bind(this, newdata[i])}>
                    <Card.Img src={newdata[i].picture[0]} className="list-img" />
                    <Card.Body>   
                        <div className='address'>
                            {newdata[i].addressLine1}
                        </div>
                        <h6 className="house-info">Type: {newdata[i].type}</h6>
                        <h6 className='house-info'>Size: {newdata[i].size}</h6>
                    </Card.Body>
                </Card>
            )
            if(curLevel.length === pageLimit || i === newdata.length - 1){
                searchDisplay.push([curLevel])
                curLevel = []
            }
        }
        
        setNumPages(Math.ceil(newdata.length / pageLimit))
        setCurPage(0)
        setDisplay(searchDisplay)
        setFilter(searchDisplay[0]);
    }

    return (
        <Container style={{marginBottom:'5rem'}}>
            <div className="toppart">
                <h3 className="title">Find a House</h3>
                <h6>What houses are you going to visit recently, find out the real looking.</h6>
                <div className="searchpart">
                    <input className='searchInput' type="text"
                        placeholder="Search for the address..."
                        onChange={handleChange}
                        name="address"
                        value={address}
                    >
                    </input>
                    <img className='click-search' src="/img/searchbar.png" alt="a logo" onClick={handleSearch} />
                    <img className='cancel-search' src="/img/cross.png" alt="a logo" onClick={resetClick} />
                </div>
                <h4 className="upload-word">Visited a house recently? Share your experience with others</h4>
                <Link to='/Upload' className="link-upload" > &gt;&gt;&gt; Upload Review </Link>
            </div>


            <div className='row justify-content-left'>
                {filter}
            </div>
            <div className='page-number-content'>
                <Pagination>
                    <Pagination.Prev onClick={goToSmallerPage}/>
                    {pageNumbers}
                    <Pagination.Next onClick={goToLargerPage}/>
                </Pagination>
            </div>
        </Container>

    )
}