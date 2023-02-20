const EventGenre = ({ events }) => {
  const [data, setData] = useState([]);
  const colors = ["#61DAFB", "#EC008C", "#5DAE48", "#0A69AD", "#DD0031"];

  useEffect(() => {
    const getData = () => {
      const genres = [
        { label: "React", regex: /React/i },
        { label: "JavaScript", regex: /JavaScript/i },
        { label: "Node", regex: /Node(\.js)?/i },
        { label: "jQuery", regex: /jQuery/i },
        { label: "Angular", regex: /Angular(JS)?(-Remote)?/i },
      ];
      const data = genres.map((genre) => {
        const value = events.filter((event) =>
          genre.regex.test(event.summary)
        ).length;
        return { name: genre.label, value };
      });
      // console.log("Data:", data);
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
