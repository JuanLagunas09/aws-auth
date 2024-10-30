import { User } from "../entity/User";
import { ISignUp, IStoreUser } from "../interfaces/IUser";
// import { AppDataSource as dbC } from "../config/db";
import { UserService } from "./UserService";
import { CognitoService } from "./CognitoService";
import jwt from "jsonwebtoken";
import { config } from "../config/config";
import boom from "@hapi/boom";
// import { BodyParser } from "body-parser";

// const dbConnection = dbC.getRepository(User);
// const user = new User();

export class AuthService {
  private userService: UserService;
  private cognitoService: CognitoService;

  constructor() {
    this.userService = new UserService();
    this.cognitoService = new CognitoService();
  }

  async signUp(data: ISignUp): Promise<User> {
    try {
      // save user in cognito
      const resultCognito = await this.cognitoService.signUp(data);
      // if cognito ok, save user in db
      if (resultCognito.$metadata.httpStatusCode === 200) {
        const cognito_id = resultCognito.UserSub; // cognito user id
        // user object to save in db
        const userStore: IStoreUser = {
          name: data.name,
          lastname: data.lastname,
          phone: data.phone,
          adress: data.adress,
          role: "user",
          id_cognito: cognito_id,
        };

        // save user in db
        const user = await this.userService.store(userStore);
        return user;
      } else {
        throw new Error("Error on register user"); // error on cognito
      }
    } catch (error) {
      throw new Error("Error on register user");
    }
  }

  async signIn(username: string, password: string): Promise<any> {
    try {
      const resultCognito = await this.cognitoService.signIn(
        username,
        password
      );

      if (!resultCognito.AuthenticationResult) {
        throw boom.unauthorized("Invalid username or password"); 
      }

      const profile = await this.cognitoService.getProfile(resultCognito.AuthenticationResult.AccessToken);
      const sub = profile.UserAttributes.find((e: any) => e.Name === "sub").Value;

      const createToken = jwt.sign(
        {
          user: resultCognito.AuthenticationResult.AccessToken,
          sub
        },
        config.JWT_SECRET!
      );

      return createToken;
    } catch (error) {
      throw boom.unauthorized("Error on sign in");
    }
  }

  async logOut(token: any): Promise<any> {
    try {
      const resultCognito = await this.cognitoService.logOut(token);
      return resultCognito;
    } catch (error) {
      throw boom.unauthorized("Error on log out");
    }
  }

  async verifyEmail(username: string, code: string): Promise<any> {
    try {
      const resultCognito = await this.cognitoService.verifyEmail(
        username,
        code
      );
      return resultCognito;
    } catch (error) {
      throw new Error("Error on verify email");
    }
  }

  async forgotPassword(username: string): Promise<any> {
    try {
      return await this.cognitoService.forgotPassword(username);
    } catch (error) {
      throw new Error("Error on forgot password");
    }
  }

  async confirmForgotPassword(
    username: string,
    code: string,
    password: string
  ): Promise<any> {
    try {
      return await this.cognitoService.confirmForgotPassword(
        username,
        code,
        password
      );
    } catch (error) {
      throw new Error("Error on confirm forgot password");
    }
  };
}
