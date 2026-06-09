import InputAdornment from '@mui/material/InputAdornment';
import { inputBaseClasses } from '@mui/material/InputBase';
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';

export default function TextInputField({
    label,
    name,
    control,
    loading,
    required,
    disabled,
    readOnly,
}: {
    label: string;
    name: string;
    control: any;
    loading?: boolean;
    required?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
}) {
    if (loading) return <div
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
        }}
    >Loading...</div>;
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <TextField
                    label={label}
                    variant="outlined"
                    required={required}
                    disabled={disabled}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    inputRef={field.ref}
                    slotProps={{
                        input: {
                            readOnly: readOnly,
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
            )}

        />
    )
}