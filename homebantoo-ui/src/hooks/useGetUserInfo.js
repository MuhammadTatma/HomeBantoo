export const useGetUserInfo = () => {
  const { username, email, userID, isAuth } =
    JSON.parse(localStorage.getItem("auth")) || {};

  return { username, email, userID, isAuth };
};