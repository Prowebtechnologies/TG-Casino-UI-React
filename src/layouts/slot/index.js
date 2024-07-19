import Grid from "@mui/material/Grid";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Header from "layouts/coinflip/components/Header";
import GameField from "./components/GameField";

function Slot() {
  return (
    <DashboardLayout>
      <Header />
      <Grid container spacing={3} mb="30px">
        <Grid item xs={12} md={12} xl={6}>
          <GameField />
        </Grid>
      </Grid>
      <Footer />
    </DashboardLayout>
  );
}

export default Slot;
