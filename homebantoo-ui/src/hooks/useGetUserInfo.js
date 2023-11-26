export const useGetUserInfo = () => {
  const { username, email, userID, isAuth, preferences } =
    JSON.parse(localStorage.getItem("auth")) || {};

  return { username, email, userID, isAuth, preferences };
};