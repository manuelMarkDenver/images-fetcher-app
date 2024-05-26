// import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import axios from "axios";
import { Photo } from "../../../types/Photo";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useEffect } from "react";
import { setPhotos } from "../../../slices/photosSlice";

const fetcher = async (url: string) => {
  return await axios.get(url).then((res) => res.data);
};

const PAGE_SIZE = 9;

type usePhotosProps = {
  url: string;
  searchString: string;
};

export function usePhotos({ url, searchString }: usePhotosProps) {
  const dispatch = useDispatch();

  const photos = useSelector((state: RootState) => state.photos.items);

  const getKey = (pageIndex: number, previousPageData: Photo[]) => {
    if (previousPageData && !previousPageData.length) return null;

    if (
      searchString === "" ||
      searchString === undefined ||
      !searchString ||
      searchString === null
    )
      return `${url}?_page=${pageIndex + 1}&_limit=${PAGE_SIZE}`;

    return `${url}?_page=${
      pageIndex + 1
    }&_limit=${PAGE_SIZE}&title_like=${searchString}`;
  };

  const {
    data: photosData,
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

  const isEmpty = photosData?.[0]?.length === 0;

  const isReachingEnd =
    isEmpty ||
    (photosData && photosData[photosData.length - 1]?.length < PAGE_SIZE);

  const isRefreshing = isValidating && photosData && photosData.length === size;

  useEffect(() => {
    if (photosData) {
      const flatData = photosData.flatMap((page) => page);
      dispatch(setPhotos(flatData));
    }
  }, [photosData, dispatch]);

  const filterPhotosBySearchString = async (searchString: string) => {
    const filterPhoto = async (searchString: string | undefined) => {
      let fullUrl = url;

      if (searchString) {
        fullUrl += `?_page=${1}&_limit=${PAGE_SIZE}&title_like=${encodeURIComponent(
          searchString
        )}`;
      }
      return await axios.get(fullUrl).then((res) => res.data);
    };

    const photos = await filterPhoto(searchString);

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
    isLoading,
    isLoadingMore,
    isEmpty,
    isReachingEnd,
    isRefreshing,
    isError: error,
    filterPhotosBySearchString,
    mutate,
  };
}
