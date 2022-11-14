import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ReactQuill, { Quill } from "react-quill";
import { useNavigate } from "react-router-dom";
import {
    Container,
    Grid,
    Box,
    Typography,
    Button,
    TextField,
    Autocomplete,
    Chip,
    Accordion,
    AccordionSummary,
    AccordionDetails
} from "@mui/material";
import { db } from '../firebaseSetup/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

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

export default function QuestionForms() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tag, setTag] = useState([]);
    const navigate = useNavigate();

    /* Quilljs */
    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"]
        ]
    };

    /* function to add new question to firestore */
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await addDoc(collection(db, 'questions'), {
                title: title,
                description: description,
                tag: tag,
                created: Timestamp.now()
            });
            navigate('/forum');
        } catch (err) {
            alert(err)
        }
    }
    function goBack() {
        navigate('/forum')
    }
    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="lg" sx={{ my: 3 }} style={{ marginTop: '3rem', marginBottom: '30rem' }}>
                <Grid container spacing={{xs:2, md:3}} columns={{xs:4, sm:8, md:12}}>
                    <Grid item xs={4}>
                        <Button variant="contained" color="primary" onClick={goBack} style={{ marginBottom: '2rem' }}>Go Back</Button>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Summarize the question</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    <ul>
                                        <li>Include details about your goal</li>
                                        <li>Describe expected</li>
                                    </ul>
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                                <Typography>Describe what you've tried</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    <ul>
                                        <li>Include details about Describe what you've tried</li>
                                    </ul>
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel3a-content"
                                id="panel3a-header"
                            >
                                <Typography>Share some thoughts</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    <ul>
                                        <li>Share some thoughts</li>
                                    </ul>
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                    <Grid item xs={8}>
                        <form onSubmit={handleSubmit} name='addQuestion'>
                            <Box display="grid" sx={{ display: "flex" }}>
                                <Typography sx={{ flexGrow: 1, typography: { sm: 'h4', xs: 'h5' } }}>
                                    Ask a question
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    value="Submit"
                                >
                                    Post Question
                                </Button>
                            </Box>
                            <Box
                                sx={{
                                    my: 2,
                                    p: 2,
                                    border: "2px solid",
                                    borderColor: "primary",
                                    borderRadius: 2
                                }}
                            >
                                <Box sx={{ my: 1 }}>
                                    <Typography variant="h6" gutterBottom>
                                        Title
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        label="Enter title"
                                        id="fullWidth"
                                        type="text"
                                        name="title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </Box>
                                <Box sx={{ my: 1 }}>
                                    <Typography variant="h6" gutterBottom>
                                        Body
                                    </Typography>
                                    <Typography variant="body2" color="grey" gutterBottom>
                                        Include all the information you want to ask
                                    </Typography>
                                    <ReactQuill
                                        theme="snow"
                                        modules={modules}
                                        value={description}
                                        onChange={setDescription}
                                    />
                                </Box>
                                <Box sx={{ my: 1 }}>
                                    <Typography variant="h6" gutterBottom>
                                        Tag
                                    </Typography>
                                    <Typography variant="body2" color="grey" gutterBottom>
                                        Add up to 5 tags to describe what your question is about
                                    </Typography>
                                    <Autocomplete
                                        multiple
                                        id="tags"
                                        options={top10tags.map((option) => option.title)}
                                        freeSolo
                                        renderTags={(value, getTagProps) =>
                                            value.map((option, index) => (
                                                <Chip
                                                    variant="outlined"
                                                    label={option}
                                                    {...getTagProps({ index })}
                                                />
                                            ))
                                        }
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Tags"
                                                placeholder="Related Tag"
                                            />
                                        )}
                                        value={tag}
                                        onChange={(_event, newTag) => { setTag(newTag); }}
                                    />
                                </Box>
                            </Box>
                        </form>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    );
}

const top10tags = [
    { title: "House" },
    { title: "Garden" },
    { title: "DIY" },
    { title: "Floor" },
    { title: "Pool" },
    { title: "Pest" },
    { title: "Paint" },
    { title: "Wall" }
];