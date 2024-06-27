import { Box, SxProps, Theme, Typography } from "@mui/material";

const style: SxProps<Theme> = {
	width: "540px",
	height: "auto",
	backgroundColor: "#F4F6F8",
	boxShadow: "0px 2px 5px 0px #0000004D",
	display: "flex",
	padding: "61px 0px 0px 0px",
	gap: "10px",
	borderRadius: "12px",
	opacity: "0px",
};

const balanceStyle: SxProps<Theme> = {
	width: "100%",
	height: "auto",
	padding: "20px 0px 20px 0px",
	backgroundColor: "white",
	borderTop: "1px solid #CCCCCC",
	borderBottom: "1px solid #CCCCCC",
	borderRadius: "0px 0px 12px 12px",
	display: "flex",
	flexWrap: "wrap",
	justifyContent: "space-around",
};
/**
 * Info component
 * 
 * Component to display token balance.
 * 
 * @param {Object} props - The props object containing balance.
 * @param {string} props.balance - The token balance.
 * @returns {JSX.Element} - The rendered Info component.
 */
export const Info = ({ balance }: { balance: string }) => {
	return (
		<Box sx={style}>
			<Box sx={balanceStyle}>
				{/* Token balance label */}
				<Typography
					style={{
						margin: "0px",
						color: "black",
						fontSize: "18px",
						fontWeight: 400,
						lineHeight: "18.4px",
						alignSelf: "center",
						fontFamily: "inherit",
					}}
				>
					Token Balance
				</Typography>
				{/* Token balance value */}
				<Typography
					sx={{
						margin: "0px",
						color: "black",
						fontSize: "24px",
						fontWeight: 600,
						lineHeight: "28px",
						alignSelf: "center",
					}}
				>
					{balance}
				</Typography>
			</Box>
		</Box>
	);
};
