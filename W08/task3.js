d3.csv("https://mikan1996.github.io/InfoVis2021/W08/task1.csv")
    .then( data => {
        data.forEach( d => { d.value = +d.value; d.label = d.label; });
        var config = {
            parent: '#drawing_region',
            width: 256,
            height: 256,
            radius: 128,
            margin: {top:40, right:40, bottom:40, left:40},
            axis_margin: {top:10, right:10, bottom:10, left:20}
        }

        const piechart = new Piechart( config, data );
        piechart.update();
    })
    .catch( error => {
        console.log( error );
    });

class Piechart {

    constructor( config, data ) {
        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 256,
            radius: config.radius || 128,
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
            .attr('height', self.config.height)
            .append('g')
            .attr('transform', `translate(${self.config.width/2}, ${self.config.height/2})`);
        
        self.pie = d3.pie()
                     .value( d => d.value );

        self.arc = d3.arc()
                    .innerRadius(0)
                    .outerRadius(self.config.radius);

        self.pie_group = self.svg.selectAll("pie")
            .data(self.pie(self.data))
            .enter()
            .append("g");

    }

    update() {
        let self = this;
        self.render();
    }

    render() {
        let self = this;

        self.pie_group.append('path')
                .attr('d', self.arc)
                .attr('fill', 'black')
                .attr('stroke', 'white')
                .style('stroke-width', '2px');


        self.pie_group.append('text')
                        .attr("fill", "white")
                        .attr("transform", d => "translate(" + self.arc.centroid(d) + ")")
                        .attr("text-anchor", "middle")
                        .text(d => d.data.label);
    }
}
