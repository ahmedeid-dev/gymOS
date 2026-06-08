import { Box, Typography } from '@mui/material';

export default function EmptyTable() {
    const image = new URL("./../../assets/empty.webp", import.meta.url);
    return (
        <Box
            sx={{
                height: "100%",
                width: "100%",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                // flexGrow: 1,
                margin: "auto",
                // backgroundColor: "#09c",
            }}
        >
            <img
                src={image?.pathname}
                style={{
                    backgroundSize: "cover",
                    width: "50%"
                }}
                alt="empty" />
            <Typography
                variant="h6"
                sx={{
                    // color: "white",
                    fontWeight: "bold"
                }}
            >
                No data found
            </Typography>
        </Box >
    )
}
