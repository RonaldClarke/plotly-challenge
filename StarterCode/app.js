d3.json("samples.json").then((sampleData) => {
    //console.log(sampleData.samples)
    var example = sampleData.samples.filter(sam => sam.id === "940");
    console.log(example[0]);
    var sample = example[0];
    var sortData = example.sort((a, b) => b.sample_values - a.sample_values)[0];
    console.log(sortData);
    var slicedValues = sortData.sample_values.slice(0, 10).reverse();
    console.log(slicedValues);
    var slicedOTU = sortData.otu_ids.slice(0,10).reverse();
    var slicedLabels = slicedOTU.map(label => "OTU " + label)
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
        title: "Top 10 OUT for Individual",
        margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 100
          }           
    };
    Plotly.newPlot("bar", data, layout);

    var trace1 = {
        x: sample.otu_ids,
        y: sample.sample_values,
        mode: 'markers',
        marker: {
            color: sample.otu_ids,
            size: sample.sample_values,
        },    
        text: sample.otu_labels
    };
    data1 = [trace1];
    layout1 = {
        title: "Bubble Chart of Sample",
        xaxis: {title: "OTU ID"},
        height: 600,
        width: 1100
    }
    Plotly.newPlot("bubble", data1, layout1);
});
d3.json("samples.json").then((data) => {
    var metaData = data.metadata;
    var selection = metaData.filter(sam => sam.id === 940)[0];
    console.log(selection);
    var demoTable = d3.select("#sample-metadata");
    Object.entries(selection).forEach(([key, value]) => {
        console.log(key, value);
        demoTable.append("h5").text(key + ": " + value)
    })
});
d3.json("samples.json").then((data) => {
    var dropdown = d3.select("#selDataset");
    console.log(data)
    data.names.forEach(name => dropdown.append("option").text(name).property("value"));
});