// /src/tools/passwordTransformer.js

export function transformPasswordsForStorage(passwords) {
  return passwords.map((password) => ({
    passwordName: password.password_name,
    password: password.password,
  }));
}

export function transformPasswordsForUpdate(passwords) {
  return passwords.map((password) => ({
    id: password.id,
    passwordName: password.passwordName,
    password: password.decryptedPassword,
  }));
}

export function transformPasswordsForDeletion(passwords) {
  return passwords.map((password) => ({
    id: password.id,
    passwordName: password.passwordName,
  }));
}
