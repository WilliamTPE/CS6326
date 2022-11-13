import { Container, Grid } from "@mui/material";
import React from "react";
import QuestionList from "../component/QuestionList";
import SideBar from "../component/SideBar";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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
    return (
        <ThemeProvider theme={theme}>
            <Container>
                <Grid container spacing={2}>
                    <Grid xs={9}>
                        <QuestionList />
                    </Grid>
                    <Grid xs={3}>
                        <SideBar />
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    );
}
