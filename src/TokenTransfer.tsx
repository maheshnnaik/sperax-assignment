import React, { useEffect, useState } from "react";
import { Box, SxProps, TextField, Theme, Typography } from "@mui/material";
import { isValidAddress, transfer } from "./utils/utility";
import { FormButton } from "./components/FormButton";
import { INVALID_AMOUNT, INVALID_RECEPIENT_ADDRESS } from "./utils/constant";

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
 * TokenTransfer component
 * 
 * Component for transferring ERC20 tokens.
 * 
 * @param {any} props - The props object containing erc20Address and isConnected.
 * @returns {JSX.Element} - The rendered TokenTransfer component.
 */
const TokenTransfer = (props: any) => {

	// State variables
	const [isLoading, setIsLoading] = useState(false); // Loading state for form submission
	const [recepientAddress, setRecepientAddress] = useState(""); // State for storing recipient address
	const [inputAmount, setInputAmount] = useState(""); // State for storing token amount
	const [isValid, setIsValid] = useState(true); // Validity state for recipient address
	const [isValidAmount, setIsValidAmount] = useState(true); // Validity state for token amount
	const [showConnect, setShowConnect] = useState(false); // Flag to show connect wallet message
	const [transferSuccess, setTransferSuccess] = useState(false); // Flag for successful transfer
	const [transferFailed, setTransferFailed] = useState(false); // Flag for failed transfer

	// Destructure props
	const { erc20Address, isConnected } = props;

	// Reset showConnect flag when isConnected changes
	useEffect(() => {
		setShowConnect(false)
	}, [isConnected]);

	// Update isValid state based on recipient address validity
	useEffect(() => {
		const isValidRecepientAddress = isValidAddress(recepientAddress);
		setIsValid(prev => prev !== isValidRecepientAddress ? isValidRecepientAddress : prev);

	}, [recepientAddress]);

	// Update isValidAmount state based on token amount validity
	useEffect(() => {
		// Check if entered amount is valid or not
		if (isNaN(Number(inputAmount))) {
			setIsValidAmount(false)
		} else {
			setIsValidAmount(true)
		}
	}, [inputAmount]);

	/**
	 * Submit form handler
	 * 
	 * @param {React.FormEvent<HTMLFormElement>} event - The form submit event.
	 * @returns {Promise<void>} - A promise that resolves when the form is submitted.
	 */
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsLoading(true);
		try {
			await transfer(erc20Address, recepientAddress, inputAmount);
			setTransferSuccess(true);
			setTransferFailed(false);
		} catch (error) {
			setTransferFailed(true);
			setTransferSuccess(false);
		} finally {
			setIsLoading(false);
		}
	}

	/**
	 * Handles changes in recipient address input field.
	 * 
	 * @param {React.ChangeEvent<HTMLInputElement>} event - The input change event.
	 */
	const handleAddressInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRecepientAddress(event.target.value);
	}

	/**
	 * Handles changes in token amount input field.
	 * 
	 * @param {React.ChangeEvent<HTMLInputElement>} event - The input change event.
	 */
	const handleAmountInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputAmount(event.target.value);
	}

	return (
		<Box sx={style}>
			<Typography
				variant="h1"
				color="black"
				fontSize="2rem"
				fontWeight={600}
				lineHeight="38px"
			>
				Transfer ERC20 Tokens
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
						Recipient's Ethereum Address
					</p>

					<TextField
						sx={{ width: "500px", height: "40px", border: "1px" }}
						id="recepient"
						InputProps={{ sx: { borderRadius: "12px" } }}
						label="Enter Ethereum Address"
						variant="outlined"
						value={recepientAddress}
						onChange={handleAddressInput}
						size="small"
						error={recepientAddress.length > 0 && !isValid}
						helperText={
							recepientAddress.length > 0 && !isValid
								? INVALID_RECEPIENT_ADDRESS
								: ""
						}
						required
					/>
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
						Token Amount
					</p>

					<TextField
						sx={{ width: "500px", height: "40px", border: "1px" }}
						id="amount"
						InputProps={{ sx: { borderRadius: "12px" } }}
						label="Enter token amount"
						variant="outlined"
						value={inputAmount}
						onChange={handleAmountInput}
						size="small"
						error={isConnected && inputAmount.length > 0 && !isValidAmount}
						helperText={
							isConnected && inputAmount.length > 0 && !isValidAmount
								? INVALID_AMOUNT
								: ""
						}
						required
					/>
					<FormButton submitText="Transfer" isLoading={isLoading} />
					{showConnect && <Typography fontSize="1rem" margin={0} color={"#ea0404"}>Please connect to wallet</Typography>}
					{!isLoading && transferSuccess && <Typography fontSize="1rem" margin={0}>Transfer successful</Typography>}
					{!isLoading && transferFailed && <Typography fontSize="1rem" margin={0}>Transfer failed!!</Typography>}

				</Box>
			</Box>
		</Box>
	)
}

export default React.memo(TokenTransfer)