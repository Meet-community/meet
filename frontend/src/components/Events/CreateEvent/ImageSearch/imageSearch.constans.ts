export const imageSearchConfig = {
  gap: {
    m: 4,
    pc: 8,
  },
  height: {
    m: 140,
    pc: 180,
  },
  initialSearchQuery: 'events',

  get galleryHeightPc() {
    return (this.gap.pc * 3) + (2 * this.height.pc) + 10;
  },

  get galleryHeightM() {
    return (this.gap.m * 3) + (2 * this.height.m) + 10;
  },
};
