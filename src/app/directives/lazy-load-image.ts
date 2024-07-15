import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({ selector: 'img[lazy]' })
export class LazyImgDirective implements AfterViewInit {
  constructor(
    private el: ElementRef<HTMLImageElement>,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit(): void {
    const img: HTMLImageElement = this.el.nativeElement;
    const dataSrc = img.getAttribute('data-src');

    switch(true) {
      case 'loading' in HTMLImageElement.prototype:
        this.renderer.setAttribute(img, 'loading', 'lazy');
        if (dataSrc) {
          this.renderer.setAttribute(img, 'src', dataSrc);
        }
        break;
      case 'IntersectionObserver' in window:
        this.lazyLoadWithIntersectionObserver(img, dataSrc);
        break;
      default:
        this.loadImage(img, dataSrc);
    }
  }

  private lazyLoadWithIntersectionObserver(img: HTMLImageElement, dataSrc: string | null): void {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadImage(img, dataSrc);
          obs.unobserve(entry.target);
        }
      });
    });

    observer.observe(img);
  }

  private loadImage(img: HTMLImageElement, dataSrc: string | null): void {
    if (dataSrc) {
      this.renderer.setAttribute(img, 'src', dataSrc);
    }
  }
}
