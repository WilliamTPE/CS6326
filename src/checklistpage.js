import React,{useState} from 'react';
import {Container, DropdownButton, Dropdown, Button} from 'react-bootstrap';
import './checklistpage.css'
import ListTable from './listtable.js'
import checkListContent from './checklist.json'

function CheckListPage(){
    const [value1,setValue1]=useState('Select');
    const handleSelect1=(e)=>{
        // console.log(e);
        setValue1(e)
    }
    const [value2,setValue2]=useState('Select');
    const handleSelect2=(e)=>{
        setValue2(e)
    }

    // set default display list
    var defaultList = [];
    for(let i = 0; i < checkListContent.length; i++){
        for(let j = 0; j < checkListContent[i].Size.length; j++){
            var curContent = (
                <tr key ={i+"+"+j}>
                    <td>{checkListContent[i].Type}</td>
                    <td>{checkListContent[i].Size[j]}</td>
                    <td><a href="./Home Inspection Checklist.pdf" onClick={clickDownload} download>Download</a></td>
                </tr>
            )
            defaultList.push(curContent);
        }
    }

    // search click event
    const [displayList, setDisplayList] = useState(defaultList);
    function searchClick(){
        var list = [];
        var type = document.getElementById('typeSelect').textContent
        var size = document.getElementById('sizeSelect').textContent
        for(let i = 0; i < checkListContent.length; i++){
            for(let j = 0; j < checkListContent[i].Size.length; j++){
                var curContent = (
                    <tr key ={i+"+"+j}>
                        <td>{checkListContent[i].Type}</td>
                        <td>{checkListContent[i].Size[j]}</td>
                        <td><a href="./Home Inspection Checklist.pdf" onClick={clickDownload} download>Download</a></td>
                    </tr>
                )
                if(type === checkListContent[i].Type && size.includes(checkListContent[i].Size[j])){
                    list.push(curContent);
                    break;
                    // console.log(curContent)
                }else if(type === checkListContent[i].Type && size === "Select"){
                    list.push(curContent);
                }else if(type === "Select" && size.includes(checkListContent[i].Size[j])){
                    list.push(curContent);
                }
                // console.log(size)
            }
        }
        setDisplayList(list)
        // console.log(displayList)
    }
    // console.log(checkListContent)
    function resetClick(){
        setDisplayList(defaultList)
        setValue1("Select")
        setValue2("Select")
    }
    function clickDownload(e){
        alert("Download Successful!")
    }


    return(
        <Container className='listPageContainer'>
        <div className="row justify-content-center" >
            <h2 className='list-heading' style={{marginTop:'4rem'} }> We provide specified self-check lists for variant homes. </h2>
            <h2 className='list-heading' > Please select your future home specification. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </h2>
        </div>
        <div className="row justify-content-center" >
            <div className="col-lg-3">
            <h4> Type </h4>
            <DropdownButton id='typeSelect' className="dropdown-basic-button" title={value1} onSelect={handleSelect1}>
                <Dropdown.Item href="#/action-1" eventKey="Apartment">Apartment</Dropdown.Item>
                <Dropdown.Item href="#/action-2" eventKey="Condo">Condo</Dropdown.Item>
                <Dropdown.Item href="#/action-3" eventKey="Single-Family">Single-Family</Dropdown.Item>
                <Dropdown.Item href="#/action-3" eventKey="Town Home">Town Home</Dropdown.Item>
                <Dropdown.Item href="#/action-3" eventKey="Contemporary">Contemporary</Dropdown.Item>
            </DropdownButton>
            <Button className='resetButton'  onClick={resetClick}>Reset</Button>{' '}

            </div>
            <div className="col-lg-3">
            <h4> Size </h4>
            <DropdownButton id='sizeSelect' className="dropdown-basic-button" title={value2} onSelect={handleSelect2}>
                <Dropdown.Item href="#/action-1" eventKey="< 1000 sq ft."> &lt; 1000 sq ft. </Dropdown.Item>
                <Dropdown.Item href="#/action-2" eventKey="1001 ~ 2000 sq ft."> 1001 ~ 2000 sq ft. </Dropdown.Item>
                <Dropdown.Item href="#/action-3" eventKey="2001 ~ 3000 sq ft."> 2001 ~ 3000 sq ft. </Dropdown.Item>
                <Dropdown.Item href="#/action-3" eventKey="3001 ~ 4000 sq ft."> 3001 ~ 4000 sq ft. </Dropdown.Item>
                <Dropdown.Item href="#/action-3" eventKey="> 4000 sq ft."> &gt; 4000 sq ft. </Dropdown.Item>
            </DropdownButton>

            </div>
            <div className="col-lg-1">
                <h4> &nbsp; </h4>
                <Button className='searchButton' onClick={searchClick}>Search</Button>{' '}
            </div>
            {/* <div className="col-lg-3">

            </div> */}
        </div>
        <div className="row flex-fill justify-content-center" style={{marginTop:'5rem'}}>
            <div className='col-md-7'>
                <ListTable listBody={displayList} />
            </div>
        </div>
        {/* <h4>You selected {value1}</h4> */}
        </Container>
    )
}

export default CheckListPage;