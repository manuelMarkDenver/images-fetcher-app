// import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import axios from "axios";
import { Photo } from "../../../types/Photo";

const fetcher = async (url: string) => {
  return await axios.get(url).then((res) => res.data);
};

const PAGE_SIZE = 10;
export function usePhotos(url: string) {
  const getKey = (pageIndex: number, previousPageData: Photo[]) => {
    if (previousPageData && !previousPageData.length) return null; // reached the end
    return `${url}?_page=${pageIndex + 1}&_limit=${PAGE_SIZE}`; // SWR key
  };

  const {
    data: photos,
    mutate,
    size,
    setSize,
    error,
    isValidating,
    isLoading,
  } = useSWRInfinite(getKey, fetcher);
  const flatData = photos ? photos.flat() : [];

  const isLoadingMore =
    isLoading ||
    (size > 0 && photos && typeof photos[size - 1] === "undefined");

  const isEmpty = photos?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (photos && photos[photos.length - 1]?.length < PAGE_SIZE);
  const isRefreshing = isValidating && photos && photos.length === size;

  const filterPhotosBySearchString = async (
    pageIndex: number,
    searchString?: string | undefined
  ) => {
    const filterPhoto = async (
      searchString: string | undefined,
      idx: number
    ) => {
      let fullUrl = url;

      if (searchString) {
        fullUrl += `?_page=${
          idx + 1
        }&_limit=${PAGE_SIZE}&title_like=${encodeURIComponent(searchString)}`;
      }
      return await axios.get(fullUrl).then((res) => res.data);
    };

    const photos = await filterPhoto(searchString, pageIndex);
    console.log("🚀 ~ usePhotos ~ photos:", photos)
    
    mutate(photos, {
      optimisticData: photos,
      populateCache: true,
      revalidate: false,
      rollbackOnError: true,
    });
  };

  return {
    data: photos ? flatData : [],
    size,
    setSize,
    isLoadingMore,
    isEmpty,
    isReachingEnd,
    isLoading,
    isRefreshing,
    isError: error,
    filterPhotosBySearchString,
    mutate,
  };
}
