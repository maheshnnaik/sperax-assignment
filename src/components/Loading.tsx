import React from "react";
import { Box, CircularProgress, SxProps, Theme } from "@mui/material";

const loadingStyle: SxProps<Theme> = {
    color: 'white',
    width: '20px',
    height: '20px'
}
/**
 * Loading component
 * 
 * Component for displaying a loading state using CircularProgress from Material-UI.
 * 
 * @param {any} props - The props object containing custom styles.
 * @returns {JSX.Element} - The rendered Loading component.
 */
export const Loading = (props: any) => {
    return (
        <Box sx={{height: '20px'}}>
            <CircularProgress 
                sx={loadingStyle} 
                size="sm" 
                {...props} 
            />
        </Box>
    )
}
