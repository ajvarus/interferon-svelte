// /src/tools/passwordTransformer.js

export default function transformPasswordsForStorage(passwords) {
  return passwords.map((password) => ({
    passwordName: password.password_name,
    password: password.password,
  }));
}
