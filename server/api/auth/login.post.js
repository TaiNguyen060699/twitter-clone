import bcrypt from "bcrypt";
import { getUserByUsername } from "../../db/users.js";
import { generateTokens, sendRefreshToken } from "../../utils/jwt.js";
import { userTransformer } from "~~/server/transformers/user.js";
import { createRefreshToken } from "../../db/refreshTokens.js";
import { sendError } from "h3";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { username, password } = body;

  if (!username || !password) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "Invalid params",
      })
    );
  }

  const user = await getUserByUsername(username);

  if (!user) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "Username or password is invalid",
      })
    );
  }

  const doesThePasswordMatch = await bcrypt.compare(password, user.password);

  if (!doesThePasswordMatch) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "Username or password is invalid",
      })
    );
  }

  const { accessToken, refreshToken } = generateTokens(user);

  await createRefreshToken({
    token: refreshToken,
    userId: user.id,
  });

  console.log('event', event)
  sendRefreshToken(event, refreshToken);

  return {
    access_token: accessToken,
    user: userTransformer(user),
  };
});
