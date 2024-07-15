import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';
import { IMAGE_PLACEHOLDER } from '../utils/consts';

@Directive({
  selector: 'img[errorHandling]'
})
export class ErrorHandlingImgDirective implements AfterViewInit {
  constructor(
    private el: ElementRef<HTMLImageElement>,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit(): void {
    const img: HTMLImageElement = this.el.nativeElement;

    img.onerror = () => {
      this.renderer.setAttribute(img, 'src', IMAGE_PLACEHOLDER);
      this.renderer.addClass(img, 'error');
    };
  }
}
