export const separator = (numb) => {
  var str = numb.toString().split(".");
  str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return str.join(".");
};

export const remainingDays = () => {
  var date = new Date();
  var time = new Date(date.getTime());
  time.setMonth(date.getMonth() + 1);
  time.setDate(0);

  var days =
    time.getDate() > date.getDate() ? time.getDate() - date.getDate() : 0;

  return days;
};
