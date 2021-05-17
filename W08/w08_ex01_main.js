var data = [
    {label:'Apple', value:100},
    {label:'Banana', value:200},
    {label:'Cookie', value:50},
    {label:'Doughnut', value:120},
    {label:'Egg', value:80}
];//読み込むデータ

var width = 256;//描画範囲　constructorの中のconfig
var height = 128;//描画範囲 constructorの中のconfig
var margin = {top:10, right:10, bottom:20, left:60};//描画範囲 constructorの中のconfig

var svg = d3.select('#drawing_region')//htmlの中にsvgタグがある
    .attr('width', width)
    .attr('height', height);//呪文

var chart = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);//translate(x1,y1):x座標がx1,y座標がy1ずらす　原点をずらす

const inner_width = width - margin.left - margin.right;//描画範囲の横幅
const inner_height = height - margin.top - margin.bottom;//描画範囲の縦幅

// Initialize axis scales
const xscale = d3.scaleLinear()//x座標を返す
      .domain([0, d3.max(data, d => d.value)])//元々の範囲　
      .range([0, inner_width]);//縮尺を変えた範囲

const yscale = d3.scaleBand()//y座標を返す
      .domain(data.map(d => d.label))
      .range([0, inner_height])
      .paddingInner(0.1);//Barchart用　棒グラフ同士の間隔の幅

// Initialize axes
const xaxis = d3.axisBottom( xscale )
      .ticks(5)
      .tickSizeOuter(0);//よく分からん

const yaxis = d3.axisLeft( yscale )
      .tickSizeOuter(0);//数値的なメモリが必要ないのでticksがない

// Draw the axis
const xaxis_group = chart.append('g')
      .attr('transform', `translate(0, ${inner_height})`)
      .call( xaxis );//renderの中

const yaxis_group = chart.append('g')
      .call( yaxis );//renderの中

// Draw bars
chart.selectAll("rect").data(data).enter()
    .append("rect")
    .attr("x", 0)//chartの0
    .attr("y", d => yscale(d.label))//yの開始地点
    .attr("width", d => xscale(d.value))
    .attr("height", yscale.bandwidth());
