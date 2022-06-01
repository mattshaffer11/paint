import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { MAX_BRUSH_SIZE, MIN_BRUSH_SIZE } from '~/app.constants';

@Component({
  selector: 'app-size-slider',
  templateUrl: './size-slider.component.html',
  styleUrls: ['./size-slider.component.scss']
})
export class SizeSliderComponent {
  @Input() value = 0;
  @Output('change') changeEvent = new EventEmitter<number>();
  min = MIN_BRUSH_SIZE;
  max = MAX_BRUSH_SIZE;

  change(event: MatSliderChange) {
    if (!event.value) {
      return;
    }

    this.changeEvent.emit(event.value);
  }
}
