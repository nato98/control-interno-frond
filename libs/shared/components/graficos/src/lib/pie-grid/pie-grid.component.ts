import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'unicauca-pie-grid',
  templateUrl: './pie-grid.component.html',
  styleUrls: ['./pie-grid.component.scss']
})
export class PieGridComponent implements OnInit {

  single = [
    {
      name: 'Avance',
      value: 40,
    },
    {
      name: 'Cumplimiento',
      value: 72,
    },
  ];

  view: any[] = [380, 200];

  // options
  showLegend: boolean = true;
  showLabels: boolean = true;

  colorScheme = {
    domain: ['#051A54', '#051A54', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };

  constructor() {
    Object.assign(this, this.single);
  }

  onSelect(event) {
    console.log(event);
  }

  ngOnInit(): void {
  }

}
