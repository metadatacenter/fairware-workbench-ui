import React, {useState} from "react";

export default function ShowMetadata({metadataRecord}) {
    const [show, setShow] = useState(false);
    return (
        <>
            <button onClick={() => setShow(prev => !prev)}>Show metadata</button>
            {show && <pre style={{fontSize: "1em", width: "85em"}}>
                {JSON.stringify(metadataRecord, null, 3)}
            </pre>}
        </>
    );
}