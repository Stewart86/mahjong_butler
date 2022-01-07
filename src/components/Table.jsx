export const Table = ({rows}) => {
  return (
    <div className="flex flex-col h-screen pb-2">
      <div className="-my-2 overflow-x-auto sm:-mx-2">
        <div className="py-2 align-middle inline-block min-w-full sm:px-2">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Round
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Wind
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Result
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rows.map((item, i) => (
                  <tr key={i}>
                    <td className="px-2  whitespace-nowrap text-sm text-gray-500">{item.round}</td>
                    <td className="px-2  whitespace-nowrap text-sm text-gray-500">{item.wind}</td>
                    <td className="px-2  whitespace-nowrap">
                        {item.result === "won" ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-200 text-green-800">
                        {item.result}
                      </span>
                        ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-200 text-red-800">
                        {item.result}
                      </span>
                        )}
                    </td>
                    <td className="px-2 whitespace-nowrap text-sm text-gray-500">{item.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
