import { createContext, useEffect, useState } from "react";
import { getWind } from "./components/utils";
import { cleanSlade, payout } from "./constants";

export const ScoreContext = createContext()

export const ScoreProvider = ({ children }) => {
    const [setting, setSetting] = useState(
        () => JSON.parse(localStorage.getItem("setting")) || { "payout": "3/6", "shooter": true, "half": true }
    )
    const [score, setScore] = useState(
        () => JSON.parse(localStorage.getItem("score")) || cleanSlade
    )
    const [currentWind, setCurrentWind] = useState(
        () => JSON.parse(localStorage.getItem("currentWind")) || 1
    )
    const [stats, setStats] = useState(
        () => JSON.parse(localStorage.getItem("stats")) || []
    )
    const [round, setRound] = useState(
        () => JSON.parse(localStorage.getItem("round")) || 0
    )
    const [gameEnd, setGameEnd] = useState(false)
    const [hideIncome, setHideIncome] = useState(true)

    useEffect(() => {
        localStorage.setItem("setting", JSON.stringify(setting))
    }, [setting])

    useEffect(() => {
        localStorage.setItem("score", JSON.stringify(score))
    }, [score])

    useEffect(() => {
        localStorage.setItem("currentWind", JSON.stringify(currentWind))
    }, [currentWind])

    useEffect(() => {
        localStorage.setItem("stats", JSON.stringify(stats))
    }, [stats])

    useEffect(() => {
        localStorage.setItem("round", JSON.stringify(round))
    }, [round])

    const prepareStats = (wind, result, amount) => (
        {
            round: round + 1,
            wind: getWind(wind),
            result: result,
            amount: amount
        }
    )

    const handleSetYao = (winner, loser, hidden) => {
        const newScore = score
        if (winner !== loser) {
            const winning = hidden ? 2 : 1
            newScore[winner].amount = score[winner].amount + winning
            newScore[loser].amount = score[loser].amount - winning

            // update stats
            setStats((state) => [...state, prepareStats(winner, "won", winning), prepareStats(loser, "lost", -winning)])
        } else {
            // an gang winner
            newScore[winner].amount = hidden ? 6 : 3

            // update stats
            setStats((state) => [...state, prepareStats(winner, "won", hidden ? 6 : 3)])

            // everyone else pay 2
            for (let i = 1; i <= 4; i++) {
                if (i !== winner) {
                    newScore[i].amount = score[i].amount - (hidden ? 2 : 1)

                    // update stats
                    setStats((state) => [...state, prepareStats(i, "lost", -(hidden ? 2 : 1))])
                }
            }
        }
        setScore((state) => ({ ...state, newScore }))
    }

    const handleSetGang = (winner, loser) => {
        const newScore = score
        if (winner !== loser) {
            const winning = 3
            newScore[winner].amount = score[winner].amount + winning
            newScore[loser].amount = score[loser].amount - winning

            // update stats
            setStats((state) => [...state, prepareStats(winner, "won", winning), prepareStats(loser, "lost", -winning)])
        } else {
            // an gang winner
            newScore[winner].amount = 3 + 3

            // update stats
            setStats((state) => [...state, prepareStats(winner, "won", 3 + 3)])

            // everyone else pay 2
            for (let i = 1; i <= 4; i++) {
                if (i !== winner) {
                    newScore[i].amount = score[i].amount - 2

                    // update stats
                    setStats((state) => [...state, prepareStats(i, "lost", -2)])
                }
            }
        }
        setScore((state) => ({ ...state, newScore }))
    }

    const handleSetHu = (winner, loser, tai) => {
        const newScore = score

        if (setting.shooter && winner !== loser) {
            const winning = (payout[setting["payout"]][tai]["low"] * 2) + payout[setting["payout"]][tai]["high"]

            newScore[winner].amount = score[winner].amount + winning
            newScore[loser].amount = score[loser].amount - winning

            // update stats
            setStats((state) => [...state, prepareStats(winner, "won", winning), prepareStats(loser, "lost", -winning)])

        } else if (setting.shooter && winner === loser) { // winner === loser means zimo
            const winning = (payout[setting["payout"]][tai]["high"] * 3) + 3

            newScore[winner].amount = score[winner].amount + winning

            // update stats
            setStats((state) => [...state, prepareStats(winner, "won", winning)])

            for (let i = 1; i <= 4; i++) {
                if (i !== winner) {
                    const losing = payout[setting["payout"]][tai]["high"] + 1
                    newScore[i].amount = score[i].amount - losing

                    // update stats
                    setStats((state) => [...state, prepareStats(i, "lost", -losing)])
                }
            }
        }

        // move zhuangjia
        if (!score[winner].zhuang) {
            let zhuang = 0
            for (let i = 1; i <= 4; i++) {
                if (score[i].zhuang) {
                    zhuang = i
                }
            }
            newScore[zhuang].zhuang = false
            if (zhuang !== 4) {
                newScore[zhuang + 1].zhuang = true
            } else {
                newScore[1].zhuang = true
                if (currentWind !== 4) {
                    setGameEnd(true)
                    setCurrentWind(currentWind + 1)
                } else {
                    setCurrentWind(1)
                }
            }
        }
        setRound(round + 1)
        setScore((state) => ({ ...state, newScore }))
    }

    const handleReset = () => {
        setScore({
            1: {
                name: "dong",
                amount: 0,
                zhuang: true,
            },
            2: {
                name: "nan",
                amount: 0,
                zhuang: false,
            },
            3: {
                name: "xi",
                amount: 0,
                zhuang: false,
            },
            4: {
                name: "bei",
                amount: 0,
                zhuang: false,
            }
        })
        setSetting({ "payout": "3/6", "shooter": true, "half": true, "hideIncome": true })
        setCurrentWind(1)
        setStats([])
        setRound(0)
        setGameEnd(false)
    }

    const handleIncomeToggle = () => {
        setHideIncome(!hideIncome)
    }

    return (<ScoreContext.Provider
        value={
            {
                setting,
                hideIncome,
                handleIncomeToggle,
                score, stats, gameEnd, currentWind,
                handleSetHu,
                handleSetGang,
                handleSetYao, handleReset
            }}>{children}</ScoreContext.Provider>
    )
}