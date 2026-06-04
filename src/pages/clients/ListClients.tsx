import { useMemo } from 'react';
import MainTable from '../../components/tables/Table';
import ListWrapper from '../../components/wrappers/ListWrapper';
import TablePagination from '../../components/tables/TablePagination';

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
    return (
        <ListWrapper>
            <MainTable
                TableHeaderArray={ListClientsArray}
                TablePagination={ListCouchesPagination}
            />
        </ListWrapper>
    )
}
