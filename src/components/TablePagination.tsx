import { TablePagination as MuiTablePagination } from '@mui/material';
import {
    type ChangeEvent,
    type MouseEvent,
    useState
} from 'react';
export default function TablePagination() {
    const [page, setPage] = useState<number>(2);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);

    const handleChangePage = (
        event: MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <MuiTablePagination
            sx={theme => ({
                position: "sticky",
                bottom: 0,
                backgroundColor: theme.palette.primary.main,
                borderTop: `1px solid ${theme.palette.divider}`,
                zIndex: 9,
            })}
            component="div"
            count={100}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    );
}
