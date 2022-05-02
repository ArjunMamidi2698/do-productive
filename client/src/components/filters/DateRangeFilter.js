import * as React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
const DateRangeFilter = () => {
	const [value, setValue] = React.useState(null);

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<DatePicker
				disabled
				label="Search Date From"
				value={value}
				onChange={(newValue) => {
					setValue(newValue);
				}}
				renderInput={(params) => <TextField {...params} />}
				maxDate={new Date()}
				minDate={new Date( "01/01/2022" )}
				inputFormat="dd-MM-yyyy"
			/>
		</LocalizationProvider>
	);
};

export default DateRangeFilter;
