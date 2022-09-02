import React from "react";
import SimpleHeader from "../common/SimpleHeader";
import AppFooter from "../common/AppFooter";

export default function Resources() {

    return (
        <>
            <SimpleHeader/>
            <div id="appContent">
                <h1 className="pageTitle">Resources</h1>
                <h2>Source code</h2>
                <div>The FAIRware Workbench source code is available on GitHub.
                    <ul>
                        <li>Back-end module: <a
                            href="https://github.com/metadatacenter/fairware-workbench-api">https://github.com/metadatacenter/fairware-workbench-api</a>
                        </li>
                        <li>Front-end module: <a
                            href="https://github.com/metadatacenter/fairware-workbench-ui">https://github.com/metadatacenter/fairware-workbench-ui</a>
                        </li>
                    </ul>
                </div>
                <h2>API Documentation</h2>
                <div>
                    The API documentation is available through Swagger page and it is accessible from <a
                    href="https://api.fairware.metadatacenter.org/swagger">https://api.fairware.metadatacenter.org/swagger</a>.&nbsp;
                </div>
                <h2>M4M Resources</h2>
                <div>
                    The resources from the Metadata for Machines (M4M) Workshop is available on <a
                    href="https://osf.io/r2ae8/">the OSF website</a>.
                    <ul>
                        <li>M4M Guidelines: <a href="https://osf.io/8gwa6/">https://osf.io/8gwa6/</a></li>
                        <li>Workshop resources for the FAIRware Neuroscience: <a
                            href="https://osf.io/verf4/">https://osf.io/verf4/</a></li>
                        <li>Workshop resources for the FAIRware Psychology: <a
                            href="https://osf.io/qcht7/">https://osf.io/qcht7/</a></li>
                    </ul>
                </div>
                <div style={{paddingTop: "20px"}}>All the resources here are available for public viewing and usage
                    according to the <a href="https://creativecommons.org/licenses/by/4.0/">CC-BY 4.0
                        licensing</a>.<br/>
                    <img style={{height: "35px"}}
                         src="https://mirrors.creativecommons.org/presskit/buttons/88x31/png/by.png"/></div>
            </div>
            <AppFooter/>
        </>
    );
}
