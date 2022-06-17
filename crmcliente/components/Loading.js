import React, { PureComponent,useEffect, useState, useMemo } from "react"
import {Spinner} from 'reactstrap'



const Loading  = () => {
    return (
<Spinner animation="grow" size="m"/>
        );
}
export default Loading;