interface User {
  username: string;
  phone: number;
  upi: string;
  wallets: Object;
  walletAddress: string;
}

export interface NewWalletPayload {
  phone: number;
  walletName: string;
  walletAddress: string;
}

export interface GroupInfo {
  groupName: string;
  users: [];
}

export default User;
