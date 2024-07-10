import React from "react";
import { useState } from "react";
// @mui components
import { Card, Stack } from "@mui/material";

// Vision UI Dashboard assets
import balance from "assets/images/billing-background-balance.png";
import Heads from "assets/images/heads.webp";
import Tails from "assets/images/tails.webp";

import palette from "assets/theme/base/colors";

// Vision UI Dashboard components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiButton from "components/VuiButton";
// React icons
import { MdOutlineDomain } from "react-icons/md";
import {Box} from "@mui/material";
import './index.css'

const GameField = () => {
  const [spin, setSpin] = useState("");
  const [coin, setCoin] = useState(false);
  const [playing, setPlaying] = useState(false);

  const coinflip = () => {
    setPlaying(true);
    setCoin(!coin);
    setSpin(coin? "spin-heads" : "spin-tails");
    setTimeout(() => {setPlaying(false)}, 3000)
    // setSpin("")
  }
  return (
    <Card sx={{ padding: "30px" }}>
      <VuiBox display="flex" flexDirection="column">
        <VuiBox
          mb="32px"
          p="20px"
          display="flex"
          flexDirection="column"
          sx={{ backgroundImage: `url(${balance})`, backgroundSize: "cover", borderRadius: "18px" }}
        >
          <VuiBox display="flex" justifyContent="space-beetween" alignItems="center">
            <Box className="coin" id="coin" sx={{ animation : `${spin} 2.5s forwards`, aspectRatio:'1/1'}}>
              <Box className="heads">
                <img src={Heads}/>
              </Box>
              <Box className="tails">
                <img src={Tails}/>
              </Box>
            </Box>

            {/* <VuiBox component="img" src={Graph} sx={{ width: "100%", aspectRatio: "1/1" }} /> */}
          </VuiBox>
        </VuiBox>
        <VuiBox display="block" justifyContent="space-beetween" alignItems="center">
          <Stack direction="row" mx="auto" spacing="10px" sx={{width:'100%'}} >
            <VuiButton variant="contained" color="warning" sx={{width:"50%"}} onClick={coinflip}>
              Heads
            </VuiButton>
            <VuiButton variant="contained" color="info" sx={{width:"50%"}} onClick={coinflip}>
              Tails
            </VuiButton>
          </Stack>
          <Stack direction="row" spacing="10px" m="auto" mt="10px">
            <VuiButton variant="contained" color="warning" sx={{width:"100%"}}>
              Bet
            </VuiButton>
          </Stack>
        </VuiBox>
        <VuiBox display="flex" justifyContent="space-beetween" alignItems="center">
          <Stack direction="row" spacing="10px" mr="auto">
            <VuiBox
              display="flex"
              mr="10px"
              justifyContent="center"
              alignItems="center"
              sx={{
                background: "rgba(34, 41, 78, 0.7)",
                borderRadius: "50%",
                width: "42px",
                height: "42px",
              }}
            >
              <MdOutlineDomain color={palette.success.main} size="20px" />
            </VuiBox>
            <VuiBox display="flex" flexDirection="column">
              <VuiTypography color="white" variant="button" fontWeight="medium">
                Bill & Taxes
              </VuiTypography>
              <VuiTypography color="text" variant="button" fontWeight="medium">
                Today, 16:36
              </VuiTypography>
            </VuiBox>
          </Stack>
          <VuiTypography variant="button" color="white" fontWeight="bold">
            -$154.50
          </VuiTypography>
        </VuiBox>
      </VuiBox>
    </Card>
  );
};

export default GameField;
