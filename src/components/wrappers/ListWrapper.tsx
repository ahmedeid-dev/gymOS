import { Box } from "@mui/material";
import Breadcrumbs from "../Breadcrumbs";
import MainTable from "../Table";
import FiltersDrawer from "../FiltersDrawer";
import TextInputField from "../inputs/TextInputField";
import { useState } from "react";

export default function ListWrapper() {

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
                <button onClick={toggleDrawer}>Toggle Drawer</button>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    flex: 1,
                    overflow: "hidden",
                    position: "relative",
                }}
            >
                <FiltersDrawer
                    openDrawer={!!openDrawer}
                >
                    <TextInputField />
                </FiltersDrawer>
                <MainTable />
            </Box>
        </Box>
    )
}
