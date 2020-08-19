export const checkUserIsAdmin = (currentUser) => {
  if (!currentUser || !Array.isArray(currentUser.userRoles)) return false;
  const { userRoles } = currentUser;
  console.log("Checking: " + userRoles.includes("admin"));
  if (userRoles.includes("admin")) return true;

  return false;
};
