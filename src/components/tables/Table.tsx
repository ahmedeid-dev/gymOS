import {
    Box,
    TableFooter as MuiTableFooter,
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material';

export default function MainTable({
    TableHeaderArray,
    TableBody,
    TablePagination,
}: {
    TableHeaderArray?: any[];
    TableBody?: React.ReactNode;
    TablePagination?: React.ReactNode;
}) {

    return (
        <Box sx={{
            borderRadius: 0,
            width: "100%",
            display: "grid",
            height: "100%",
            alignContent: "space-between",
            gridTemplateRows: "auto 1fr auto",
            flex: 1,
            overflow: "hidden",
        }}>
            <TableContainer
                sx={{
                    width: "100%",
                    height: "100%",
                    overflow: "auto",
                    position: "relative",
                }}
                id="floating-head-table-container"
            >
                <Table
                    aria-label="simple table">
                    <TableHead>
                        <TableRow sx={{
                            "& > *": {
                                fontWeight: "bold",
                                position: "sticky",
                                top: 0,
                                zIndex: 10,
                                backgroundColor: "#f5f5f5",
                                textTransform: "capitalize",
                            }
                        }}>
                            {TableHeaderArray?.map(({ name, className }, index) => (
                                <TableCell
                                    sx={{
                                        fontWeight: "bold",
                                    }}
                                    // align="right"
                                    key={index}
                                    className={className}
                                >
                                    {name}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    {TableBody && TableBody}
                    <MuiTableFooter>
                        <TableRow sx={{
                            position: "sticky",
                            bottom: 0,
                            backgroundColor: "#f5f5f5",
                            zIndex: 9,
                        }}>
                            <TableCell colSpan={60} sx={{ padding: 0 }}>
                                {TablePagination && TablePagination}
                            </TableCell>
                        </TableRow>
                    </MuiTableFooter>
                </Table>
            </TableContainer >
        </Box>
    );
}
