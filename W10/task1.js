d3.csv("https://mikan1996.github.io/InfoVis2021/W08/task1.csv")
    .then( data => {
        data.forEach( d => { d.value = +d.value; d.label = d.label; });
        var config = {
            parent: '#drawing_region',
            width: 256,
            height: 256,
            margin: {top:40, right:40, bottom:60, left:60},
            axis_margin: {top:10, right:10, bottom:10, left:10}
        }

        const barchart = new Barchart( config, data );
        barchart.update();
    })
    .catch( error => {
        console.log( error );
    });

class Barchart {

    constructor( config, data ) {
        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 128,
            margin: config.margin || {top:10, right:10, bottom:10, left:10},
            axis_margin:config.axis_margin || {top:10, right:10, bottom:10, left:10}
        }
        this.data = data;
        this.init();
    }

    init() {
        let self = this;

        self.svg = d3.select( self.config.parent )
            .attr('width', self.config.width)
            .attr('height', self.config.height);


        self.chart = self.svg.append('g')
            .attr('transform', `translate(${self.config.margin.left}, ${self.config.margin.top})`);

        self.inner_width = self.config.width - self.config.margin.left - self.config.margin.right;
        self.inner_height = self.config.height - self.config.margin.top - self.config.margin.bottom;

        self.xscale = d3.scaleLinear()
            .domain([0, d3.max(self.data, d => d.value)])
            .range( [0, self.inner_width] );

        self.yscale = d3.scaleBand()
            .domain(self.data.map(d => d.label))
            .range([0, self.inner_height])
            .paddingInner(0.1);

        self.xaxis = d3.axisBottom( self.xscale )
            .ticks(5)
            .tickSizeOuter(0);

        self.yaxis = d3.axisLeft( self.yscale )
            .tickSizeOuter(0);

        self.xaxis_group = self.chart.append('g')
            .attr('transform', `translate(0, ${self.inner_width})`)
            self.xaxis = d3.axisBottom( self.xscale )
            .ticks(6)
            

        self.yaxis_group = self.chart.append('g')
            .attr('transform', `translate(0,0)`)
            self.yaxis = d3.axisLeft( self.yscale )
            .ticks(4)
        
    }

    update() {
        let self = this;
        self.render();
        
        
    }

    render() {
        let self = this;
        let padding = 10;
        let height = 20;

        self.chart.selectAll("rect")
            .data(self.data)
            .join("rect")
            .transition().duration(1000)
            .attr("x", 0)
            .attr("y", (d,i) => padding + i * ( height + padding ))
            .attr("width", d => self.xscale(d.value))
            .attr("height", self.yscale.bandwidth());
                
        self.xaxis_group
            .call( self.xaxis )
        self.yaxis_group
            .call( self.yaxis )

        d3.select('#reverse')
            .on('click', d => {
                self.data.reverse();
                self.update();
            });
        
    }
}

    