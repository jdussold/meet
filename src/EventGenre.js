import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

const EventGenre = ({ events }) => {
  const [data, setData] = useState([]);
  const colors = ["#61DAFB", "#EC008C", "#5DAE48", "#0A69AD", "#DD0031"];

  useEffect(() => {
    const getData = () => {
      const genres = [
        "React",
        "JavaScript",
        "Node(.js)?",
        "jQuery",
        "Angular(JS)?(-Remote)?",
      ];
      const data = genres.map((genre) => {
        const regex = new RegExp(genre, "i");
        const value = events.filter((event) =>
          regex.test(event.summary)
        ).length;
        return { name: genre, value };
      });
      console.log("Data:", data);
      return data;
    };
    setData(() => getData());
  }, [events]);

  return (
    <ResponsiveContainer height={400}>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
          label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index]} />
          ))}
        </Pie>
        <Legend verticalAlign="bottom" height={50} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default EventGenre;
