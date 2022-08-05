export const imageSearchConfig = {
  rowCount: {
    m: 2,
    pc: 2,
  },
  gap: {
    m: 8,
    pc: 8,
  },
  height: {
    m: 140,
    pc: 180,
  },
  initialSearchQuery: 'events',

  get galleryHeightPc() {
    return (this.gap.pc * this.rowCount.pc + 1)
      + (this.rowCount.pc * this.height.pc)
      + (this.height.pc / 3);
  },

  get galleryHeightM() {
    return (this.gap.m * this.rowCount.m + 1)
      + (this.rowCount.m * this.height.m)
      + (this.height.m / 2);
  },
};
