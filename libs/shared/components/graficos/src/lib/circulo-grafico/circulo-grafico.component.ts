import { Component, Input, OnInit } from '@angular/core';

/**
 * Componente para la creación del gráfico
 * de un círculo con texto dentro
 * @export
 * @class CirculoGraficoComponent
 * @implements {OnInit}
 * @author Fernanda Jaramillo
 */
@Component({
  selector: 'unicauca-circulo-grafico',
  templateUrl: './circulo-grafico.component.html',
  styleUrls: ['./circulo-grafico.component.scss']
})

export class CirculoGraficoComponent implements OnInit {

  /**
   * String que determina el texto que será renderizado dentro del
   * circulo
   * @type {String}
   * @memberof CirculoGraficoComponent
   */
  @Input() texto: String;
  /**
   * String que determina el título de la mat-card
   * @type {String}
   * @memberof CirculoGraficoComponent
   */
  @Input() titulo: String;

  ngOnInit(): void {
  }

}
