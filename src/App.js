import { useState, useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Sidenav from "examples/Sidenav";

import theme from "assets/theme";
import routes from "routes";
import { useVisionUIController, setMiniSidenav, setIsConnected } from "context";
import callAPI from "./api/index";

import { CASINO_SERVER } from "./variables/url";
import { setETH, setBNB } from "./slices/price.slice";
import {socket} from './socket';

export default function App() {
  const [controller, dispatch] = useVisionUIController();
  const { miniSidenav, direction, layout, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();
  const reduxDispatch = useDispatch();

  const fetchPrice = async () => {
    try {
      const config = {
        method: 'GET',
        url: `${CASINO_SERVER}/price`
      }
      const priceData = await callAPI(config);
      reduxDispatch(setETH(priceData[0]['Price']))
      reduxDispatch(setBNB(priceData[1]['Price']))
    } catch (err) {
      console.error("Failed to fetch price", err);
    }
  };
  const onConnect = () => {
    setIsConnected(dispatch, true);
    console.log('connected')
  }
  const onDisconnect = () => {
    setIsConnected(dispatch, false);
    console.log('disconnected')
  }

  useEffect(() => {
    fetchPrice();
    const intervalId = setInterval(fetchPrice, 60000);
    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)


    return () => {
      clearInterval(intervalId);
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
    }
  },[])
  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} component={route.component} key={route.key} />;
      }

      return null;
    });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand=""
            brandName="Casino&nbsp;&nbsp;&nbsp;"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
        </>
      )}
      <Switch>
        {getRoutes(routes)}
      </Switch>
    </ThemeProvider>
  );
}
