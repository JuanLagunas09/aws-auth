import {
  AuthFlowType,
  CognitoIdentityProviderClient,
  ConfirmForgotPasswordCommand,
  ConfirmSignUpCommand,
  ForgotPasswordCommand,
  GetUserCommand,
  GlobalSignOutCommand,
  InitiateAuthCommand,
  SignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { ISignUp } from "../interfaces/IUser";
import { config } from "../config/config";

export class CognitoService {
  private cognito: CognitoIdentityProviderClient;

  constructor() {
    this.cognito = new CognitoIdentityProviderClient({});
  }

  async signUp(data: ISignUp): Promise<any> {
    const command = new SignUpCommand({
      ClientId: config.COGNITO_CLIENT_ID,
      Username: data.username,
      Password: data.password,
      UserAttributes: [
        {
          Name: "email",
          Value: data.email,
        },
        {
          Name: "phone_number",
          Value: data.phone,
        }
      ],
    });

    return await this.cognito.send(command);
  }

  async verifyEmail(username: string, code: string): Promise<any> {
    const command = new ConfirmSignUpCommand({
      ClientId: config.COGNITO_CLIENT_ID,
      Username: username,
      ConfirmationCode: code,
    });

    return await this.cognito.send(command);
  }

  async signIn(username: string, password: string): Promise<any> {
    const command = new InitiateAuthCommand({
      AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
      },
      ClientId: config.COGNITO_CLIENT_ID,
    });

    const result = await this.cognito.send(command);
    
    return result;
  }

  async logOut(token: any): Promise<any> {
    const command = new GlobalSignOutCommand({
       AccessToken: token,
    });

    return await this.cognito.send(command);
  }

  async getProfile(token: any): Promise<any> {
    const command = new GetUserCommand({
       AccessToken: token,
    });

    return await this.cognito.send(command);
  }

  async forgotPassword(username: string): Promise<any> {
    const command = new ForgotPasswordCommand ({
      ClientId: config.COGNITO_CLIENT_ID,
      Username: username,
    });

    return await this.cognito.send(command);
  }

  async confirmForgotPassword(
    username: string,
    code: string,
    newPassword: string
  ): Promise<any> {
    const command = new ConfirmForgotPasswordCommand({
      ClientId: config.COGNITO_CLIENT_ID,
      Username: username,
      ConfirmationCode: code,
      Password: newPassword,
    });

    return await this.cognito.send(command);
  }
}
