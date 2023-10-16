export const deadline = (deadlineDate: string): string => {
  const today: Date = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Seoul" })
  );
  const deadline: Date = new Date(deadlineDate);
  const timeDifference: number = deadline.getTime() - today.getTime();
  const daysRemaining: number = Math.ceil(
    timeDifference / (1000 * 60 * 60 * 24)
  );

  if (daysRemaining < 0) {
    return `지난 날짜`;
  } else if (daysRemaining === 0) {
    return "오늘 마감";
  } else {
    return `마감 ${daysRemaining}일 전`;
  }
};
