 function getCharts(TSid) {
    d3.json("samples.json").then((sampleData) => {
        //console.log(sampleData.samples)
        var example = sampleData.samples.filter(sam => sam.id === TSid);
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
            title: "Top 10 OTU for Individual",
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


        var wFreq = sampleData.metadata.map(d => d.wfreq);
        console.log(wFreq)
        var data2 = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: wFreq,
                title: { text: "Wash Frequency" },
                type: "indicator",
                mode: "gauge+number",
                gauge: { axis: { range: [null, 9] },
                steps: [
                 { range: [0, 1], color: "blue" },
                 { range: [1, 2], color: "dodgerblue" },
                 { range: [2, 3], color: "powderblue" },
                 { range: [3, 4], color: "palegreen" },
                 { range: [4, 5], color: "lightgreen" },
                 { range: [5, 6], color: "springgreen" },
                 { range: [6, 7], color: "lime" },
                 { range: [7, 8], color: "limegreen" },
                 { range: [8, 9], color: "darkgreen" },
               ]}
            }
        ];
        
        var layout2 = { 
            width: 600, 
            height: 500, 
            margin: { 
                t: 0, 
                b: 0 } 
            };
        Plotly.newPlot('gauge', data2, layout2);
    });
 }
 function getMeta(TSid) {
    d3.json("samples.json").then((data) => {
        var metaData = data.metadata;
        var selection = metaData.filter(sam => sam.id.toString() === TSid)[0];
        console.log(metaData);
        var demoTable = d3.select("#sample-metadata");
        demoTable.html("");
        Object.entries(selection).forEach(([key, value]) => {
            console.log(key, value);
            demoTable.append("h5").text(key + ": " + value)
        })
    });
 }
d3.json("samples.json").then((data) => {
    var dropdown = d3.select("#selDataset");
    console.log(data)
    data.names.forEach(name => dropdown.append("option").text(name).property("value"));
    getCharts(data.names[0])
    getMeta(data.names[0])
});
function optionChanged(TSid) {
    getCharts(TSid);
    getMeta(TSid)
}