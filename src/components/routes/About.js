import React from "react";
import Box from "@mui/material/Box";
import SimpleHeader from "../common/SimpleHeader";
import AppFooter from "../common/AppFooter";
import roriLogo from '../../../src/resources/img/rori-logo.png';
import cihrLogo from '../../../src/resources/img/cihr-logo.png';
import fwfLogo from '../../../src/resources/img/fwf-logo.png';
import nihrLogo from '../../../src/resources/img/nihr-logo.png';
import snsfLogo from '../../../src/resources/img/snsf-logo.png';
import wellcomeLogo from '../../../src/resources/img/wellcome-logo.png';

export default function About() {

    return (
        <>
            <SimpleHeader/>
            <div id="appContent">
                <h1 className="pageTitle">About</h1>
                <div className="aboutText">
                    <div className="paragraph">The FAIRware project led by the <a href="https://bmir.stanford.edu/">Stanford Center for Biomedical Informatics Research</a> completed in August 2022. As one of the six flagship projects of the <a href="https://researchonresearch.org/">Research on Research Institute</a> (RoRI), FAIRware aims to enable researchers to make their research practices more <a href="https://www.nature.com/articles/sdata201618">Findable, Accessible, Interoperable and Reusable</a> (FAIR). FAIRware is led by a consortium of five RoRI partners: the Wellcome Trust, the Austrian Science Fund, the Canadian Institutes of Health Research, the National Institute for Health Research (UK), and the Swiss National Science Foundation.
                    </div>
                    <h2>Outcomes</h2>
                    <div className="paragraph">The outcomes of the FAIRware project include the following:
                        <ol>
                            <li>Prototype FAIRware Workbench, accessible through the <a href="https://fairware.metadatacenter.org/">FAIRware Metadata Center</a> and <a href="https://api.fairware.metadatacenter.org/swagger">API endpoints websites</a></li>
                            <li>Open source code for the prototype FAIRware Workbench, available for the <a href="https://github.com/metadatacenter/fairware-workbench-api">API module</a> and <a href="https://github.com/metadatacenter/fairware-workbench-api">User interface module</a></li>
                            <li><a href="https://doi.org/10.48550/arXiv.2208.02836">Preprint version</a> of a submitted article on FAIR evaluation challenges.</li>
                            <li>Educational materials for promoting and explaining FAIRness and metadata, available as part of the <a href="https://fairware.metadatacenter.org/Resources">FAIRware Workbench Resources</a>.</li>
                            <li>Conducted GO FAIR Foundation <a href="https://www.gofairfoundation.org/m4m/">Metadata for Machines (M4M) workshops</a> on the following topics:
                                <ul>
                                    <li>Longitudinal clinical data (<a href="https://www.fair4health.eu">FAIR4Health</a>, Seville): Workshop “Metadata For Machines (M4M): Metadata templates to support FAIR Principles for observational health research” at European Federation for Medical Informatics (EFMI) Special Topic Conference (STC) 2021.</li>
                                    <li>Experimental psychology (University of Geneva): <a href="https://osf.io/r2ae8/">FAIRware Overview</a> and <a href="https://osf.io/qcht7/">M4M.20</a>.</li>
                                    <li>Human neuroimaging (Max Planck Institute, Berlin): <a href="https://osf.io/r2ae8/">FAIRware Overview</a> and <a href="https://osf.io/verf4/">M4M.21</a>.</li>
                                </ul>
                            </li>
                        </ol>
                    </div>
                    <h2>Use Cases</h2>
                    <div className="paragraph">There are a range of possible use-cases for FAIRware in the future, beyond the funder and researcher use-cases that have been explored in the current version of FAIRware. These include use by:
                    <ol>
                        <li><b>Discipline specific projects</b> such as health, infectious disease and/or COVID-19 projects who already engage with FAIRware elements such as CEDAR and/or M4M workshops, to build the FAIRware researcher use case.</li>
                        <li><b>Data infrastructures</b> such as that being developed by the <a href="https://datacite.org/fair-workflows.html">FAIR Workflows project</a>, which brings together <a href="https://datacite.org/">DataCite</a>, the open-source <a href="https://datadryad.org/stash">Dryad</a> general data repository, and <a href="https://chronoshub.io/">ChronosHub</a>, which supports management of open-access publication, to create an integrated ecosystem of tools and services to support open science, open-access publication, and FAIR data.</li>
                        <li><b>Research evaluation services</b> such as <a href="https://researchfish.com/researchfish/">ResearchFish</a> which track outputs and the outcomes of research funded via various sources and better articulate the impact of their whole portfolio.</li>
                        <li><b>Research institutions</b> through infrastructure such as the <a href="https://quest-dashboard.charite.de/#tabStart">Charité Dashboard on Responsible Research</a>, which is creating a resource for research institutions wishing to implement automated FAIR assessments of their data assets. This dashboard gives an overview of several metrics of open and responsible research utilised at <a href="https://www.charite.de/en/">Charité</a> (including the Berlin Institute of Health). The data reusability indicator included in the dashboard integrates the automated screening tool <a href="https://www.f-uji.net/">F-UJI</a> to evaluate the FAIRness of research data objects based on <a href="https://zenodo.org/record/4081213#.YhdU_C8w1pQ">metrics</a> developed by the <a href="https://www.fairsfair.eu/">FAIRsFAIR</a> project. FAIRware could assist with provision of tests that F-UJI does not address.</li>
                        </ol>
                    </div>
                </div>
                <div className="aboutLogo">
                    <Box
                        component="img"
                        sx={{height: 90}}
                        alt="Research on Research Institute logo"
                        src={roriLogo}
                    />
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