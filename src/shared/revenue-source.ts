export class RevenueSource {
  operation: Record<number, string> = {
    0: 'Trong Mobifone',
    1: 'Ngoài Mobifone',
    2: 'Dự án và các nguồn DT khác',
  };

  public getRevenueSource(code: number) {
    return this.operation[code];
  }

  public getLength() {
    return Object.keys(this.operation).length + 1;
  }
}
