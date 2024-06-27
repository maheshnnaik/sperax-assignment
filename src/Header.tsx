import { Box, Link, Button, Typography, SxProps, Theme } from "@mui/material"
import { Loading } from "./components/Loading"
import { connect } from "./utils/utility"
import SperaxLogo from "./images/SperaxLogo.svg"
import { useState } from "react"
import styled from "@emotion/styled"

const HeaderComponent = styled.header`
    min-height: 10vh;
    max-height: 15vh;
    width: 100%;
    padding: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    top: 0px;
    border-bottom: 1px solid #CCCCCC;
    background-color: white;
    z-index: 2
`


const connectButtonStyle: SxProps<Theme> = {
    // background: 'none',
    background: '#31C1BF',
    borderRadius: '90px',
    right: '1rem',
    '&:hover': {
        backgroundColor: '#31C1BF',
    },
    '&:disabled': {
        backgroundColor: '#31C1BF',
        color: 'white'
    }
}
export const Header = (props: any) => {
    const {isConnected, accountAddress, setIsConnected, setAccountAddress} = props;
    const [isLoading, setIsLoading] = useState(false);

    const onConnect = async () => {
        try {
            setIsLoading(true);
            const account = await connect();
            setIsConnected(true);
            setAccountAddress(account);
        } catch (error) {
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <HeaderComponent>
            <Box>
                <Link href="https://sperax.io" target="_blank"><img src={SperaxLogo} alt="Sperax Logo" /></Link>
            </Box>
            <Button
                sx={connectButtonStyle}
                variant="contained"
                onClick={onConnect}
                disabled={isLoading || isConnected}
            >
                <Box sx={{ width: "100%", padding: "4px 20px 4px 20px" }}>
                    <Typography fontSize="1rem">
                        {isConnected &&
                            accountAddress.slice(0, 5) + "..." + accountAddress.slice(-5)}
                        {!isConnected && !isLoading && "Connect Wallet"}
                    </Typography>
                    {isLoading && <Loading />}
                </Box>
            </Button>
        </HeaderComponent>
    )
}