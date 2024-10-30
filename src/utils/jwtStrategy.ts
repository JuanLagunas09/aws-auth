import passport from "passport";
import {
  Strategy,
  ExtractJwt,
  StrategyOptionsWithoutRequest,
} from "passport-jwt";
import boom from "@hapi/boom";
import { config } from "../config/config";

const options: StrategyOptionsWithoutRequest = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.JWT_SECRET!,
};

const jwtStrategy = new Strategy(options, async (payload, done) => {
  try {
    if (payload.user) {
      return done(null, payload);
    }
    return done(boom.unauthorized("Unauthorized"), false);
  } catch (error) {
    return done(error, false);
  }
});

passport.use(jwtStrategy);
