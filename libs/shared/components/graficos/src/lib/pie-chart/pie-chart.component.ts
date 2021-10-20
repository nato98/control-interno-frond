import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'unicauca-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  @Input() single: [];

  view: [number, number] = [380, 250];

  // options
  gradient: boolean = false;
  showLegend: boolean = true;
  showLabels: boolean = false;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';
  @Input() legendTitle: string = '';

  colorScheme = {
    domain: ['#FB6D80', '#89D9FB', '#8AF8B5', '#FFF081', '#8191FF']
  };

  constructor() {
    Object.assign(this, this.single);
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  ngOnInit(): void {
  }
}
