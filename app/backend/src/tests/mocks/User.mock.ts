export const bodyWithoutEmail = {
  "password": "secret_admin"
}

export const bodyWithoutPassword = {
  "password": "secret_admin"
}

export const bodyWithWrongEmail = {
  "email": "email.inexistente@gmail.com",
  "password": "123456",
};

export const bodyWithWrongPassword = {
  "email": "admin@admin.com",
  "password": "123456",
};

export const bodyWithSuccess = {
  "email": "admin@admin.com",
  "password": "secret_admin",
};

export const tokenMock = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjc0NTA0MDE1LCJleHAiOjE2NzQ1OTA0MTV9.oZQjBMrDB1euX6l9NLJ_be7cD9MQ7jZcI8XlDOYOEKM';

export const roleMock = 'admin'