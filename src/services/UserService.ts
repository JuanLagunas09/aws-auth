import { User } from "../entity/User";
import { AppDataSource as dbC } from "../config/db";
import { IProfile, IStoreUser } from "../interfaces/IUser";
import { CognitoService } from "./CognitoService";
import { CacheService } from "./CacheService";
import boom from "@hapi/boom";

export class UserService {
  private cognitoService: CognitoService;
  private cacheService: CacheService;
  private dbConnection: any;


  constructor() {
    this.cognitoService = new CognitoService();
    this.cacheService = new CacheService();
    this.dbConnection = dbC.getRepository(User);
  }

  async store(data: IStoreUser): Promise<User> {
    try {
      return await this.dbConnection.save(data);
    } catch (error) {
      throw error;
    }
  }

  async show(token: any): Promise<IProfile> {
    try {
      const tokenUser = token.user;
      const idUser = token.sub;

      const verifyKey = `user:profile:${idUser}`;
      const verifyCached = await this.cacheService.get(verifyKey);

      if (verifyCached) {
        return JSON.parse(verifyCached);
      }

      const userCognito = await this.cognitoService.getProfile(tokenUser);
      if (!userCognito) {
        throw boom.notFound("User cognito found");
      }

      const userSql = await this.dbConnection.findOneBy({
        id_cognito: idUser.toString(),
      });

      if (!userSql) {
        throw boom.notFound("User not found");
      }

      const userResult: IProfile = {
        name: userSql.name,
        lastname: userSql.lastname,
        username: userCognito.Username,
        email: userCognito.UserAttributes.find((e: any) => e.Name === "email")?.Value,
        phone: userSql.phone,
        adress: userSql.adress,
      }

      const key = `user:profile:${idUser}`;
      const value = JSON.stringify(userResult);
      await this.cacheService.set(key, value);

      return userResult;
    } catch (error) {
      throw error;
    }
  }
}
