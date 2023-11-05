/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.LoginUserVO } | undefined) {
  const { currentUser } = initialState ?? {};
  // console.log("userRole:", currentUser && currentUser.userRole)
  return {
    canAdmin: currentUser && currentUser.userRole === 'admin',
  };
}
