import { useState } from "react";
import { Box, SxProps, Theme } from "@mui/material";
import { TokenBalance } from "./TokenBalance";
import TokenTransfer from "./TokenTransfer";
import { Header } from "./Header";


/**
 * Home component
 * 
 * This component renders the home page of the application. It displays the header
 * and two sections: TokenBalance and TokenTransfer.
 * 
 * @param {Object} props - The component props, containing accountAddress, isConnected,
 * setIsConnected and setAccountAddress.
 * @returns {JSX.Element} - The rendered Home component.
 */
export const Home = (props: any) => {
    // Destructure props
    const { accountAddress, isConnected, setIsConnected, setAccountAddress } = props;
    
    // State variable for storing the ERC20 token address
    const [erc20Address, setERC20Address] = useState("");
    
    // Render the home page
    return (
        <Box>
            <Box>
                <Header 
                    isConnected={isConnected} 
                    accountAddress={accountAddress} 
                    setIsConnected={setIsConnected} 
                    setAccountAddress={setAccountAddress} 
                />
            </Box>

            <Box
                sx={{ 
                    display: "grid", 
                    gap: "60px", 
                    paddingTop: "calc(10vh + 16px)" 
                }}
            >
                {/* Render the TokenBalance section */}
                <TokenBalance
                    erc20Address={erc20Address}
                    setERC20Address={setERC20Address}
                    isConnected={isConnected}
                />
                
                {/* Render the TokenTransfer section */}
                <TokenTransfer
                    erc20Address={erc20Address}
                    isConnected={isConnected}
                />
            </Box>
        </Box>
    );
}
