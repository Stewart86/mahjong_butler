export const getWind = (input) => {
    const out = { 1: "东", 2: "南", 3: "西", 4: "北" }
    return out[input]
}