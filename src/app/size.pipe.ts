import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'size'
})
export class SizePipe implements PipeTransform {

  transform(value: string | number, format: string = 'mb'): string {
    let formats: {[key: string]: number} = {kb:1024, mb: 1024*1024, gb: 1024*1024*1024, tb: 1024*1024*1024*1024}
    let key: string = format.toLowerCase()
    let factor = formats[key]
    // @ts-ignore
    let size: number = value instanceof String ? parseInt(value): value
    size = Number(Math.round(Number(size / factor + 'e' + 2)) + 'e-' + 2)
    return `${size} ${key.toUpperCase()}`
  }

}
