import React, { useContext, useState } from 'react';
import { ScoreContext } from '../ScoreProvider';
import { getWind } from './utils';

export const HuPopup = ({ wind, open }) => {
    const { handleSetHu } = useContext(ScoreContext)

    const [loser, setLoser] = useState(0)
    const [tai, setTai] = useState(0)
    const [congrat, setCongrat] = useState(false)

    const onHandleSetHu = (tai) => {
        setTai(tai)
        if (loser === 0) {
            open(false)
            return
        }
        setCongrat(true)
        handleSetHu(wind, loser, tai)
        setTimeout(() => open(false), 3000)
    }

    return (
        <div className="flex items-center px-4 py-3 space-x-2">
            <div className="flex items-center px-4 py-3 space-x-2">
                <div className="flex items-center px-4 py-3 space-x-2">
                    <div className="flex-col">shooter</div>
                    <button onClick={() => setLoser(1)} className={`flex-row px-4 py-2 ${loser === 1 ? "bg-green-800" : "bg-green-500"} text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2`}>
                        东
                    </button>
                    <button onClick={() => setLoser(2)} className={`flex-row px-4 py-2 ${loser === 2 ? "bg-green-800" : "bg-green-500"} text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2`}>
                        南
                    </button>
                    <button onClick={() => setLoser(3)} className={`flex-row px-4 py-2 ${loser === 3 ? "bg-green-800" : "bg-green-500"} text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2`}>
                        西
                    </button>
                    <button onClick={() => setLoser(4)} className={`flex-row px-4 py-2 ${loser === 4 ? "bg-green-800" : "bg-green-500"} text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2`}>
                        北
                    </button>
                </div>
            </div>
            <div className="flex items-center px-4 py-3 space-x-2">
                <button
                    onClick={() => onHandleSetHu(1)}
                    className="flex-row px-4 py-2 bg-green-500 text-white text-base font-small rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300">
                    1 台
                </button>
                <button
                    onClick={() => onHandleSetHu(2)}
                    className="flex-row px-4 py-2 bg-green-500 text-white text-base font-small rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300">
                    2 台
                </button>
                <button
                    onClick={() => onHandleSetHu(3)}
                    className="flex-row px-4 py-2 bg-green-500 text-white text-base font-small rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300">
                    3 台
                </button>
                <button
                    onClick={() => onHandleSetHu(4)}
                    className="flex-row px-4 py-2 bg-green-500 text-white text-base font-small rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300">
                    4 台
                </button>
                <button
                    onClick={() => onHandleSetHu(5)}
                    className="flex-row px-4 py-2 bg-green-500 text-white text-base font-small rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300">
                    5 台
                </button>
            </div>
            {congrat && (<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mx-auto p-5 border shadow-lg rounded-md bg-white">
                <div className="mt-3 text-center">恭喜恭喜</div>
                {wind ===loser 
                ? (<div className="mt-3 text-center">{getWind(wind)}风赢{tai}台自摸</div>) 
                : (<div className="mt-3 text-center">{getWind(wind)}风赢{tai}台 from {getWind(loser)}风</div>)}
            </div>)
            }
        </div>
    )
}
