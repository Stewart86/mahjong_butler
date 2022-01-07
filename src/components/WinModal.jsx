import React, { useState } from 'react'
import { GangPopup } from './GangPopup'
import { HuPopup } from './HuPopup'
import { YaoPopup } from './YaoPopup'

export const WinModal = ({ wind, onHandleClose }) => {
    const [openHu, setOpenHu] = useState(false)
    const [openGang, setOpenGang] = useState(false)
    const [openYao, setOpenYao] = useState(false)

    const onHandleHu = () => {
        setOpenHu(true)
        setOpenGang(false)
        setOpenYao(false)
    }

    const onHandleYao = () => {
        setOpenHu(false)
        setOpenGang(false)
        setOpenYao(true)
    }

    const onHandleGang = () => {
        setOpenHu(false)
        setOpenGang(true)
        setOpenYao(false)
    }
    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mx-auto p-5 border shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
                <div className="flex items-center px-4 py-3 space-x-2">
                    <button
                        className={`flex-row px-4 py-2 ${openHu ? "bg-green-800" : "bg-green-500"} text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2`}
                        onClick={() => onHandleHu()}>
                        胡
                    </button>
                    <button
                        className={`flex-row px-4 py-2 ${openGang ? "bg-green-800" : "bg-green-500"} text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2`}
                        onClick={() => onHandleGang()}>
                        杠
                    </button>
                    <button
                        className={`flex-row px-4 py-2 ${openYao ? "bg-green-800" : "bg-green-500"} text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2`}
                        onClick={() => onHandleYao()}>
                        咬
                    </button>
                </div>
            </div>
            <div className="mt-3 text-center">
                {openHu && <HuPopup wind={wind} open={onHandleClose} />}
                {openGang && <GangPopup wind={wind} open={onHandleClose} />}
                {openYao && <YaoPopup wind={wind} open={onHandleClose} />}
            </div>
            <div className="mt-3 text-center">
                <button
                    className="flex-row px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                    onClick={onHandleClose}>
                    close
                </button>
            </div>
        </div>
    )
}
