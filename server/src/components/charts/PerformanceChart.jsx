import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const PerformanceChart = ({
  data,
}) => {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        shadow-md
        p-5
        w-full
      "
    >
      <div className="mb-5">
        <h2
          className="
            text-2xl
            font-bold
            text-gray-800
          "
        >
          Employee Performance
        </h2>

        <p className="text-gray-500 text-sm">
          Productivity & work efficiency
          analytics
        </p>
      </div>

      <div className="w-full h-[350px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="performance"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const performanceData = [
  {
    month: "Jan",
    performance: 65,
  },
  {
    month: "Feb",
    performance: 78,
  },
  {
    month: "Mar",
    performance: 85,
  },
  {
    month: "Apr",
    performance: 90,
  },
];

<PerformanceChart
  data={performanceData}
/>;

export default PerformanceChart;

