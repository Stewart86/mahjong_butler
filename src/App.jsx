import { MainBoard } from "./components/MainBoard";
import { ScoreProvider } from "./ScoreProvider";
import { SidePanel } from "./components/SidePanel";
import { ScoreBoard } from "./components/ScoreBoard";

export const App = () => {
    return (
        <div className="flex justify-around items-center h-screen w-screen">
            <ScoreProvider>
                <MainBoard />
                <SidePanel />
                <ScoreBoard />
            </ScoreProvider>
        </div>
    )
}
