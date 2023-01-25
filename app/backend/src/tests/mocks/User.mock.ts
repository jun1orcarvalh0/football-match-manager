export const rightUser = {
  id: 2,
  username: 'User',
  role: 'user',
  email: 'user@user.com',
  password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
}

export const bodyWithoutEmail = {
  password: 'secret_user',
}

export const bodyWithoutPassword = {
  email: 'user@user.com',
}

export const bodyWithWrongEmail = {
  "email": "email.inexistente@gmail.com",
  "password": "123456",
};

export const bodyWithWrongPassword = {
  email: 'user@user.com',
  password: 'hbcdsjhabjsh',
};

export const bodyWithSuccess = {
  email: 'user@user.com',
  password: 'secret_user',
};

export const tokenMock = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhVmFsdWVzIjp7ImlkIjoyLCJ1c2VybmFtZSI6IlVzZXIiLCJyb2xlIjoidXNlciIsImVtYWlsIjoidXNlckB1c2VyLmNvbSIsInBhc3N3b3JkIjoiJDJhJDA4JFk4QWJpOGpYdnNYeXFtLnJtcDBCLnVRQkE1cVV6N1Q2R2hsZy9DdlZyL2dMeFlqNVVBWlZPIn0sIl9wcmV2aW91c0RhdGFWYWx1ZXMiOnsiaWQiOjIsInVzZXJuYW1lIjoiVXNlciIsInJvbGUiOiJ1c2VyIiwiZW1haWwiOiJ1c2VyQHVzZXIuY29tIiwicGFzc3dvcmQiOiIkMmEkMDgkWThBYmk4alh2c1h5cW0ucm1wMEIudVFCQTVxVXo3VDZHaGxnL0N2VnIvZ0x4WWo1VUFaVk8ifSwidW5pcW5vIjoxLCJfY2hhbmdlZCI6e30sIl9vcHRpb25zIjp7ImlzTmV3UmVjb3JkIjpmYWxzZSwiX3NjaGVtYSI6bnVsbCwiX3NjaGVtYURlbGltaXRlciI6IiIsInJhdyI6dHJ1ZSwiYXR0cmlidXRlcyI6WyJpZCIsInVzZXJuYW1lIiwicm9sZSIsImVtYWlsIiwicGFzc3dvcmQiXX0sImlzTmV3UmVjb3JkIjpmYWxzZSwiaWF0IjoxNjc0NjcwNDM0LCJleHAiOjE2NzQ3NTY4MzR9.FS83jrG6S6SfdYHUcUc_43f6QSFvZ-ztExKJStzpFaA';

export const roleMock = 'user'