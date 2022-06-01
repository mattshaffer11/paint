import { Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Coordinate, Path } from '~/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit, OnChanges {
  @Input() color = '';
  @Input() width = 0;
  @Input() elements: Path[] = [];
  @Output('add') addElementEvent = new EventEmitter<Path>();
  currentElement: Path | null = null;
  cursor = '';

  ngOnInit() {
    this.createCursor();
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('color' in changes || 'width' in changes) {
      this.createCursor();
    }
  }

  @HostListener('mousedown', ['$event'])
  down(event: MouseEvent) {
    const { x, y } = this.getCoordinate(event);
    this.currentElement = {
      color: this.color,
      width: this.width,
      d: `M${x} ${y}`,
    };
  }

  @HostListener('mousemove', ['$event'])
  move(event: MouseEvent) {
    this.updateCurrentElement(event);
  }

  @HostListener('mouseup', ['$event'])
  up(event: MouseEvent) {
    this.updateCurrentElement(event);
    this.createElement();
  }

  @HostListener('mouseleave', ['$event'])
  leave() {
    this.createElement();
  }

  private createElement() {
    if (!this.currentElement) {
      return;
    }

    this.addElementEvent.emit(this.currentElement);
    this.currentElement = null;
  }

  private getCoordinate(event: MouseEvent): Coordinate {
    const offsetX = event.x - event.offsetX;
    const offsetY = event.y - event.offsetY;
    return {
      x: event.x - offsetX,
      y: event.y - offsetY,
    }
  }

  private updateCurrentElement(event: MouseEvent) {
    const { x, y } = this.getCoordinate(event);

    if (!this.currentElement) {
      return;
    }

    this.currentElement.d = `${this.currentElement.d} L${x} ${y}`;
  }

  private createCursor() {
    const svg = `<svg xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"${this.width}px\\" height=\\"${this.width}px\\" viewBox=\\"0 0 64 64\\" fill=\\"${encodeURIComponent(this.color)}\\"><circle cx=\\"32\\" cy=\\"32\\" r=\\"32\\" /></svg>`;
    this.cursor = `url("data:image/svg+xml;utf8,${svg}") ${this.width / 2} ${this.width / 2}, auto`;
  }
}
