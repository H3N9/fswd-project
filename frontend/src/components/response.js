import React from 'react'
import ModalResult from './modalResult'


const Response = ({state, setState}) => {
    if(state === "Success"){
        return (
            <ModalResult title="Success" icon="check" color="#22aa4b" setIsCreate={setState} />
        )
    }
    else if(state === "Fail"){
        return (
            <ModalResult title="Fail" icon="times" setIsCreate={setState} color="#a82626" />
        )
    }
    else{
        return (
            <></>
        )
    }
}


export default Response