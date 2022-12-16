import React, { PureComponent, useEffect, useState } from "react";
import { VictoryPie, VictoryChart, VictoryAxis, VictoryBar } from "victory";

const data1 = [
  { x: "cats", y: 10 },
  { x: "dogs", y: 50 },
  { x: "birds", y: 40 },
];
const data2 = [
  { x: "cats", y: 0 },
  { x: "dogs", y: 0 },
  { x: "birds", y: 100 },
];

function ChartPie() {
  const [data, setData] = useState(data2);

  useEffect(() => {
    setData(data1);
  });

  return (
    <div className="chart">
      <VictoryPie
        animate={{ easing: "exp" }}
        data={data}
        innerRadius={100}
        domainPadding={20}
      >
        {/* <VictoryAxis
          // tickValues specifies both the number of ticks and where
          // they are placed on the axis
          tickValues={[1, 2, 3, 4]}
          tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
        />
        <VictoryAxis
          dependentAxis
          // tickFormat specifies how ticks should be displayed
          tickFormat={(x) => `$${x / 1000}k`}
        /> */}
        {/* <VictoryBar data={data} x="quarter" y="earnings" /> */}
      </VictoryPie>
    </div>
  );
}

export default ChartPie;

// const COLORS = [' #EEEEEE', '#CCCCCC', '#666666','#333333'];

// const RADIAN = Math.PI / 180;
// const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
//   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//   const x = cx + radius * Math.cos(-midAngle * RADIAN);
//   const y = cy + radius * Math.sin(-midAngle * RADIAN);

//   return (
//     <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
//       {`${(percent * 100).toFixed(0)}%`}
//     </text>
//   );
// };

//  function ChartPie() {

//     return (
//       <ResponsiveContainer width="100%" aspect={8}>
//         <PieChart width={400} height={400}>
//           <Pie
//             data={data}
//             cx="50%"
//             cy="50%"
//             labelLine={false}
//             label={renderCustomizedLabel}
//             outerRadius={80}
//             fill="#8884d8"
//             dataKey="value"
//           >
//             {data.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//             ))}
//           </Pie>
//         </PieChart>
//       </ResponsiveContainer>
//     );
// }

// export default ChartPie;
