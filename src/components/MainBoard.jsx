import { Player } from "./Player"
import { CurrentWind } from "./CurrentWind"

export const MainBoard = () => {
    return (
        <div className="flex-col grid grid-cols-3 gap-7">
            <div />
            <Player wind={2}/>
            <div />
            <Player wind={3}/>
            <CurrentWind />
            <Player wind={1}/>
            <div />
            <Player wind={4}/>
            <div />
        </div>
    )
}
