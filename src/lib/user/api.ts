import { UploadProfileImageResponse, UserProfileResponse } from "./types";
import { customFetch, customFormFetch, IMAGE_API, USER_API } from "@/apis";

export const uploadProfileImage = async (
  profileImage: File,
  userId: number
): Promise<UploadProfileImageResponse> => {
  const formData = new FormData();
  formData.append("profileImage", profileImage);
  return customFormFetch(`${IMAGE_API.PROFILE_UPLOAD}userId=${userId}`, {
    method: "POST",
    body: formData,
  });
};

export const getUserProfile = async (
  userId: number
): Promise<UserProfileResponse> => {
  return await customFetch(`${USER_API.GET_USER_PROFILE}/${userId}`);
};

export const uploadFeedImages = async (images: File[], feedId: number) => {
  const formData = new FormData();
  images.forEach((image) => formData.append("images", image));
  return customFormFetch(`${IMAGE_API.FEED_UPLOAD}feedId=${feedId}`, {
    method: "POST",
    body: formData,
  });
};
