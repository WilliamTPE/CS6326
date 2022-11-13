import React from "react";
import {Box, Chip, Stack, Typography} from "@mui/material";

export default function QuestionContent({description, tag}) {
    
    let itemToRender;
    if(tag){
        itemToRender = tag.map( tag => {
           return  <Chip
               label={tag}
               size="small"
               color="primary"
           />
        });
    }
    return (
        <Box sx={{px:3}}>
            <Typography variant="body1" gutterBottom>
                <div dangerouslySetInnerHTML={{__html: description}}></div>
            </Typography>
            <Box sx={{py:3}}>
                <Stack direction="row" spacing={1}>
                    {itemToRender}
                </Stack>
            </Box>
        </Box>
    );
}