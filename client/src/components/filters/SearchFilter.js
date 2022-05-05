import { KeyboardReturn, Search } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";
import { useState } from "react";

const SearchFilter = () => {
	const [ searchTerm, setSearchTerm ] = useState( '' );
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
			value={searchTerm}
			onChange={(event) => setSearchTerm( event.target.value )}
		/>
	);
};

export default SearchFilter;