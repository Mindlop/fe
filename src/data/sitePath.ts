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
  static base = `${SitePath._base}/`;

  static authHref = `${SitePath._base}${SitePath.auth}`;
  static signinHref = `${SitePath.authHref}${SitePath.signin}`;
  static signupHref = `${SitePath.authHref}${SitePath.signup}`;
  static verifySignupHref = `${SitePath.signupHref}${SitePath.verifySignup}`;
  static signupSuccessHref = `${SitePath.signupHref}${SitePath.signupSuccess}`;
  static resetPasswordHref = `${SitePath.authHref}${SitePath.resetPassword}`;
  static newPasswordHref = `${SitePath.resetPasswordHref}${SitePath.newPassword}`;
  static resetPasswordSuccessHref = `${SitePath.resetPasswordHref}${SitePath.resetPasswordSuccess}`;

  static appHref = `${SitePath._base}${SitePath.app}`;
  static circlesHref = `${SitePath.appHref}${SitePath.circles}`;
  static createPostHref = `${SitePath.appHref}${SitePath.createPost}`;
  static messagesHref = `${SitePath.appHref}${SitePath.messages}`;
  static notificationsHref = `${SitePath.appHref}${SitePath.notifications}`;
  // End of full
}
