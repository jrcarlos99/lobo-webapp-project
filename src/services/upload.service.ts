import { supabase } from "@/lib/supabase";

export async function uploadFile(bucket: string, path: string, file: File) {
  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    contentType: file.type,
    upsert: true,
  });

  if (error) throw error;

  return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
}

export async function uploadBase64(
  bucket: string,
  path: string,
  base64: string
) {
  const base64Data = base64.split(",")[1];
  const file = Buffer.from(base64Data, "base64");

  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    contentType: "image/png",
    upsert: true,
  });

  if (error) throw error;

  return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
}
