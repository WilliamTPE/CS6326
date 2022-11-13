import React from "react";
import {Box, Typography, Card} from "@mui/material";

export default function CommentContent({comment}){
    return (
        <Box sx={{m:1}}>
            <Card variant="outlined">
                <Typography variant="body1" sx={{px:2}}>
                    <div dangerouslySetInnerHTML={{__html: comment}}></div>
                </Typography>
            </Card>

        </Box>
    );
}