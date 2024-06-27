import React, { createContext, useCallback, useEffect, useState } from "react";
import { Box, SxProps, TextField, Theme, Typography } from "@mui/material";
import { getBalance, isConnected, isValidContractAddress } from "./utils/utility";
import { FormButton } from "./components/FormButton";
import { Info } from "./components/Info";
import { INVALID_ETHEREUM_ADDRESS } from "./utils/constant";

const ConnectContext = createContext('connect')
const style: SxProps<Theme> = {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '16px'
}

const formContainerStyle: SxProps<Theme> = {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignContent: 'center',
    backgroundColor: '#F4F6F8',
    width: '540px',
    borderRadius: '12px',
    boxShadow: '0px 2px 5px 0px #0000004D',
    gap: '20px'
}

const formStyle: SxProps<Theme> = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '500px',
    borderRadius: '12px',
    gap: '20px',
	padding: '1rem 0'
}
/**
 * Component for displaying the balance of an ERC20 token.
 *
 * @param {Object} props - The component props.
 * @returns {JSX.Element} - The rendered TokenBalance component.
 * 
 */
export const TokenBalance = (props: any) => {

    // State variables
    const [isLoading, setIsLoading] = useState(false); // Indicates if the balance is being fetched
    const [balance, setBalance] = useState("0.00"); // The balance of the ERC20 token
    const [isValid, setIsValid] = useState(true); // Indicates if the ERC20 token address is valid
    const [showBalanceInfo, setShowBalanceInfo] = useState(false); // Indicates if the balance info should be displayed
    const { erc20Address, setERC20Address, isConnected } = props; // Component props
	const [showConnect, setShowConnect] = useState(false); // Indicates if the user should be prompted to connect to the wallet

    // Validate the ERC20 token address on component mount
    useEffect(() => {
        const isValidAddress = async() => {
            const isValidAddress = await isValidContractAddress(erc20Address);
            setIsValid(prev => prev !== isValidAddress ? isValidAddress : prev);
        }
        isValidAddress();
    }, [erc20Address]);

	// Reset the showConnect state whenever the isConnected state changes
    useEffect(() => {
        setShowConnect(false)
    }, [isConnected]);

    /**
     * Handles the form submit event.
     * Fetches the balance of the ERC20 token and updates the state.
     *
     * @param {React.FormEvent<HTMLFormElement>} event - The form submit event.
     */
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
		if(!isConnected) {
			setShowConnect(true)
			return
		}
        setIsLoading(true);
        try {
            const balance = await getBalance(erc20Address);
            setShowBalanceInfo(true)
            setBalance(balance);
        } catch (error) {
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    }

    /**
     * Handles the input change event.
     * Updates the ERC20 token address in the state.
     *
     * @param {React.ChangeEvent<HTMLInputElement>} event - The input change event.
     */
    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setERC20Address(event.target.value);
    }

    return (
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					height: "auto",
					gap: "24px",
				}}
			>
				<Box sx={style}>
					<Typography
						variant="h1"
						color="black"
						fontSize="2rem"
						fontWeight={600}
						lineHeight="38px"
					>
						ERC20 Token Balance
					</Typography>
					<Box sx={formContainerStyle}>
						<Box component="form" sx={formStyle} onSubmit={handleSubmit}>
							<p
								style={{
									fontSize: "1rem",
									fontWeight: 500,
									lineHeight: "19px",
									height: "19px",
									position: "relative",
									top: "10px",
									margin: "0px",
								}}
							>
								Ethereum Address
							</p>
							<TextField
								sx={{ width: "500px", height: "40px", border: "1px" }}
								InputProps={{ sx: { borderRadius: "12px" } }}
								label="Enter Ethereum Address"
								variant="outlined"
								value={erc20Address}
								onChange={handleInput}
								size="small"
								error={isConnected && erc20Address.length > 0 && !isValid}
								helperText={isConnected && erc20Address.length > 0 && !isValid ? INVALID_ETHEREUM_ADDRESS : " "}
								required
							/>
							<FormButton submitText="Submit" isLoading={isLoading} />
							{showConnect && <Typography fontSize="1rem" margin={0} color={"#ea0404"}>Please connect to wallet</Typography>}

						</Box>
					</Box>
				</Box>

				{showBalanceInfo && <Info balance={balance} />}
			</Box>
		);
}
