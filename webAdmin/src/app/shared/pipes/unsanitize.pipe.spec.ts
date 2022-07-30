import { UnsanitizePipe } from './unsanitize.pipe';

describe('UnsanitizePipe', () => {
  it('create an instance', () => {
    const pipe = new UnsanitizePipe();
    expect(pipe).toBeTruthy();
  });
});
