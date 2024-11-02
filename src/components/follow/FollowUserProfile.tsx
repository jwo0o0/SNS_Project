"use client";
import Link from "next/link";
import Image from "next/image";
import { FollowUserType } from "@/lib/follow/followTypes";
import { Button } from "../ui/button";

import { useQueryClient } from "@tanstack/react-query";
import { useFollowUser } from "@/lib/follow/hooks/useFollowUser";
import { useUnfollowUser } from "@/lib/follow/hooks/useUnfollowUser";
import userKeys from "@/lib/user/userQueries";
import followKeys from "@/lib/follow/followQueries";

import { useStore } from "@/store/useStore";
import { useAuthStore } from "@/store/auth/useAuthStore";

export const FollowUserProfile = ({ user }: { user: FollowUserType }) => {
  const currentUser = useStore(useAuthStore, (state) => state.user);
  const queryClient = useQueryClient();
  const { mutate: followUserMutation } = useFollowUser();
  const { mutate: unfollowUserMutation } = useUnfollowUser();

  // 팔로잉중이지 않은 유저를 팔로우
  const handleFollow = async () => {
    followUserMutation(
      {
        userId: user.userId,
      },
      {
        onSuccess: async () => {
          if (currentUser) {
            await queryClient.invalidateQueries({
              queryKey: followKeys.followers(currentUser.id),
            });
            await queryClient.invalidateQueries({
              queryKey: followKeys.following(currentUser.id),
            });
            await queryClient.invalidateQueries({
              queryKey: userKeys.profile(currentUser.id),
            });
          }
        },
      }
    );
  };

  // 이미 팔로잉인 유저를 언팔로우
  const handleUnfollow = async () => {
    unfollowUserMutation(
      {
        userId: user.userId,
      },
      {
        onSuccess: async () => {
          if (currentUser) {
            await queryClient.invalidateQueries({
              queryKey: followKeys.followers(currentUser.id),
            });
            await queryClient.invalidateQueries({
              queryKey: followKeys.following(currentUser.id),
            });
            await queryClient.invalidateQueries({
              queryKey: userKeys.profile(currentUser.id),
            });
          }
        },
      }
    );
  };

  return (
    <div className="mx-auto w-11/12 my-4 flex items-center text-slate-900">
      <div className="shrink-0 w-12 h-12 border bg-slate-200 rounded-full display: flex justify-center items-center overflow-hidden relative">
        {user.profileImage ? (
          <Image
            src={`${user?.profileImage}`}
            alt="프로필 이미지"
            fill={true}
            sizes="48px"
            className="rounded-full"
            priority={true}
          />
        ) : (
          <Image
            src="/images/default_user_profile.webp"
            alt="프로필 이미지"
            width={0}
            height={0}
            sizes="48px"
            style={{
              width: "70%",
              height: "auto",
            }}
            priority={true}
          />
        )}
      </div>
      <Link href={`/user/${user.userId}`} className="flex-1 mx-4 font-medium">
        {user.nickname}
      </Link>
      {user.isFollowing ? (
        <Button
          onClick={handleUnfollow}
          className="h-9 border border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-900"
        >
          팔로잉
        </Button>
      ) : (
        <Button
          onClick={handleFollow}
          className="h-9 bg-indigo-500 hover:bg-indigo-600"
        >
          팔로우
        </Button>
      )}
    </div>
  );
};
