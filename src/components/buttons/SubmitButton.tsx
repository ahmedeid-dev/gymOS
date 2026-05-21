import { Button } from '@mui/material'

export default function SubmitButton({
    label,
    type = 'submit',
    onSubmit,
    ...props
}: {
    label: string
    type?: 'submit' | 'button'
    onSubmit?: () => void
}) {
    return (
        <Button
            type={type}
            onClick={onSubmit}
            fullWidth
            variant={"outlined"}
            {...props}
        >
            {label}
        </Button>
    )
}
