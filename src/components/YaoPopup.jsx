
import React, { useContext, useState } from 'react';
import { ScoreContext } from '../ScoreProvider';
import { getWind } from './utils';

export const YaoPopup = ({ wind, open }) => {
    const { handleSetYao } = useContext(ScoreContext)

    const [loser, setLoser] = useState(0)
    const [hidden, setHidden] = useState(false)
    const [congrat, setCongrat] = useState(false)

    const onHandleSetYao = (loser) => {
        if (loser === 0) {
            open(false)
            return
        }
        setLoser(loser)
        setCongrat(true)
        handleSetYao(wind, loser, hidden)
        setTimeout(() => open(false), 3000)
    }
    return (
        <div className="flex items-center px-4 py-3 space-x-2">
            <div className="flex items-center px-4 py-3 space-x-2">
                <button onClick={() => setHidden(!hidden)} className={`flex-row px-4 py-2 ${hidden ? "bg-green-800" : "bg-green-500"} text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2`}>
                    暗
                </button>
                <button onClick={() => onHandleSetYao(1)} className={`flex-row px-4 py-2 ${loser === 1 ? "bg-green-800" : "bg-green-500"} text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2`}>
                    东
                </button>
                <button onClick={() => onHandleSetYao(2)} className={`flex-row px-4 py-2 ${loser === 2 ? "bg-green-800" : "bg-green-500"} text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2`}>
                    南
                </button>
                <button onClick={() => onHandleSetYao(3)} className={`flex-row px-4 py-2 ${loser === 3 ? "bg-green-800" : "bg-green-500"} text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2`}>
                    西
                </button>
                <button onClick={() => onHandleSetYao(4)} className={`flex-row px-4 py-2 ${loser === 4 ? "bg-green-800" : "bg-green-500"} text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2`}>
                    北
                </button>
            </div>
            {congrat && (<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mx-auto p-5 border shadow-lg rounded-md bg-white">
                <div className="mt-3 text-center">恭喜恭喜</div>
                {wind === loser
                    ? (<div className="mt-3 text-center">{getWind(wind)}风咬到自己</div>)
                    : (<div className="mt-3 text-center">{getWind(wind)}风咬到{getWind(loser)}风</div>)}
            </div>)
            }
        </div>
    )
}
