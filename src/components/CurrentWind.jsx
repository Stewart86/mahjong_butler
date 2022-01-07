import { useContext } from "react"
import { ScoreContext } from "../ScoreProvider"
import { getWind } from "./utils"


export const CurrentWind = () => {
    const { currentWind } = useContext(ScoreContext)
    return (
        <div className="flex justify-center items-center mx-2">
            <div className="text-3xl">
                {getWind(currentWind)}风
            </div>
        </div>
    )
}