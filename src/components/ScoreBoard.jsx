import { useContext } from "react"
import { ScoreContext } from "../ScoreProvider"

export const ScoreBoard = () => {
    const { setting, score, gameEnd } = useContext(ScoreContext)

    const convertToCurr = (num) => (
        new Intl.NumberFormat("en-SG", {
            currency: "SGD",
            style: "currency"
        }).format(num)
    )

    if (gameEnd) {
        return (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mx-auto p-5 border shadow-lg rounded-md bg-white">
                <div className="mt-3 text-center">End Game</div>
                <div className="mt-3 px-2">东<span className="px-8 border m-1">{setting.half ? convertToCurr(score[1].amount / 2) : score[1].amount}</span></div>
                <div className="mt-3 px-2">南<span className="px-8 border m-1">{setting.half ? convertToCurr(score[2].amount / 2) : score[2].amount}</span></div>
                <div className="mt-3 px-2">西<span className="px-8 border m-1">{setting.half ? convertToCurr(score[3].amount / 2) : score[3].amount}</span></div>
                <div className="mt-3 px-2">北<span className="px-8 border m-1">{setting.half ? convertToCurr(score[4].amount / 2) : score[4].amount}</span></div>
            </div>
        )
    }
    return null
}
