import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import BannerCol from './BannerCol';

export interface ColInfo {
  collectionId: number | undefined;
  collectionName: string | undefined;
  logoImgName: string | undefined;
}

export default function Banner() {
  const [banner, setBanner] = useState<ColInfo>();
  const { isLoading, error } = useQuery<ColInfo[]>({
    queryKey: ['collections', 'main', { page: 1, size: 12 }],
    queryFn: () =>
      axios
        .get(
          `${import.meta.env.VITE_API_URL}/api/collections/main?page=1&size=12`
        )
        .then((res) => res.data),
    onSuccess: (data) =>
      setBanner(data[Math.floor(Math.random() * data.length)]),
  });

  if (isLoading) return <p>Loading...</p>;

  if (error instanceof Error)
    return <p>An error has occurred: + {error.message}</p>;

  return (
    <div className='overflow-hidden w-full h-[600px]'>
      <BannerCol
        key={banner?.collectionId}
        collectionId={banner?.collectionId}
        collectionName={banner?.collectionName}
        logoImgName={banner?.logoImgName}
      />
    </div>
  );
}