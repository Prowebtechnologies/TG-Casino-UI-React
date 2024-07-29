import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// @mui components
import { 
  Card, 
  Stack,
  Tab,
  Tabs,
  Box
} from "@mui/material";

// Vision UI Dashboard assets
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
import toast, { Toaster } from 'react-hot-toast';

import CircularProgress from '@mui/material/CircularProgress';

import { useVisionUIController } from "context";

// React icons
import { FaEthereum } from "react-icons/fa";
import { SiBinance } from "react-icons/si";
import { TbViewportWide } from "react-icons/tb";
import { TbViewportNarrow } from "react-icons/tb";
import { LuRectangleVertical } from "react-icons/lu";

import { setBalance } from "../../../../slices/user.slice";
import callAPI from "../../../../api/index";
import { CASINO_SERVER } from "../../../../variables/url";
import balancePng from "assets/images/billing-background-balance.png";

import { Game } from '../Game';
import {socket} from "../../../../socket";
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

const GradientCircularProgress = () => {
  return (
    <Box sx={{marginLeft : '40%'}}>
      <svg width={0} height={0}>
        <defs>
          <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e01cd5" />
            <stop offset="100%" stopColor="#1CB5E0" />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgress sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }} />
    </Box>
  );
}
const GameField = () => {
  const [controller] = useVisionUIController();
  const { isConnected } = controller;

  const [type, setType] = useState(ETH)
  const [level, setLevel] = useState(0)
  const [bet, setBet] = useState(false)
  const [amount, setAmount] = useState(0.5)
  const [isUSD, setIsUSD] = useState(true);
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const {userid, balance} = useSelector((state) => state.user);
  const {Price_ETH, Price_BNB} = useSelector((state) => state.price);
  const { 
    plinkoRunning, 
    plinkoHistory 
  } = useSelector((state) => state.game);
  const dispatch = useDispatch();
  const gameRef = useRef();
  const getHistoryColor = (value) => {
    let colorValue = '#333';
    if(value >= 1){
      colorValue = '#38c317';
    }
    if(value >= 10){
      colorValue = '#c3c317';
    }
    return colorValue;
  }
  const onPlinko = (data) => {
    try{
      const user_id = data['user_id']
      if(user_id != userid) {
        throw new Error("Socket data verification failed")
      }
      dispatch(setBalance({
        ETH: data['ETH'],
        BNB: data['BNB'],
      }))

    }catch(e){
      console.error('socket data error :', e.toString())
    }
  }

  useEffect(() => {
    socket.on('plinko', onPlinko)
  }, [])  

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
  }
  const handleLevelChange = (event, newValue) => {
    setLevel(newValue)
  }
  const onBet = () => {
    if (plinkoRunning > 15) return
    const price = isUSD ? ( type == 0 ? Price_ETH : Price_BNB ) : 1;
    const betAmount = parseFloat((parseFloat(amount) / price).toFixed(4))
    const curBalance = type == 0 ? balance.ETH : balance.BNB
    if(betAmount > (curBalance / 10)){
      alertError(`Impossible to bet ${isUSD ? '$' : getCryptoName(type)}${(curBalance / 10 * price).toFixed(3)} over this level`)
      return
    }
    gameRef.current.bet(type, betAmount);
    const newBalance = Object.assign({}, balance);
    if(type == 0) {
      newBalance.ETH = balance.ETH - betAmount
    } else if(type == 1) {
      newBalance.BNB = balance.BNB - betAmount
    }
    dispatch(setBalance(newBalance))
  }
  const startBall = (coinType, betAmount) => {
    const data = {
      user_id : userid,
      // hash,
      cmd : 'start',
      bet_amount : betAmount,
      coin_type: coinType,
      rate : 0,
    }
    socket.emit('plinko', data)
  }
  const endBall = (coinType, betAmount, rate) => {
    const data = {
      user_id : userid,
      // hash,
      cmd : 'end',
      bet_amount : betAmount,
      coin_type: coinType,
      rate : rate,
    }
    socket.emit('plinko', data)
  }
  const alertError = (content) => {
    toast.error(content,
    {
      style: {
        borderRadius: '10px',
        background: '#344767',
        color: '#fff',
        fontSize: '14px',
        },
      }
    );    
  }
  const alertSuccess = (content) => {
    toast.success(content,
    {
      style: {
        borderRadius: '10px',
        background: '#344767',
        color: '#fff',
        fontSize: '14px',
        },
      }
    );    
  }  
  return (
    <>
      <Toaster />
      <Card sx={{ padding: "15px", mt:"10px" }}>
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
                onChange={() => setIsUSD(!isUSD)}
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
            display="flex"
            flexDirection="column"
            sx={{ backgroundImage: `url(${balancePng})`, backgroundSize: "100% 100%", borderRadius: "18px" }}
          >
            <VuiBox id="plinko-history" display="flex" sx={{height:"40px", justifyContent:"right"}}>
              {plinkoHistory && plinkoHistory.map((history, idx) => {
                return <>
                  <VuiBox 
                    key={idx}
                    display="flex"
                    alignItems="center"
                    width='20%'
                    height='35px'
                    color='white'
                    sx={{
                      float:"right",
                      marginLeft:'2px',
                      justifyContent: 'center',
                      textAlign:'center',
                      border: '1px solid transparent', 
                      background: getHistoryColor(history), 
                      borderRadius : '3px',
                      fontSize : '14px',
                      '&:first-of-type' : {
                        borderTopLeftRadius: plinkoHistory.length == 5 ? '18px' : '5px'
                      },
                      '&:last-child' : {
                        borderTopRightRadius: '18px'
                      }
                    }}
                  >
                    x{history}
                  </VuiBox>
                </>
              })}
            </VuiBox>
            {
              !isConnected &&
              <VuiBox display="block" alignItems="center">
                <GradientCircularProgress />  
              </VuiBox>
            }
            {
              isConnected &&
              <VuiBox display="flex" justifyContent="space-beetween" alignItems="center" m="auto" mb='20px'>
                <Game ref={gameRef} level={level} startfunc={startBall} endfunc={endBall}/>
              </VuiBox>
            }
          </VuiBox>
        </VuiBox>

        <VuiBox mb={1}>
          <Tabs
            orientation={tabsOrientation}
            value={level}
            onChange={handleLevelChange}
            sx={{ 
              background: "transparent", 
              display: "flex", 
              width: '100%', 
              margin:"auto",
              '& > div > span' : {
                borderRadius : '5px',
                background: level == 0 ? "grey" : ( level == 1 ? "green" : "purple")
              }
            }}
          >
            <Tab label="LOW" icon={<TbViewportNarrow color="white" size="20px" />} disabled={plinkoRunning > 0} sx={{minWidth: "32%", border:'1px solid grey', marginRight:'2px', borderRadius:'5px'}}/>
            <Tab label="MEDIUM" icon={<LuRectangleVertical color="white" size="20px" />} disabled={plinkoRunning > 0} sx={{minWidth: "32%", border:'1px solid grey', marginRight:'2px', borderRadius:'5px'}}/>
            <Tab label="HIGH" icon={<TbViewportWide color="white" size="20px" />} disabled={plinkoRunning > 0} sx={{minWidth: "32%", border:'1px solid grey', borderRadius:'5px'}}/>
          </Tabs>
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
                '&:hover' : {backgroundColor : "#38c317"} ,
                '&:focus:not(:hover)' : {backgroundColor : "#38c317"},
              }} 
              // disabled={amount <= 0 || betting || !isConnected}
              onClick={onBet}
            >
              Bet
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
      </Card>
    </>
  );
};

export default GameField;
