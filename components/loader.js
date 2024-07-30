"use client";

export default function myImageLoader({ src, width, quality }) {
  return `https://hsmahnunqgbyxyjzikko.supabase.co/storage/v1/object/public/avatars${src}?w=${width}&q=${quality || 75}`;
}
