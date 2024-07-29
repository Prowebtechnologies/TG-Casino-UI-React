import Grid from "@mui/material/Grid";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Header from "layouts/coinflip/components/Header";
import GameField from "./components/GameField";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function Plinko() {
  const { plinkoRunning } = useSelector((state) => state.game);
  const alertUser = (e) => {
    if (plinkoRunning > 0) {
      e.preventDefault()
      alert('You are betting. Reload?')
    }
  }
  useEffect(() => {
    window.addEventListener('beforeunload', alertUser)
    return () => {
      window.removeEventListener('beforeunload', alertUser)
    }
  }, [plinkoRunning])  
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

export default Plinko;
