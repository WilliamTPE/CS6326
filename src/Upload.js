import React from 'react';
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
            added: false
        }
    )

    function handleFileChange(event) {
        var picname = []
        // console.log(event.target.files)
        var file = event.target.files
        for (let i = 0; i < file.length; i++) {
            // console.log(file[i].name)
            picname.push(`./img/${file[i].name}`)
            //console.log(`./img/${file[i].name}`)
        }
        let update = []
        update = { "picture": picname }
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                ...update
            }



        })
    }

    function handleChange(event) {

        const { name, value, type, files } = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })

    }

    function handleButton() {
        props.formdata(formData)

        navigate('/searchPictures')
    }
    // console.log(formData)
    function handleSubmit(event) {
        event.preventDefault()

    }


    //console.log(selectedFile)
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

                    {/* <div className='upload-section'> */}

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
                            />
                        </div>
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
                        <div className='upload-add'>
                            <h4>Pictures</h4>
                            <input
                                type="textarea"
                                onChange={handleChange}
                                name="description"
                                value={formData.description}
                                placeholder="simple escription of the house"
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

                        <button className="upload-button" onClick={handleButton}>Upload</button>
                    </form>
                    {/* </div> */}

                </div>

            </div>



        </Container >

    )
}