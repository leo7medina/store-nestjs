import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseIntLPipe implements PipeTransform {
    transform(value: string) {
        const val = parseInt(value, 10);
        if (isNaN(val)) {
            throw new BadRequestException(`${val} is not an number`);
        }
        return val;
    }
}
