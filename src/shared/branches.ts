export class Branches {
  branches: Record<string, string> = {
    "HN": 'Hà Nội',
    "HCM": 'Tp. HCM',
    "DN": 'Đà Nẵng',
    "DNA": 'Đồng Nai',
    "HP": 'Hải Phòng',
    "CTO": 'Cần Thơ',
    "VAS": 'VAS',
  };

  public getBranchesFullname(code: number) {
    return this.branches[code];
  }

  public getLength() {
    return Object.keys(this.branches).length + 1;
  }
}
