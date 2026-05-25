import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent implements OnInit, OnDestroy {
  @Input() items: any[] = [];
  @Input() showIndicators: boolean = true;
  @Input() showArrows: boolean = true;
  @Input() autoPlay: boolean = false;
  @Input() autoPlayInterval: number = 5000; // milliseconds
  @Output() itemChanged = new EventEmitter<number>();

  @ContentChild('carouselItemTemplate') itemTemplate!: TemplateRef<any>;

  activeIndex = 0;
  private autoPlayTimer: any;

  ngOnInit() {
    this.startAutoPlay();
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  next() {
    this.activeIndex = (this.activeIndex + 1) % this.items.length;
    this.itemChanged.emit(this.activeIndex);
    this.resetAutoPlay();
  }

  prev() {
    this.activeIndex = (this.activeIndex - 1 + this.items.length) % this.items.length;
    this.itemChanged.emit(this.activeIndex);
    this.resetAutoPlay();
  }

  goToItem(index: number) {
    this.activeIndex = index;
    this.itemChanged.emit(this.activeIndex);
    this.resetAutoPlay();
  }

  private startAutoPlay() {
    if (this.autoPlay && this.items.length > 1) {
      this.autoPlayTimer = setInterval(() => {
        this.next();
      }, this.autoPlayInterval);
    }
  }

  private stopAutoPlay() {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
    }
  }

  private resetAutoPlay() {
    this.stopAutoPlay();
    this.startAutoPlay();
  }
}
