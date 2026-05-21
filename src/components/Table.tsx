import {
    TableBody as MuiTableBody,
    TableFooter as MuiTableFooter,
    Paper,
    Table,
    Box,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import TablePagination from './TablePagination';

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function MainTable({
    TableHeaderArray,
    TableBody,
    TableFooter,
}: {
    TableHeaderArray?: any[];
    TableBody?: React.ReactNode;
    TableFooter?: React.ReactNode;
}) {
    return (
        <Box sx={{
            flex: 1,
            overflow: "hidden",
            borderRadius: 0,
            width: "100%",
            display: "grid",
            height: "100%",
            alignContent: "space-between",
        }}>
            <TableContainer
                sx={{
                    width: "100%",
                    height: "100%",
                    overflow: "auto",
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
                            <TableCell
                                sx={{
                                    fontWeight: "bold",
                                }}
                            >Dessert (100g serving)</TableCell>
                            <TableCell
                                sx={{
                                    fontWeight: "bold",
                                }}
                                align="right">Calories</TableCell>
                            <TableCell
                                sx={{
                                    fontWeight: "bold",
                                }}
                                align="right">Fat&nbsp;(g)</TableCell>
                            <TableCell
                                sx={{
                                    fontWeight: "bold",
                                }}
                                align="right">Carbs&nbsp;(g)</TableCell>
                            <TableCell
                                sx={{
                                    fontWeight: "bold",
                                }}
                                align="right">Protein&nbsp;(g)</TableCell>
                        </TableRow>
                    </TableHead>
                    <MuiTableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.calories}</TableCell>
                                <TableCell align="right">{row.fat}</TableCell>
                                <TableCell align="right">{row.carbs}</TableCell>
                                <TableCell align="right">{row.protein}</TableCell>
                            </TableRow>
                        ))}
                    </MuiTableBody>
                    <MuiTableFooter>
                        <TableRow sx={{
                            position: "sticky",
                            bottom: 0,
                            backgroundColor: "#f5f5f5",
                            zIndex: 9,
                        }}>
                            <TableCell colSpan={60} sx={{ padding: 0 }}>
                                <TablePagination />
                            </TableCell>
                        </TableRow>
                    </MuiTableFooter>
                </Table>
            </TableContainer >
        </Box>
    );
}
