import React, {FunctionComponent} from 'react';
import {createRoot} from "react-dom/client";

const container = document.getElementById('root') as unknown as Element;

const App: FunctionComponent = () => {
    return(
        <div>hello</div>
    )
}
const root = createRoot(container)

root.render(<App/>)



