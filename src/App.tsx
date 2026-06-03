import { Outlet } from "react-router-dom";
import MainLayout from "./components/Layout";
export default function App() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  )
}
