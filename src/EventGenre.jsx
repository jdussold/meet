// Imports the necessary components from the "react" and "recharts" packages
import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

// Defines a new component called "EventGenre" that accepts an "events" prop
const EventGenre = ({ events }) => {
  // Sets up a state variable called "data" and initialize it to an empty array
  const [data, setData] = useState([]);

  // Defines an array of colors to be used for the pie chart
  const colors = ["#61DAFB", "#EC008C", "#5DAE48", "#0A69AD", "#DD0031"];

  // Sets up an effect hook that will be called whenever the "events" prop changes
  useEffect(() => {
    // function that will compute the data for the pie chart
    const getData = () => {
      // Defines an array of genre objects, each contains a label and a regular expression.  The regex should catch all variations of the various genres
      const genres = [
        { label: "React", regex: /React/i },
        { label: "JavaScript", regex: /JavaScript/i },
        { label: "Node", regex: /Node(\.js)?/i },
        { label: "jQuery", regex: /jQuery/i },
        { label: "Angular", regex: /Angular(JS)?(-Remote)?/i },
      ];
      // Compute the value (i.e., count) for each genre based on the events that match its regular expression
      const data = genres.map((genre) => {
        const value = events.filter((event) =>
          genre.regex.test(event.summary)
        ).length;
        // Return an object containing the genre's label and value
        return { name: genre.label, value };
      });

      // Log the data to the console for debugging purposes
      // console.log("Data:", data);

      // Return the data array
      return data;
    };
    // Set the "data" state variable to the result of calling the "getData" function
    setData(() => getData());
  }, [events]);

  // Render a responsive container that will automatically adjust the size of the chart
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
          {/* Create a cell for each data point and assign a color from the "colors" array */}
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index]} />
          ))}
        </Pie>
        {/* Add a legend to the chart */}
        <Legend verticalAlign="bottom" height={50} />
      </PieChart>
    </ResponsiveContainer>
  );
};

// Export the "EventGenre" component as the default export
export default EventGenre;
