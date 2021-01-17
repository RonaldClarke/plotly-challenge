d3.json("samples.json").then((data) => {
    console.log(data.samples)
    var example = data.samples.filter(s => s.id === "940");
    console.log(example);
    sortData = example.sort((a, b) => b.sample_values - )
});