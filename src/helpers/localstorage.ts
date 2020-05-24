export const setItemStorage = (key: string, value: any) => {
  window.localStorage.setItem(
    `daily_${key}`,
    JSON.stringify({
      value,
      timestamp: new Date(),
    })
  );
};

export const getItemStorage = (
  key: string,
  expiresInMs?: number
): any | null => {
  const retrieved = window.localStorage.getItem(`daily_${key}`);
  if (!retrieved) return null;

  const { value, timestamp } = JSON.parse(retrieved);
  if (!expiresInMs) return value;

  const timePassed = new Date().getTime() - new Date(timestamp).getTime();
  console.log(`time passed: ${timePassed}, expires in ${expiresInMs}`);

  return expiresInMs > timePassed ? value : null;
};
