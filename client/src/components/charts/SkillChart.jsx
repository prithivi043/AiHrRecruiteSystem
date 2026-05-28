import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const SkillChart = ({
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
          AI Skill Analysis
        </h2>

        <p className="text-gray-500 text-sm">
          Employee & candidate skill
          evaluation
        </p>
      </div>

      <div className="w-full h-[350px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis dataKey="skill" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="score"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const skillData = [
  {
    skill: "React",
    score: 90,
  },
  {
    skill: "Node.js",
    score: 75,
  },
  {
    skill: "MongoDB",
    score: 80,
  },
  {
    skill: "AI",
    score: 65,
  },
];

<SkillChart data={skillData} />;

export default SkillChart;