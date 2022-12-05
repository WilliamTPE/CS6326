import React, { useEffect } from 'react';
import './upload.css'
import Container from 'react-bootstrap/Container';
import { BsImages } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default function Upload(props) {

    const [formData, setFormData] = React.useState(
        {
            addressLine1: "",
            addressLine2: "",
            type: "",
            size: "",
            description: "",
            picture: [],
            added: false,
            checkaddress1: false,
            checkpic: false,
            checksize: false
        }
    )


    function handleFileChange(event) {
        var picname = []

        var file = event.target.files
        for (let i = 0; i < file.length; i++) {

            picname.push(`./img/${file[i].name}`)

        }

        let update = []
        update = { "picture": picname, "checkpic": true }
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                ...update
            }
        })

    }

    function handleChange(event) {
        let update = []
        const { name, value } = event.target
        if (name === "addressLine1" && value != 0) {
            update = { checkaddress1: true }
        }
        let update1 = []
        if (name === "size" && value != 0) {
            update1 = { checksize: true }
        }

        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value,
                ...update,
                ...update1
            }
        })

    }
    console.log(formData)
    function handleButton(e) {
        props.formdata(formData)

        if (formData.checkaddress1 === false || formData.checkpic === false) {
            alert("Please fill out required area")
            e.preventDefault()
        }

        if (formData.checkaddress1 === true && formData.checkpic === true) {
            navigate('/searchPictures')
        }

    }

    function handleSubmit(event) {
        event.preventDefault()
    }

    let navigate = useNavigate();
    function goBackPicClick() {
        navigate('/searchPictures')
    }


    return (

        <Container style={{ marginBottom: "25rem" }}>

            <div className='row'>
                <div className='col-md-2'>
                    <div className='row resetPlace' >
                        <Button className='goBackButton' onClick={goBackPicClick}>Go Back</Button>{' '}
                    </div>
                </div>
                <div className='col-md-1'></div>
                <div className='col-md-8 upload-section'>
                    <div className='upload-head'>
                        <h4 className='upload-title'>Review a House</h4>
                        <h6 className='upload-quot'>Visit a house recently? Share your experience with others</h6>
                    </div>
                    <form className='upload-form' onSubmit={handleSubmit}>

                        <div className='upload-add'>
                            <h4>Address Line 1</h4>
                            <input
                                type="text"
                                onChange={handleChange}
                                name="addressLine1"
                                value={formData.addressLine1}
                                id="ad1"
                            />

                        </div>
                        {!formData.checkaddress1 && <p>*Please enter address</p>}
                        <div className='upload-add'>
                            <h4>Address Line 2</h4>
                            <input
                                type="text"
                                onChange={handleChange}
                                name="addressLine2"
                                value={formData.addressLine2}
                            />
                        </div>
                        <div className='upload-type'>
                            <h4>Type</h4>
                            <select
                                id="type"
                                value={formData.type}
                                onChange={handleChange}
                                name="type"
                            >
                                <option value="">-- Choose --</option>
                                <option value="Apartment">Apartment</option>
                                <option value="Townhome">Town Home</option>
                                <option value="Condo">Condo</option>
                                <option value="Single-family">Single-Family</option>
                                <option value="Contemporary">Contemporary</option>
                            </select>
                        </div>
                        <div className='upload-add'>
                            <h4>Size</h4>
                            <input
                                type="text"
                                onChange={handleChange}
                                name="size"
                                value={formData.size}

                            />
                        </div>
                        {!formData.checksize && <p>*Please enter house size</p>}
                        <div className='upload-add'>
                            <h4>Pictures</h4>
                            <input
                                type="textarea"
                                onChange={handleChange}
                                name="description"
                                value={formData.description}
                                placeholder="simple description of the house"

                            />

                        </div>

                        <div className='upload-pic'>
                            <label for="inputTag">
                                Select Image <br />
                                <BsImages size='70' />
                                <input id="inputTag" type="file" name="picture" multiple onChange={handleFileChange} />
                                <br />

                            </label>
                        </div>
                        {!formData.checkpic && <p>*Please select pictures</p>}
                        <button className="upload-button" onClick={handleButton}>Upload </button>

                    </form>


                </div>

            </div>



        </Container >

    )
}