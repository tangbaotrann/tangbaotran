// handle swap currency
const swapCurrency = (soTienHoanDoi, loaiTienNguon, loaiTienMuonHoanDoi) => {
  return ((soTienHoanDoi * loaiTienNguon) / loaiTienMuonHoanDoi).toFixed(5);
};

export default swapCurrency;
