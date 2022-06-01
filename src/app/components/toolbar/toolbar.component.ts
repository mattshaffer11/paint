import { Component, EventEmitter, Input, Output } from '@angular/core';
import { COLORS } from '~/app.constants';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  @Input() activeColor = '';
  @Input() strokeWidth = 0;
  @Output('changeColor') changeColorEvent = new EventEmitter<string>();
  @Output('changeStrokeWidth') changeStrokeWidthEvent = new EventEmitter<number>();
  @Output('undo') undoEvent = new EventEmitter<void>();
  @Output('redo') redoEvent = new EventEmitter<void>();
  @Output('clear') clearEvent = new EventEmitter<void>();
  colors = COLORS;

  changeColor(color: string) {
    this.changeColorEvent.emit(color);
  }

  changeStrokeWidth(value: number) {
    this.changeStrokeWidthEvent.emit(value);
  }

  undo() {
    this.undoEvent.emit();
  }

  redo() {
    this.redoEvent.emit();
  }

  clear() {
    this.clearEvent.emit();
  }
}
