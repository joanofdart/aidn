import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Breed } from 'src/app/models/breed';
import { ApiService } from './api.service';

@Component({
  selector: 'app-select-box[key]',
  templateUrl: './select-box.component.html',
  styleUrls: ['./select-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectBoxComponent implements OnInit, OnDestroy {
  @Input() key: keyof Breed;

  breeds: Breed[];
  isOpen: boolean;
  selected: Breed;
  modified: boolean;

  #takeUntil: Subject<void>;

  arrayOfColors: ['#99DAFF', '#FBD960', '#b7faac'];

  constructor(
    private readonly apiService: ApiService,
    private readonly cdRef: ChangeDetectorRef
  ) {
    this.breeds = [];
    this.#takeUntil = new Subject<void>();
  }

  ngOnInit(): void {
    if (this.key === 'weight' || this.key === 'height') {
      throw new Error(`Unsupported key: ${this.key}`);
    }

    if (!this.key) {
      throw new Error('A key is required');
    }

    this.apiService
      .fetchBreeds()
      .pipe(takeUntil(this.#takeUntil))
      .subscribe((breeds) => {
        this.breeds = breeds;

        this.selected = this.breeds.length
          ? (this.selected = this.breeds[0])
          : ({} as Breed);

        this.cdRef.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.#takeUntil.next();
    this.#takeUntil.complete();
  }

  open(): void {
    this.isOpen = !this.isOpen;
  }

  select(breed: Breed): void {
    this.modified = true;
    this.selected = breed;
    this.open();
  }

  randomColor(): string {
    let color = '#';
    const letters = '0123456789ABCDEF';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
  }
}
