import React, { useContext, useState } from 'react';
import { ScoreContext } from '../ScoreProvider';
import { getWind } from './utils';

export const GangPopup = ({ wind, open }) => {
    const { handleSetGang } = useContext(ScoreContext)

    const [loser, setLoser] = useState(0)
    const [congrat, setCongrat] = useState(false)

    const onHandleSetGang = (loser) => {
        if (loser === 0) {
            open(false)
            return
        }
        setLoser(loser)
        setCongrat(true)
        handleSetGang(wind, loser)
        setTimeout(() => open(false), 3000)
    }
    return (
        <div className="flex items-center px-4 py-3 space-x-2">
            <div className="flex items-center px-4 py-3 space-x-2">
                <button onClick={() => onHandleSetGang(1)} className={`flex-row px-4 py-2 ${loser === 1 ? "bg-green-800" : "bg-green-500"} text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2`}>
                    东
                </button>
                <button onClick={() => onHandleSetGang(2)} className={`flex-row px-4 py-2 ${loser === 2 ? "bg-green-800" : "bg-green-500"} text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2`}>
                    南
                </button>
                <button onClick={() => onHandleSetGang(3)} className={`flex-row px-4 py-2 ${loser === 3 ? "bg-green-800" : "bg-green-500"} text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2`}>
                    西
                </button>
                <button onClick={() => onHandleSetGang(4)} className={`flex-row px-4 py-2 ${loser === 4 ? "bg-green-800" : "bg-green-500"} text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2`}>
                    北
                </button>
            </div>
            {congrat && (<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mx-auto p-5 border shadow-lg rounded-md bg-white">
                <div className="mt-3 text-center">恭喜恭喜</div>
                {wind === loser
                    ? (<div className="mt-3 text-center">{getWind(wind)}风赢暗杠</div>)
                    : (<div className="mt-3 text-center">{getWind(wind)}风赢杠 from {getWind(loser)}风</div>)}
            </div>)
            }
        </div>
    )
}
