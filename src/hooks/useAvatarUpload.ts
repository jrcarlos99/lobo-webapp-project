"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

export const useAvatarUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const queryClient = useQueryClient();

  const uploadAvatar = async (file: File): Promise<string> => {
    setIsUploading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const objecturl = URL.createObjectURL(file);

      queryClient.setQueryData(["me"], (oldData: any) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          avatarUrl: objecturl,
        };
      });

      const currentUser = JSON.parse(
        localStorage.getItem("lobo_current_user") || "{}"
      );
      const updatedUser = {
        ...currentUser,
        avatarUrl: objecturl,
      };
      localStorage.setItem("lobo_current_user", JSON.stringify(updatedUser));

      return objecturl;
    } catch (error) {
      console.error("Erro no upload: ", error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };
  return { uploadAvatar, isUploading };
};
