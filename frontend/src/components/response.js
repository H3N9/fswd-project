import React from 'react'
import ModalResult from './modalResult'


const Response = ({state, setState}) => {
    if(state === "Success"){
        return (
            <ModalResult title="สำเร็จ" icon="check" color="#22aa4b" setIsCreate={setState} />
        )
    }
    else if(state === "Fail"){
        return (
            <ModalResult title="ล้มเหลว" icon="times" setIsCreate={setState} color="#a82626" />
        )
    }
    else{
        return (
            <></>
        )
    }
}


export default Response