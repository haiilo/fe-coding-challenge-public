import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'checkImage'
})
export class CheckImage implements PipeTransform {

    transform(url: string | null): string {
        return url || 'https://placehold.co/600x400';
    }
}