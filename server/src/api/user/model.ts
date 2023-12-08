interface User {
  username: string;
  phone: number;
  upi: string;
  walletAddress: string;
}

export interface GroupInfo {
  groupName: string;
  users: [];
}

export default User;
