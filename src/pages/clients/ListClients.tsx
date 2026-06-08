import { useMemo } from 'react';
import MainTable from '../../components/tables/Table';
import TablePagination from '../../components/tables/TablePagination';
import ListWrapper from '../../components/wrappers/ListWrapper';

export default function ListClients() {
    const ListClientsArray = useMemo(() => ([
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
    const ListCouchesPagination = useMemo(() => (
        <TablePagination />
    ), []);
    const rows = useMemo(() => (
        []), []);
    return (
        <ListWrapper isEmpty={rows?.length === 0}>
            <MainTable
                TableHeaderArray={ListClientsArray}
                TablePagination={ListCouchesPagination}
            />
        </ListWrapper>
    )
}
