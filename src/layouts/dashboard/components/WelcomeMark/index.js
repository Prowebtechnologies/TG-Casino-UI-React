import React from "react";

import { Card, Icon } from "@mui/material";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

import gif from "assets/images/welcome-profile.png";
import { useSelector } from "react-redux";
import './index.css';

const WelcomeMark = () => {
  const name = useSelector((state) => state.user.name)
  const username = useSelector((state) => state.user.username)
  return (
    <Card sx={() => ({
      height: "340px",
      py: "32px",
      backgroundImage: `url(${gif})`,
      backgroundSize: "cover",
      backgroundPosition: "50%",
      width:"inherit"
    })}>
      <VuiBox height="100%" display="flex" flexDirection="column" justifyContent="space-between">
        <VuiBox>
          <VuiTypography color="white" variant="button" fontWeight="regular" mb="12px">
            Welcome To Defination Lab,
          </VuiTypography>
          <VuiTypography color="white" variant="h3" fontWeight="bold">
            {name} 
          </VuiTypography>
          <VuiTypography color="white" variant="h5" fontWeight="bold" mb="18px">
            @{username} 
          </VuiTypography>
          <VuiTypography color="white" variant="h6" fontWeight="regular" mb="auto">
            Glad to see you again!
            <br />Please enjoy here!
          </VuiTypography>
        </VuiBox>
        <VuiTypography
          component="a"
          href="https://definationlabs.io"
          variant="button"
          color="white"
          fontWeight="regular"
          sx={{
            mr: "5px",
            display: "inline-flex",
            alignItems: "center",
            cursor: "pointer",

            "& .material-icons-round": {
              fontSize: "1.125rem",
              transform: `translate(2px, -0.5px)`,
              transition: "transform 0.2s cubic-bezier(0.34,1.61,0.7,1.3)",
            },

            "&:hover .material-icons-round, &:focus  .material-icons-round": {
              transform: `translate(6px, -0.5px)`,
            },
          }}
        >
          Defination Lab
          <Icon sx={{ fontWeight: "bold", ml: "5px" }}>arrow_forward</Icon>
        </VuiTypography>
      </VuiBox>
    </Card>
  );
};

export default WelcomeMark;
