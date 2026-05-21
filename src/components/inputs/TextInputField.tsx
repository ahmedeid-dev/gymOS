import InputAdornment from '@mui/material/InputAdornment';
import { inputBaseClasses } from '@mui/material/InputBase';
import TextField from '@mui/material/TextField';

export default function TextInputField() {

    return (
        <TextField
            id="outlined-suffix-shrink"
            label="Outlined"
            variant="outlined"
            slotProps={{
                input: {
                    endAdornment: (
                        <InputAdornment
                            position="end"
                            sx={{
                                opacity: 0,
                                pointerEvents: 'none',
                                [`[data-shrink=true] ~ .${inputBaseClasses.root} > &`]: {
                                    opacity: 1,
                                },
                            }}
                        >
                            lbs
                        </InputAdornment>
                    ),
                },
            }}
        />
    );
}

