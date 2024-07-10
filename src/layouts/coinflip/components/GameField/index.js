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
import VuiInput from "components/VuiInput";
import GradientBorder from "examples/GradientBorder";
import borders from "assets/theme/base/borders";
import radialGradient from "assets/theme/functions/radialGradient";

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
  const [bet, setBet] = useState(false)
  const [amount, setAmount] = useState(0.5)
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
  const funcBet = () => {
    //balance will decrease
    setBet(true)
  }
  const funcCashout = () => {
    //balance will increase
    setBet(false)
  }
  const funcBetAmount = (times) => {
    setAmount((amount * times).toFixed(4));
  }
  return (
    <Card sx={{ padding: "30px", mt:"10px" }}>
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
              <Box className="tails">
                <img src={Tails}/>
              </Box>
              <Box className="heads">
                <img src={Heads}/>
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
              sx={{ background: "transparent", display: "flex", width: '100%', margin:"auto"}}
            >
              <Tab label="ETH" icon={<FaEthereum color="white" size="20px" />} disabled={bet} sx={{minWidth: "50%"}}/>
              <Tab label="BNB" icon={<SiBinance color="white" size="20px" />} disabled={bet} sx={{minWidth: "50%"}}/>
            </Tabs>
          </VuiBox>
          { bet &&
            <>
              <Stack direction="row" mx="auto" mt={1} spacing="10px" sx={{width:'100%'}} >
                <VuiButton variant="contained" color="secondary" sx={{width:"50%", fontSize:"14px"}} disabled={playing} onClick={coinflip}>
                  <VuiBox component="img" src={Heads} sx={{ width: "25px", aspectRatio: "1/1" }} />
                  &nbsp;&nbsp;&nbsp;&nbsp;Heads
                </VuiButton>
                <VuiButton variant="contained" color="secondary" sx={{width:"50%", fontSize:"14px"}} disabled={playing} onClick={coinflip}>
                  <VuiBox component="img" src={Tails} sx={{ width: "25px", aspectRatio: "1/1" }} />
                  &nbsp;&nbsp;&nbsp;&nbsp;Tails
                </VuiButton>
              </Stack>
              <Stack direction="row" spacing="10px" m="auto" mt="10px">
                <VuiButton variant="contained" color="warning" sx={{width:"100%", fontSize: "16px"}} disabled={playing} onClick={funcCashout}>
                  Cashout
                </VuiButton>
              </Stack>
            </>
          }
          {!bet &&
          <Stack direction="row" spacing="10px" m="auto" mt="10px">
            <VuiButton variant="contained" color="success" sx={{width:"100%", fontSize: "16px"}} onClick={funcBet}>
              Bet
            </VuiButton>
          </Stack>
          }
          <Stack direction="row" spacing="10px" m="auto" mt="10px">
            <VuiBox mb={2} sx={{width:"50%"}}>
              <GradientBorder
                minWidth="100%"
                padding="1px"
                borderRadius={borders.borderRadius.lg}
                backgroundImage={radialGradient(
                  palette.gradients.borderLight.main,
                  palette.gradients.borderLight.state,
                  palette.gradients.borderLight.angle
                )}
              >
                <VuiInput type="number" value={amount} onChange={(e) => {setAmount(e.target.value)}} fontWeight="500"/>
              </GradientBorder>
            </VuiBox>
            <VuiButton variant="contained" color="secondary" sx={{width:"25%", fontSize:"14px" }} disabled={bet} onClick={() => funcBetAmount(0.5)}>
              /2
            </VuiButton>
            <VuiButton variant="contained" color="secondary" sx={{width:"25%", fontSize:"14px"}} disabled={bet} onClick={() => funcBetAmount(2)}>
              x2
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
