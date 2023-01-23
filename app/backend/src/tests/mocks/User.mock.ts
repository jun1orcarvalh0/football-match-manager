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