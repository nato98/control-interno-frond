import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'unicauca-circulo',
  templateUrl: './circulo.component.html',
  styleUrls: ['./circulo.component.scss']
})
export class CirculoComponent implements OnInit {

  @Input() text: String;
  @Input() title: String;

  constructor() { }

  ngOnInit(): void {
  }

}
