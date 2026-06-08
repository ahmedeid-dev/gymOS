import {
    TableBody as MuiTableBody,
    TableCell,
    TableRow,
} from '@mui/material';
import { useCallback, useMemo } from 'react';
import MainTable from '../../components/tables/Table';
import TablePagination from '../../components/tables/TablePagination';
import ListWrapper from '../../components/wrappers/ListWrapper';

export default function ListCouches() {
    const ListCouchesHeader = useMemo(() => ([
        {
            name: "Dessert (100g serving)",
            className: "FH",
        },
        {
            name: "Calories",
        },
        {
            name: "Fat (g)",
        },
        {
            name: "Carbs (g)",
        },
        {
            name: "Protein (g)",
            className: "LH",
        },
        // ! add more
    ]), []);
    const createData = useCallback((
        name: string,
        calories: number,
        fat: number,
        carbs: number,
        protein: number,
    ) => {
        return { name, calories, fat, carbs, protein };
    }, []);
    const rows = useMemo(() => (
        [
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
        ]

    ), []);
    const ListCouchesBody = useMemo(() => (
        <MuiTableBody>
            {rows.map((row) => (
                <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row">
                        {row.name}
                    </TableCell>
                    <TableCell>{row.calories}</TableCell>
                    <TableCell>{row.fat}</TableCell>
                    <TableCell>{row.carbs}</TableCell>
                    <TableCell>{row.protein}</TableCell>
                </TableRow>
            ))}
        </MuiTableBody>
    ), [rows]);
    const ListCouchesPagination = useMemo(() => (
        <TablePagination />
    ), []);
    return (
        <ListWrapper isEmpty={rows?.length === 0}>
            <MainTable
                TableHeaderArray={ListCouchesHeader}
                TableBody={ListCouchesBody}
                TablePagination={ListCouchesPagination}
            />
        </ListWrapper>
    )
}
