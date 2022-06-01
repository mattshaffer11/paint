import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-color-icon',
  templateUrl: './color-icon.component.html',
  styleUrls: ['./color-icon.component.scss']
})
export class ColorIconComponent {
  @Input() active = false;
  @Input() color = '';
}
