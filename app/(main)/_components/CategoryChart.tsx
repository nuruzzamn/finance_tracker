import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const COLORS = {
  Food: "#10B981",
  Salary: "#3B82F6",
  Rent: "#EC4899",
  Entertainment: "#F59E0B",
  Utilities: "#8B5CF6",
  Other: "#6B7280",
};

export const CategoryChart = () => {
  const data = [
    { name: 'Food', value: 1200 },
    { name: 'Rent', value: 2000 },
    { name: 'Entertainment', value: 800 },
    { name: 'Utilities', value: 500 },
    { name: 'Other', value: 300 },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Expense by Category</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[entry.name as keyof typeof COLORS]} 
                />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => [`$${value}`, 'Amount']}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};