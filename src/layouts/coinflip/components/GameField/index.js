import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
// @mui components
import { 
  Card, 
  Stack,
  Tab,
  Tabs,
  Box,
} from "@mui/material";
import toast, { Toaster } from 'react-hot-toast';

// Vision UI Dashboard assets
import balancePng from "assets/images/billing-background-balance.png";
import Heads from "assets/images/heads.webp";
import Tails from "assets/images/tails.webp";
import Win from '../../../../assets/images/win.webp'

import palette from "assets/theme/base/colors";
import CircularProgress from '@mui/material/CircularProgress';

// Vision UI Dashboard components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiButton from "components/VuiButton";
import VuiSwitch from "components/VuiSwitch";
import VuiInput from "components/VuiInput";
import GradientBorder from "examples/GradientBorder";
import borders from "assets/theme/base/borders";
import radialGradient from "assets/theme/functions/radialGradient";
import Dialog from '@mui/material/Dialog';
// React icons
import { FaEthereum } from "react-icons/fa";
import { SiBinance } from "react-icons/si";

import { setBalance } from "../../../../slices/user.slice";
import callAPI from "../../../../api/index";
import { CASINO_SERVER } from "../../../../variables/url";
import { useVisionUIController } from "context";
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
const winColor = '#3bc216'
const failedColor = '#f02000'

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
  const [open, setOpen] = useState(false);

  const [cashoutColor, setCashoutColor] = useState(winColor)
  const [spin, setSpin] = useState("");
  const [type, setType] = useState(ETH)
  const [bet, setBet] = useState(false)
  const [betting, setBetting] = useState(false)
  const [amount, setAmount] = useState(0.5)
  const [playing, setPlaying] = useState(false);
  const [isUSD, seIsUSD] = useState(true);
  const [serverHash, setServerHash] = useState("")
  const [serverNextHash, setServerNextHash] = useState("")
  const [prediction, setPrediction] = useState([])
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [cashout, setCashout] = useState(0)
  const {userid, balance} = useSelector((state) => state.user)
  const {Price_ETH, Price_BNB} = useSelector((state) => state.price)
  const [provables, setProbables] = useState([])
  const [seedNonce, setSeedNonce] = useState(null)
  const dispatch = useDispatch();

  useEffect(() => {
    if(seedNonce) {
      const prov = {
        hash:serverHash,
        seed:seedNonce.seed,
        nonce:seedNonce.nonce
      }
      setProbables([prov,...provables])  
    }
  }, [seedNonce])

  const showWin = () => {
    setOpen(true);
  };
  const closeWin = () => {
    setOpen(false);
  };
  const getOtherSpin = (spin_type) => {
    if(spin_type == "spin-heads") {
      return "spin-heads-1"
    } else if(spin_type == "spin-heads-1") {
      return "spin-heads"
    } else if(spin_type == "spin-tails-1") {
      return "spin-tails"
    } else if(spin_type == "spin-tails") {
      return "spin-tails-1"
    }
  }  
  const onCoinFlip = (data) => {
    try{
      const user_id = data['user_id']
      if(user_id != userid) {
        throw new Error("Socket data verification failed")
      }
      const cmd = data['cmd']
      if(cmd == 'betted'){
          const s_hash = data['hash']
          dispatch(setBalance({
            ETH: data['ETH'],
            BNB: data['BNB'],
          }))
          setBet(true)
          setBetting(false)
          setServerHash(s_hash)
          setServerNextHash(s_hash)
      } else if(cmd == 'predicted') {
        if(data['status'] == -1) {
          throw new Error("Not User")
        }
        if(data['status'] == -2) {
          throw new Error("Token expired")
        }
        const element = document.getElementById('coin');

        let coin_spin = ""
        if (element) {
          const styles = getComputedStyle(element);
          coin_spin = styles.animation.toString().split(' ').pop()
        }

        const coinResult = data['result'];
        const winning_rate = data['winning_rate'];
        const win = data['win'];
        const color = win ? winColor : failedColor
    
        let spin_type = coinResult == 1 ? "spin-heads" : "spin-tails"
        if(spin_type == coin_spin) {
          spin_type = getOtherSpin(spin_type)
        }
    
        const seed = data['seed'];
        const nonce = data['nonce'];
    
        setSpin(spin_type);
        setTimeout(() => {
          setPlaying(false)
          setCashoutColor(color)
          setCashout(winning_rate)
          setSeedNonce({seed,nonce})
          if(!win) {
            setBet(false)
          }
        }, 3000)
        const next_hash = data['next_hash'];
        setServerNextHash(next_hash)    
      }

    }catch(e){
      console.error('socket data error :', e.toString())
      setBet(false)
      setBetting(false)
    }
  }

  useEffect(() => {
    socket.on('coinflip', onCoinFlip)
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
  };
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
  const funcBet = async () => {
    try {
      const price = isUSD ? ( type == 0 ? Price_ETH : Price_BNB ) : 1;
      const betAmount = parseFloat((parseFloat(amount) / price).toFixed(4))
      const curBalance = type == 0 ? balance.ETH : balance.BNB
      if(betAmount > (curBalance / 10)){
        alertError(`Impossible to bet ${isUSD ? '$' : getCryptoName(type)}${(curBalance / 10 * price).toFixed(3)} over this level`)
        return
      }
      setBetting(true)
      setPrediction([])
      setProbables([])
      setCashout(0)
      setCashoutColor(winColor)
  
      const data = {
        cmd : 'bet',
        user_id : userid,
        coin_type: parseInt(type),
        bet_amount : betAmount,
        server_hash : '',
        // hash,
      }
      socket.emit('coinflip', data)
    } catch {
      setBet(false)
      setBetting(false)
    }
  }
  const coinflip = async (coin_side) => {
    setPrediction([...prediction, coin_side])
    setPlaying(true);
    setServerHash(serverNextHash)
    const data = {
      cmd : 'predict',
      user_id : userid,
      coin_type: parseInt(type),
      bet_amount : 0,
      server_hash : serverNextHash,
      coin : coin_side,
      // hash,
    }
    socket.emit('coinflip', data)  
  }

  const funcCashout = async () => {
    //balance will increase
    setBet(false)
    const data = {
      cmd : 'cashout',
      user_id : userid,
      server_hash : serverHash,
      coin_type: type,
      bet_amount : 0,
      // hash,
    }
    socket.emit('coinflip', data)  
    showWin()
    await fetchBalance()
  }
  return (
    <>
      <Toaster />
      <Dialog
        id="win-dialog"
        open={open}
        onClose={closeWin}
        sx={{ '& div.MuiPaper-root' : { background : "transparent" } }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <img src={Win}/>
    </Dialog>
    <Card sx={{ padding: "30px", mt:"10px" }}>
      <VuiBox mt={0.25} width="100%">
        <VuiTypography variant="button" fontWeight="regular" color="white">
          HouseCutFee : 5%
        </VuiTypography>
      </VuiBox>
      <VuiBox display="flex" mb="14px">
        <VuiBox mt={0.25} width="70%">
          <VuiTypography variant="button" fontWeight="regular" color="warning">
            {isUSD ? '$' : getCryptoName(type)} {getVisibleBalance()}
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
      <VuiBox display="flex" flexDirection="column" mt={1}>
        <VuiBox
          mb="10px"
          p="20px"
          display="flex"
          flexDirection="column"
          sx={{ backgroundImage: `url(${balancePng})`, backgroundSize: "cover", borderRadius: "18px" }}
        >
          {
            !isConnected &&
            <VuiBox display="block" alignItems="center">
              <GradientCircularProgress />  
            </VuiBox>
          }
          {
            isConnected &&
            <>
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
              <VuiBox width="100%" padding="3px">
                {prediction.map((pred, idx) => {
                    return <>
                      {pred == 1 && <img className="prediction" key={idx} src={Heads}/>}
                      {pred == 0 && <img className="prediction" key={idx} src={Tails}/>}
                    </>
                })}
              </VuiBox>
              <VuiBox width="50%" m="auto">
                <VuiTypography variant="h4" fontWeight="bold" sx={{textAlign:'center', color:cashoutColor }}>
                  x{cashout.toFixed(2)}
                </VuiTypography>
              </VuiBox>
            </>
          }
        </VuiBox>
        <VuiBox display="block" justifyContent="space-beetween" alignItems="center">
          { bet &&
            <>
              <Stack direction="row" mx="auto" mt={1} spacing="10px" sx={{width:'100%'}} >
                <VuiButton variant="contained" color="secondary" sx={{width:"50%", fontSize:"14px", border: '1px solid #555'}} disabled={playing} onClick={() => coinflip(1)}>
                  <VuiBox component="img" src={Heads} sx={{ width: "25px", aspectRatio: "1/1" }} />
                  &nbsp;&nbsp;&nbsp;&nbsp;Heads
                </VuiButton>
                <VuiButton variant="contained" color="secondary" sx={{width:"50%", fontSize:"14px", border: '1px solid #555'}} disabled={playing} onClick={() => coinflip(0)}>
                  <VuiBox component="img" src={Tails} sx={{ width: "25px", aspectRatio: "1/1" }} />
                  &nbsp;&nbsp;&nbsp;&nbsp;Tails
                </VuiButton>
              </Stack>
              <Stack direction="row" spacing="10px" m="auto" mt="10px">
                <VuiButton variant="contained" color="warning" sx={{width:"100%", fontSize: "16px"}} disabled={playing || cashout == 0} onClick={funcCashout}>
                  Cashout
                </VuiButton>
              </Stack>
            </>
          }
          {!bet &&
          <Stack direction="row" spacing="10px" m="auto" >
            <VuiButton variant="contained" 
              sx={{
                width:"100%", 
                fontSize: "16px", 
                background:'#38c317', 
                '&:disabled' : {background : "#385317"},
                '&:hover' : {backgroundColor : "#38c317"}
              }}
              onClick={funcBet} 
              disabled={amount <= 0 || betting}>
              Bet
            </VuiButton>
          </Stack>
          }
          <Stack direction="row" spacing="10px" m="auto" mt="10px">
            <VuiBox mb={2} sx={{width:"50%"}}>
              <GradientBorder
                minWidth="100%"
                // padding="1px"
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
        <VuiBox display="block" justifyContent="space-beetween" mt={2} pl="10px" alignItems="center">
          <Stack direction="row" spacing="10px" m="auto">
            <VuiBox display="flex" flexDirection="column">
              <VuiTypography color="white" variant="button" fontWeight="medium" sx={{textOverflow: 'ellipsis'}}>
                Round Hash : {serverNextHash != "" ? serverNextHash.substring(0,5) + " ... " + serverNextHash.slice(-5) : ""}
              </VuiTypography>
            </VuiBox>
          </Stack>
        </VuiBox>
        {provables.map((prov, idx) => {
            return <>
              <VuiBox key={idx} display="block" justifyContent="space-beetween" mt={2} pl="10px" alignItems="center" sx={{border : '2px solid white', borderRadius:'10px'}}>
                <Stack direction="row" spacing="10px" m="auto">
                  <VuiBox display="flex" flexDirection="column">
                    <VuiTypography color="white" variant="button" fontWeight="medium">
                      Hash : {prov.hash.substring(0,10) + " ... " + prov.hash.slice(-10)}
                    </VuiTypography>
                  </VuiBox>
                </Stack>
                <Stack direction="row" spacing="10px" mr="auto">
                  <VuiBox display="flex" flexDirection="column">
                    <VuiTypography color="white" variant="button" fontWeight="medium">
                      Seed : {prov.seed}&nbsp;&nbsp;&nbsp;Nonce : {prov.nonce}
                    </VuiTypography>
                  </VuiBox>
                </Stack>
              </VuiBox>
            </>
        })}
      </VuiBox>
    </Card>
  </>
  );
};

export default GameField;
