import React from "react";
import {Link} from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@mui/material/Box";
import SimpleHeader from "../common/SimpleHeader";
import AppFooter from "../common/AppFooter";
import cihrLogo from '../../../src/resources/img/cihr-logo.png';
import fwfLogo from '../../../src/resources/img/fwf-logo.png';
import nihrLogo from '../../../src/resources/img/nihr-logo.png';
import snsfLogo from '../../../src/resources/img/snsf-logo.png';
import wellcomeLogo from '../../../src/resources/img/wellcome-logo.png';

export default function Home() {

    return (
        <>
            <SimpleHeader/>
            <div id="appContent">
                <div className="mainTitle" style={{marginTop: "10vh"}}>MAKING DATA FAIR</div>
                <div className="mainSubtitle">Get suggestions for improving your metadata. Make your research data more
                    Findable,
                    Accessible, Interoperable
                    and Reusable
                </div>
                <div id={"mainButtons"}>
                    <Button
                        component={Link}
                        to="/EvaluateMetadata"
                        className={"mainButton"}
                        variant={"contained"}
                        size={"large"}>
                        Start Evaluating Published Data</Button>
                </div>
                <Typography align={"center"}><Link to={"/PrivacyPolicy"}>How this tool uses your
                    data</Link></Typography>
                <div style={{marginTop: "12vh", textAlign: "center"}}>
                    <Box
                        component="img"
                        sx={{height: 90}}
                        alt="Wellcome Trust logo"
                        src={wellcomeLogo}
                    />
                    <Box
                        component="img"
                        sx={{height: 90}}
                        alt="Canadian Institutes of Health Research logo"
                        src={cihrLogo}
                    />
                    <Box
                        component="img"
                        sx={{height: 90}}
                        alt="National Institute for Health and Care Research logo"
                        src={nihrLogo}
                    />
                    <Box
                        component="img"
                        sx={{height: 90}}
                        alt="Swiss National Science Foundation logo"
                        src={snsfLogo}
                    />
                    <Box
                        component="img"
                        sx={{height: 90}}
                        alt="FWF der Wissenschaftsfonds logo"
                        src={fwfLogo}
                    />
                </div>
            </div>
            <AppFooter/>
        </>
    );
}