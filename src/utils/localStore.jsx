export const luuXuongLocal = (ten, data) => {
  const newData = JSON.stringify(data);
  localStorage.setItem(ten, newData);
};
export const layDuLieuLocal = (ten) => {
  const value = localStorage.getItem(ten);
  // khi parse xong có 2 TH xảy ra, 1 là có data, 2 là null nếu như ko có data
  if (JSON.parse(value)) {
    return JSON.parse(value);
  } else {
    return null;
  }
};
