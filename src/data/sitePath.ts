export default class SitePath {
  private static _base = import.meta.env.VITE_BASE_URL;

  // Start of simple
  static auth = "/auth";
  static signin = "/signin";
  static signup = "/signup";
  static verifySignup = "/verify";
  static signupSuccess = "/success";
  static resetPassword = "/reset-password";
  static newPassword = "/new";
  static resetPasswordSuccess = "/success";

  static app = "/app";
  static circles = "/circles";
  static createPost = "/create";
  static messages = "/messages";
  static notifications = "/notifications";
  // End of simple

  // Start of full
  static base = `${this._base}/`;

  static authHref = `${this._base}${this.auth}`;
  static signinHref = `${this.authHref}${this.signin}`;
  static signupHref = `${this.authHref}${this.signup}`;
  static verifySignupHref = `${this.signupHref}${this.verifySignup}`;
  static signupSuccessHref = `${this.signupHref}${this.signupSuccess}`;
  static resetPasswordHref = `${this.authHref}${this.resetPassword}`;
  static newPasswordHref = `${this.resetPasswordHref}${this.newPassword}`;
  static resetPasswordSuccessHref = `${this.resetPasswordHref}${this.resetPasswordSuccess}`;

  static appHref = `${this._base}${this.app}`;
  static circlesHref = `${this.appHref}${this.circles}`;
  static createPostHref = `${this.appHref}${this.createPost}`;
  static messagesHref = `${this.appHref}${this.messages}`;
  static notificationsHref = `${this.appHref}${this.notifications}`;
  // End of full
}
