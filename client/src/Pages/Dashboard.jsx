import React from 'react'
import * as V from 'victory';

const data = [
    {quarter: 1, earnings: 13000},
    {quarter: 2, earnings: 16500},
    {quarter: 3, earnings: 14250},
    {quarter: 4, earnings: 19000}
  ];

function Dashboard() {
  return (
    <div style={{width:"max-width", height:"500px"}}>
        Dashboard
      <V.VictoryChart theme={V.VictoryTheme.grayscale} domainPadding={20}>
        <V.VictoryAxis
          tickValues={[1, 2, 3, 4]}
          tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
        />
        <V.VictoryAxis
          dependentAxis
          tickFormat={(x) => (`$${x / 1000}k`)}
        />
        <V.VictoryBar
            data={data}
            // data accessor for x values
            x="quarter"
            // data accessor for y values
            y="earnings"
        />
      </V.VictoryChart>
    </div>
  )
}

export default Dashboard