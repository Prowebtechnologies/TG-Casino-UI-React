

// @mui material components
// @mui icons
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Images
// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import Footer from "examples/Footer";
// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// Overview page components
import Header from "layouts/coinflip/components/Header";
import GameField from "./components/GameField";

function Coinflip() {
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

export default Coinflip;
