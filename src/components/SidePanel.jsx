import { useContext } from "react"
import { ScoreContext } from "../ScoreProvider"
import { Table } from "./Table"

export const SidePanel = () => {
    const { handleReset, stats, hideIncome, handleIncomeToggle } = useContext(ScoreContext)

    return (
        <div className="flex-col h-full">
            <div className="absolute right-0 border rounded border-red-500 text-white bg-red-500 m-1 p-1" onClick={handleReset}>reset</div>
            <div className="absolute right-0 top-10 border rounded border-red-500 text-white bg-red-500 m-1 p-1" onClick={handleIncomeToggle}>{hideIncome ? "show" : "hide"}</div>
            <Table rows={stats} />
        </div>
    )
}
