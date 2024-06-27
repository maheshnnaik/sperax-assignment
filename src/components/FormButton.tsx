import { SxProps, Theme, Button } from "@mui/material";
import { Loading } from "./Loading";

const style: SxProps<Theme> = { 
    width: '90px', 
    height: '38px', 
    borderRadius: '50px', 
    backgroundColor: '#31C1BF', 
    textTransform: 'unset', 
    boxShadow: '2px 2px 7px 0px #00000033',
    '&:hover': {
        backgroundColor: '#31C1BF',
    },
    '&:disabled': {
        backgroundColor: '#31C1BF',
    }
}

/**
 * FormButton component.
 *
 * This component renders a button with specific styles used in forms.
 * It accepts a prop 'isLoading' which determines whether to display a loading spinner or the submitText.
 *
 * @param {Object} props - Component props.
 * @param {boolean} props.isLoading - Determines whether to display a loading spinner or the submitText.
 * @param {string} props.submitText - The text to display on the button.
 * @returns {JSX.Element} The FormButton component.
 */
export const FormButton = (props: { isLoading: boolean, submitText: string }) => {

    const {isLoading} = props;

    return (
        <Button
            sx={style} 
            type="submit"
            variant="contained" 
            color="primary"> 
            {isLoading ? <Loading /> : props.submitText}
        </Button>
    )
}
