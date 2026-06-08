import { Box } from "@mui/material";
import { useState } from "react";
import Breadcrumbs from "../Breadcrumbs";
import FiltersDrawer from "../FiltersDrawer";
import TextInputField from "../inputs/TextInputField";
import EmptyTable from "../tables/EmptyTable";

export default function ListWrapper({
    children,
    isEmpty = false,
}: {
    children: React.ReactNode;
    isEmpty?: boolean;
}) {

    const [openDrawer, setOpenDrawer] = useState(false);
    const toggleDrawer = () => setOpenDrawer(prevOpen => !prevOpen);
    const icons = [
        {
            label: "Toggle",
            icon: <i className="fa fa-home" />,
            onClick: () => toggleDrawer(),
        },
        {
            label: "Users",
            icon: <i className="fa fa-user" />,
            onClick: () => console.log("user clicked"),
            href: "/users",
        }
    ];
    return (
        <Box
            sx={{
                pt: 9,
                display: "flex",
                flexDirection: "column",
                height: "100dvh",
            }}
        >
            <Box sx={{ pb: 2 }}>
                <Breadcrumbs
                    icons={icons}
                />
            </Box>

            <Box
                sx={{
                    display: "flex",
                    flex: 1,
                    overflow: "hidden",
                    position: "relative",
                    flexGrow: 1,
                }}
            >
                {openDrawer && <FiltersDrawer
                    openDrawer={!!openDrawer}
                >
                    <TextInputField />
                </FiltersDrawer>}
                {isEmpty ? (
                    <EmptyTable />
                ) : children}
            </Box>
        </Box>
    )
}
