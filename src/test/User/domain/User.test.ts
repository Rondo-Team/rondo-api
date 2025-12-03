import { beforeEach, describe, expect, it } from "vitest";
import { CreatedAt } from "../../../shared/domain/value-objects/CreatedAt.ts";
import { HashedPassword } from "../../../shared/password-hashing/domain/value-objects/HashedPassword.ts";
import { User } from "../../../user/domain/User.ts";
import { UserCommentsCount } from "../../../user/domain/value-objects/UserCommentsCount.ts";
import { UserEmail } from "../../../user/domain/value-objects/UserEmail.ts";
import { UserFavouritePostsCount } from "../../../user/domain/value-objects/UserFavouritePostsCount.ts";
import { UserId } from "../../../user/domain/value-objects/UserId.ts";
import { UserName } from "../../../user/domain/value-objects/UserName.ts";
import { UserPostsCount } from "../../../user/domain/value-objects/UserPostsCount.ts";
import { UserProfilePicture } from "../../../user/domain/value-objects/UserProfilePicture.ts";
import { UserProposalsCount } from "../../../user/domain/value-objects/UserProposalsCount.ts";
import { UserUsername } from "../../../user/domain/value-objects/UserUsername.ts";

describe("User model tests", () => {
  let user: User;

  const makeUser = () =>
    new User(
      new UserId("550e8400-e29b-41d4-a716-446655440000"),
      new UserEmail("saul@goodman.com"),
      new UserUsername("saulgoodman"),
      new UserName("saul"),
      new UserProfilePicture("https://cdn.example.com/avatar.png"),
      new HashedPassword("hashed-value-extra-extralarge"),
      new UserPostsCount(10),
      new UserProposalsCount(2),
      new UserFavouritePostsCount(5),
      new UserCommentsCount(20),
      new CreatedAt(new Date("2020-01-01"))
    );

  beforeEach(() => {
    user = makeUser();
  });

  it("creates a user correctly with all fields", () => {
    expect(user.id.value).toBe("550e8400-e29b-41d4-a716-446655440000");
    expect(user.email.value).toBe("saul@goodman.com");
    expect(user.username.value).toBe("saulgoodman");
    expect(user.name.value).toBe("saul");
    expect(user.profilePicture.value).toBe(
      "https://cdn.example.com/avatar.png"
    );
    expect(user.password.value).toBe("hashed-value-extra-extralarge");
    expect(user.postsCount.value).toBe(10);
    expect(user.proposalsCount.value).toBe(2);
    expect(user.favouritePostsCount.value).toBe(5);
    expect(user.commentsCount.value).toBe(20);
    expect(user.createdAt.value).toEqual(new Date("2020-01-01"));
  });

  it("allows changing the email", () => {
    const newEmail = new UserEmail("new@example.com");
    user.changeEmail(newEmail);
    expect(user.email.value).toBe("new@example.com");
  });

  it("allows changing the username", () => {
    const newUsername = new UserUsername("newsaulgoodman");
    user.changeUsername(newUsername);
    expect(user.username.value).toBe("newsaulgoodman");
  });

  it("allows changing the name", () => {
    const newName = new UserName("Another Name");
    user.changeName(newName);
    expect(user.name.value).toBe("Another Name");
  });

  it("allows changing the password", () => {
    const newPass = new HashedPassword("new-hashed-extra-extralarge");
    user.changePassword(newPass);
    expect(user.password.value).toBe("new-hashed-extra-extralarge");
  });

  it("allows changing the profile picture", () => {
    const newPic = new UserProfilePicture("https://cdn.example.com/new.png");
    user.changeProfilePicture(newPic);
    expect(user.profilePicture.value).toBe("https://cdn.example.com/new.png");
  });

  it("allows updating posts count", () => {
    user.addPost();
    expect(user.postsCount.value).toBe(11);
  });
});
