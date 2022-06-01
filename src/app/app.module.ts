import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { AppComponent } from './app.component';
import { CanvasComponent, ColorIconComponent, SizeSliderComponent, ToolbarComponent } from './components';

@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent,
    ColorIconComponent,
    SizeSliderComponent,
    ToolbarComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    MatButtonModule,
    MatIconModule,
    MatSliderModule,
    MatToolbarModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
