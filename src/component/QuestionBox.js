import React from "react";
import {Box, Chip, Stack, Typography} from "@mui/material";
import { Link } from "react-router-dom";

export default function QuestionBox({id, title, description, tag}) {

    const data = description.replace(/(<([^>]+)>)/ig, '');

    return (
        <Box sx={{m:2}}>
            <Link to={"/question/"+id} style={{color: 'inherit', textDecoration: 'inherit'}}>
                <Typography variant="h4" gutterBottom>{title}</Typography>
            </Link>
            <Typography variant="body1" gutterBottom>{data.slice(0, 250)}...</Typography>
            <Stack direction="row" spacing={1}>
                {tag.map((tag) => {
                    return (
                        <Chip
                            label={tag}
                            size="small"
                            color="primary"
                        />
                    );
                })}
            </Stack>
        </Box>
    );
}