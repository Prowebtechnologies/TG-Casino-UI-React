import React from "react";
import { useState } from "react";
// @mui components
import { 
  AppBar,
  Card, 
  Stack,
  Tab,
  Tabs
} from "@mui/material";

// Vision UI Dashboard assets
import balance from "assets/images/billing-background-balance.png";
import Heads from "assets/images/heads.webp";
import Tails from "assets/images/tails.webp";

import palette from "assets/theme/base/colors";

// Vision UI Dashboard components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiButton from "components/VuiButton";
import VuiSwitch from "components/VuiSwitch";

// React icons
import { MdOutlineDomain } from "react-icons/md";
import { FaEthereum } from "react-icons/fa";
import { SiBinance } from "react-icons/si";
import {Box, Select, MenuItem, FormControl} from "@mui/material";
import './index.css'

const ETH = 0;
const BNB = 1;
const getCryptoName = (crypto) => {
  let name = ''
  switch(crypto) {
    case ETH:
      name = 'ETH'
      break;
    case BNB:
      name = 'BNB'
      break;
  }
  return name
}

const GameField = () => {
  const [spin, setSpin] = useState("");
  const [kind, setKind] = useState(ETH)
  const [coin, setCoin] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [age, setAge] = React.useState('');
  const [isUSD, seIsUSD] = useState(true);

  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  const handleKindChange = (event, newValue) => {
    setKind(newValue);
  };

  const coinflip = () => {
    setPlaying(true);
    setCoin(!coin);
    setSpin(coin? "spin-heads" : "spin-tails");
    setTimeout(() => {setPlaying(false)}, 3000)
    // setSpin("")
  }
  return (
    <Card sx={{ padding: "30px" }}>
      <VuiBox display="flex" mb="14px">
        <VuiBox mt={0.25}>
          <VuiSwitch
            sx={{ background: "#1B1F3D", color: "#fff" }}
            color="info"
            checked={isUSD}
            onChange={() => seIsUSD(!isUSD)}
          />
        </VuiBox>
        <VuiBox width="80%" ml={2}>
          <VuiTypography variant="button" fontWeight="regular" color="text">
              USD
          </VuiTypography>
          <VuiTypography variant="button" ml={2} fontWeight="regular" color="text">
            Balance : ${} {isUSD ? 'USD' : getCryptoName(kind)}
          </VuiTypography>
        </VuiBox>
      </VuiBox>

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

          </VuiBox>
        </VuiBox>
        <VuiBox display="block" justifyContent="space-beetween" alignItems="center">
          <VuiBox>
            <Tabs
              orientation={tabsOrientation}
              value={kind}
              onChange={handleKindChange}
              sx={{ background: "transparent", display: "flex", width: '100%'}}
            >
              <Tab label="ETH" icon={<FaEthereum color="white" size="20px" />} sx={{minWidth: "50%"}}/>
              <Tab label="BNB" icon={<SiBinance color="white" size="20px" />} sx={{minWidth: "50%"}}/>
            </Tabs>
          </VuiBox>

          <Stack direction="row" mx="auto" mt={1} spacing="10px" sx={{width:'100%'}} >
            <VuiButton variant="contained" color="secondary" sx={{width:"50%"}} onClick={coinflip}>
              <VuiBox component="img" src={Heads} sx={{ width: "25px", aspectRatio: "1/1" }} />
              &nbsp;&nbsp;&nbsp;&nbsp;Heads
            </VuiButton>
            <VuiButton variant="contained" color="secondary" sx={{width:"50%"}} onClick={coinflip}>
              <VuiBox component="img" src={Tails} sx={{ width: "25px", aspectRatio: "1/1" }} />
              &nbsp;&nbsp;&nbsp;&nbsp;Tails
            </VuiButton>
          </Stack>
          <Stack direction="row" spacing="10px" m="auto" mt="10px">
            <VuiButton variant="contained" color="warning" sx={{width:"100%"}}>
              Bet
            </VuiButton>
          </Stack>
        </VuiBox>
        {/* <VuiBox display="flex" justifyContent="space-beetween" alignItems="center">
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
        </VuiBox> */}
      </VuiBox>
    </Card>
  );
};

export default GameField;
