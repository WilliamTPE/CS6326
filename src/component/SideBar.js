import { Box, Typography, Stack, Chip } from "@mui/material";
import React from "react";

export default function SideBar() {
    return (
        <Box sx={{ P: 1 }}>
            <Box sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                    Related Tags
                </Typography>
                <Stack
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    spacing={1}
                >
                    <Chip label="tag" size="small" />
                </Stack>
            </Box>
            <Box sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                    Hot Questions
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                    subtitle2. Lorem ipsum dolor sit amet,
                </Typography>
            </Box>
        </Box>
    );
}
