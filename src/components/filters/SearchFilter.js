import { KeyboardReturn, Search } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";

const SearchFilter = () => {
	return (
		<TextField
			disabled
			label="search"
			variant="outlined"
			InputProps={{
				startAdornment: (
					<InputAdornment position="start">
						<Search />
					</InputAdornment>
				),
				endAdornment: (
					<InputAdornment position="end">
						<KeyboardReturn />
					</InputAdornment>
				)
			}}
		/>
	);
};

export default SearchFilter;