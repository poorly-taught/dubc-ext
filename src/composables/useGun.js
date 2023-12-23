import { gun, user } from "../gun/gun.js";

export function useGun() {
  const createUser = async ({ username, password }) =>
    new Promise((resolve, reject) => {
      user.create(username, password, (ack) => {
        if (ack.ok) resolve(ack);
        if (ack.err) reject(err);
      });
    });

  const loginUser = async ({username, password}) => new Promise((resolve, reject) => {
    user.auth(username, password, (ack) => {
      if (!ack.err) resolve(ack)
      if (ack.err) reject(err)
    }) 
  })

  return {
    gun,
    createUser,
    loginUser
  };
}
