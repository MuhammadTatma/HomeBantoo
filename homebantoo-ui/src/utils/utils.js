

export function daysUntillExpired(tanggal){

  const date = new Date(tanggal);
  const today = new Date().toDateString();
  const now = new Date(today);

  const Difference_In_Time = date.getTime() - now.getTime();
  const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24); 

  return Difference_In_Days;
}