interface IUserCredentials {
  email: string
  password: string
}

export default interface IUser extends IUserCredentials {
  id?: number
  username: string
  role: string
}

export { IUserCredentials };
