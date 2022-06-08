import React, {useState} from "react";
import Typography from "@mui/material/Typography";

export default function ShowMetadata({metadataRecord}) {
    const [show, setShow] = useState(false);
    return (
        <>
            <button onClick={() => setShow(prev => !prev)}>Show metadata</button>
            {show && <Typography style={{width: "85em"}}>
                <pre>{JSON.stringify(metadataRecord, null, 3)}</pre>
            </Typography>}
        </>
    );
}