d3.json("samples.json").then((sampleData) => {
    console.log(sampleData.samples)
    var example = sampleData.samples.filter(s => s.id === "940");
    console.log(example);
    var sortData = example.sort((a, b) => b.sample_values - a.sample_values)[0];
    console.log(sortData);
    var slicedValues = sortData.sample_values.slice(0, 10).reverse();
    console.log(slicedValues);
    var slicedLabels = sortData.otu_ids.slice(0,10).reverse();
    slicedLabels = slicedLabels.map(label => "OTU " + label)
    console.log(slicedLabels);
    var slicedHover = sortData.otu_labels.slice(0,10).reverse();
    console.log(slicedHover)
    var trace = {
        x: slicedValues,
        y: slicedLabels,
        text: slicedHover,
        type: "bar",
        orientation: "h"
    };
    var data = [trace];
    var layout = {
        title: "Tp 10 OUT for Individual",
        margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 100
          }           
    };
    Plotly.newPlot("bar", data, layout);
});
