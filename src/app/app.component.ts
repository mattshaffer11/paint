import { Component, HostListener, OnInit } from '@angular/core';
import { Path, Snapshot, PersistenceService } from '~/core';
import { MAX_HISTORY_SIZE } from './app.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  color = '';
  strokeWidth = 0;
  elements: Path[] = [];
  past: Snapshot[] = [];
  future: Snapshot[] = [];

  constructor(private readonly persistenceService: PersistenceService) {}

  ngOnInit() {
    this.loadFromDisk();
  }

  changeColor(color: string) {
    this.color = color;
  }

  changeStrokeWidth(value: number) {
    this.strokeWidth = value;
  }

  addElement(path: Path) {
    this.saveToPast();
    this.elements = [...this.elements, path];
  }

  clear() {
    this.saveToPast();
    this.elements = [];
  }

  undo() {
    if (this.past.length === 0) {
      return;
    }
    this.saveToFuture();
    this.loadFromSnapshot(this.past.pop() as Snapshot);
  }

  redo() {
    if (this.future.length === 0) {
      return;
    }
    this.saveToPast();
    this.loadFromSnapshot(this.future.pop() as Snapshot);
  }

  @HostListener('window:beforeunload')
  private saveToDisk() {
    this.persistenceService.save({
      past: this.past,
      current: {
        color: this.color,
        strokeWidth: this.strokeWidth,
        elements: this.elements,
      },
      future: this.future,
    });
  }

  private saveToPast() {
    this.saveToHistory(this.past);
  }

  private saveToFuture() {
    this.saveToHistory(this.future);
  }

  private saveToHistory(history: Snapshot[]) {
    history.push({
      color: this.color,
      strokeWidth: this.strokeWidth,
      elements: [...this.elements],
    });
    if (history.length > MAX_HISTORY_SIZE) {
      history.shift();
    }
  }

  private loadFromSnapshot(snapshot: Snapshot) {
    this.elements = snapshot.elements;
  }

  private loadFromDisk() {
    const state = this.persistenceService.load();
    this.color = state.current.color;
    this.strokeWidth = state.current.strokeWidth;
    this.elements = state.current.elements;
    this.past = state.past;
    this.future = state.future;
  }
}
