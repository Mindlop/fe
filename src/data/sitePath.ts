export default class SitePath {
  private static _base = import.meta.env.VITE_BASE_URL;

  // Start of simple
  static auth = "/auth";
  static signIn = "/signIn";
  static signUp = "/signUp";
  static verifySignUp = "/verify";
  static signUpSuccess = "/success";
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
  static signInHref = `${SitePath.authHref}${SitePath.signIn}`;
  static signUpHref = `${SitePath.authHref}${SitePath.signUp}`;
  static verifySignUpHref = `${SitePath.signUpHref}${SitePath.verifySignUp}`;
  static signUpSuccessHref = `${SitePath.signUpHref}${SitePath.signUpSuccess}`;
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
