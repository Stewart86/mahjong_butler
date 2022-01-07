import { useContext, useState } from "react"
import { ScoreContext } from "../ScoreProvider"
import { getWind } from "./utils"
import { WinModal } from "./WinModal"

export const Player = ({ wind }) => {
    const { score, hideIncome } = useContext(ScoreContext)
    const [open, setOpen] = useState(false)

    const onHandleClick = () => {
        setOpen(true)
    }

    const onHandleClose = () => {
        setOpen(false)
    }

    return (
        <div>
            <div className="item-center border-2 border-blue-600 shadow-black shadow-md rounded-md p-1 py-2 text-4xl text-center m-2 cursor-pointer hover:bg-slate-200"
                onClick={() => onHandleClick()}>
                {getWind(wind)}
            </div>
            <div className="flex-grow">
                {!hideIncome && (<div className="flex-row">
                    income: {score[wind].amount}
                </div>)}
                {score[wind].zhuang &&
                    <div className="flex-row p-1 text-center text-xs text-white bg-red-600 rounded border">
                        庄家
                    </div>
                }
            </div>
            {open && <WinModal wind={wind} onHandleClose={onHandleClose} />}
        </div>
    )
}
