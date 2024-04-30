/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useEffect } from 'react';
import { useRequests } from '@/hooks/useRequests';
import { useRequest } from 'ahooks';
import {
  VideoSection,
  EstateSection,
  GamingAssetsSection,
  PartnersSection,
} from '@/components/views';

export default function Home() {
  const {
    csrf,
    yaku: { getYakuTowersInfo, getYakuCollectionStats },
  } = useRequests();
  useRequest(csrf, { cacheKey: 'csrf' });
  const { data: yakuTowers, loading: isLoadingYakuTowers } = useRequest(
    getYakuTowersInfo,
    { cacheKey: 'yaku-tower' }
  );
  const { data: yakuCollectionsStats, loading: isLoadingYakuCollectionStats } =
    useRequest(getYakuCollectionStats, { cacheKey: 'yaku-collections' });
  const handleUrl = (url: string) => {
    window.open(url, '_blank');
  };
  return (
    <>
      <VideoSection />
      <EstateSection
        title='Yaku Estates'
        items={yakuTowers}
        isLoading={isLoadingYakuTowers}
        handleUrl={handleUrl}
      />

      {/* collection stats */}
      <GamingAssetsSection
        title='Yaku Gaming Assets'
        items={yakuCollectionsStats || []}
        handleUrl={handleUrl}
      />

      <PartnersSection title='Our Partners love Yaku' />
    </>
  );
}
