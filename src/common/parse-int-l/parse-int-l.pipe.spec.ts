import { ParseIntLPipe } from './parse-int-l.pipe';
import { BadRequestException } from '@nestjs/common';

describe('ParseIntLPipe', () => {
    const pipe = new ParseIntLPipe();

    it('should be defined', () => {
        expect(pipe).toBeDefined();
    });

    it('should transform string to number', () => {
        expect(pipe.transform('123')).toBe(123);
    });
    it('should throw if value is not a number', () => {
        expect(() => pipe.transform('abc')).toThrow(BadRequestException);
    });
});
