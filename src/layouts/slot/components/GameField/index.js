import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
// @mui components
import { 
  AppBar,
  Card, 
  Stack,
  Tab,
  Tabs
} from "@mui/material";

// Vision UI Dashboard assets
import balancePng from "assets/images/billing-background-balance.png";

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
import SlotCounter from 'react-slot-counter';
// import {SlotCounterRef} from 'react-slot-counter';

import Cherry from '../../../../assets/images/slot/cherry.png'
import Dollar from '../../../../assets/images/slot/dollar.png'
import Heart from '../../../../assets/images/slot/heart.png'
import Seven from '../../../../assets/images/slot/seven.png'
import Spade from '../../../../assets/images/slot/spade.png'
import Tomato from '../../../../assets/images/slot/tomato.png'
import BG from '../../../../assets/images/slot/bg.png'
// React icons
import { FaEthereum } from "react-icons/fa";
import { SiBinance } from "react-icons/si";

import { setBalance } from "../../../../slices/user.slice";
import callAPI from "../../../../api/index";
import { CASINO_SERVER } from "../../../../variables/url";

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
const winColor = '#3bc216'
const failedColor = '#f02000'
const GameField = () => {
  const [cashoutColor, setCashoutColor] = useState(winColor)
  const [type, setType] = useState(ETH)
  const [bet, setBet] = useState(false)
  const [betting, setBetting] = useState(false)
  const [amount, setAmount] = useState(0.5)
  const [isUSD, seIsUSD] = useState(true);
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [cashout, setCashout] = useState(0)
  const {userid, balance} = useSelector((state) => state.user)
  const {Price_ETH, Price_BNB} = useSelector((state) => state.price)
  const slotRef = React.useRef(null);
  const [slots, setSlots] = useState([Seven,Seven,Seven,Seven,Seven])
  const [prevSlots, setPrevSlots] = useState([Seven,Seven,Seven,Seven,Seven])
  const dispatch = useDispatch();
  useEffect(() => {
    fetchBalance()
  }, [userid])
  const fetchBalance = async () => {
    const config = {
      method: 'POST',
      url : `${CASINO_SERVER}/balance`,
      data: {
        UserID: userid,
        // hash: hash
      }          
    }
    const balance = await callAPI(config)
    dispatch(setBalance(balance))
  }
  const getVisibleBalance = () => {
    return parseFloat(((isUSD ? (type == 0 ? Price_ETH : Price_BNB) : 1) * (type == 0 ? balance.ETH : balance.BNB)).toFixed(4))
  }
  const funcBetAmount = (times) => {
    const num = amount * times;
    const money = isUSD ? num.toFixed(1) : num.toFixed(4)
    const visibleBalance = getVisibleBalance();
    setAmount( visibleBalance > money ? money : visibleBalance );
  }
  const handleKindChange = (event, newValue) => {
    setType(newValue);
    setAmount(0.0)
  };
  const funcSlot = async () => {
    setBetting(true)
    setPrevSlots(slots)
    setSlots([Seven, Tomato, Cherry, Dollar, Seven])
    slotRef.current.startAnimation()
    setTimeout(() => {
      setBetting(false)
    }, 3000)

  }

  return (
    <Card sx={{ padding: "30px", mt:"10px" }}>
      <VuiBox mt={0.25} width="100%">
        <VuiTypography variant="button" fontWeight="regular" color="white">
          HouseCutFee : 5%
        </VuiTypography>
      </VuiBox>
      <VuiBox display="flex" mb="14px">
        <VuiBox mt={0.25} width="70%">
          <VuiTypography variant="button" fontWeight="regular" color="warning">
            Balance : {isUSD ? '$' : getCryptoName(type)} {getVisibleBalance()}
          </VuiTypography>
        </VuiBox>
        <VuiBox display="flex" mt={0.25} width="30%">
          <VuiBox>
            <VuiSwitch
              sx={{ background: "#1B1F3D", color: "#fff" }}
              color="warning"
              checked={isUSD}
              onChange={() => seIsUSD(!isUSD)}
            />
          </VuiBox>
          <VuiBox ml={2}>
            <VuiTypography variant="button" fontWeight="regular" color="text">
              USD
            </VuiTypography>
          </VuiBox>
        </VuiBox>
      </VuiBox>
      <VuiBox>
        <Tabs
          orientation={tabsOrientation}
          value={type}
          onChange={handleKindChange}
          sx={{ background: "transparent", display: "flex", width: '100%', margin:"auto"}}
        >
          <Tab label="ETH" icon={<FaEthereum color="white" size="20px" />} disabled={bet} sx={{minWidth: "50%"}}/>
          <Tab label="BNB" icon={<SiBinance color="white" size="20px" />} disabled={bet} sx={{minWidth: "50%"}}/>
        </Tabs>
      </VuiBox>

      <VuiBox display="flex" flexDirection="column" mt={2}>
        <VuiBox
          mb="10px"
          p="20px"
          display="flex"
          flexDirection="column"
          sx={{ backgroundImage: `url(${BG})`, backgroundSize: "100% 100%", borderRadius: "18px" }}
        >
          <VuiBox id="slot-box" display="flex" justifyContent="space-beetween" alignItems="center">
            <SlotCounter
              ref={slotRef}
              startValueOnce = {true}
              autoAnimationStart={false}
              duration = {2.0}
              speed = {10}
              sx={{'& > span' : {margin : 'auto'}}}
              startValue={[
                <img className="item item-small" src={prevSlots[0]} alt="" />,
                <img className="item item-small" src={prevSlots[1]} alt="" />,
                <img className="item item-small" src={prevSlots[2]} alt="" />,
                <img className="item item-small" src={prevSlots[3]} alt="" />,
                <img className="item item-small" src={prevSlots[4]} alt="" />,
              ]}
              value={[
                <img className="item item-small" src={slots[0]} alt="" />,
                <img className="item item-small" src={slots[1]} alt="" />,
                <img className="item item-small" src={slots[2]} alt="" />,
                <img className="item item-small" src={slots[3]} alt="" />,
                <img className="item item-small" src={slots[4]} alt="" />,
              ]}
              dummyCharacters={[
                <img className="item item-small" src={Cherry} alt="" />,
                <img className="item item-small" src={Dollar} alt="" />,
                <img className="item item-small" src={Heart} alt="" />,
                <img className="item item-small" src={Seven} alt="" />,
                <img className="item item-small" src={Spade} alt="" />,
                <img className="item item-small" src={Tomato} alt="" />,
              ]}
            />
          </VuiBox>
        </VuiBox>
        <VuiBox width="50%" m="auto" pb={1}>
          <VuiTypography variant="h4" fontWeight="bold" sx={{textAlign:'center', color:cashoutColor }}>
            x{cashout.toFixed(2)}
          </VuiTypography>
        </VuiBox>
        <VuiBox display="block" justifyContent="space-beetween" alignItems="center" mb={1}>
          <Stack direction="row" spacing="10px" m="auto" >
            <VuiButton 
              variant="contained" 
              className="button-slot" 
              sx={{
                width:"100%", 
                fontSize: "16px", 
                backgroundColor:'#38c317', 
                '&:disabled' : {backgroundColor : "#385317"}, 
                '&:hover' : {backgroundColor : "#38c317"} 
              }} 
              onClick={funcSlot} 
              disabled={amount <= 0 || betting}
            >
              Slot
            </VuiButton>
          </Stack>
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
                <VuiInput type="number" value={amount} disabled={bet} onChange={(e) => {setAmount(e.target.value)}} fontWeight="500"/>
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
      </VuiBox>
    </Card>
  );
};

export default GameField;
