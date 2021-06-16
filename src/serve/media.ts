import { get, post } from "../utils/requireHttp";

const uploadFileApi = "https://shaoxliu.cn/api/media/import";
const MediaListApi = "/api/media/list";
const insetFormApi = "/api/media/insert";
const platformApi = "/api/media/platform/list";
const tagsApi = "/api/media/tags/list";
const mediaPriceDetailAPi = "/api/media/price/list?id=1";
const mediaDetailAPi = "/api/media/detail?id=1";
const editDetailPostApi = "api/media/edit";
const addMediaPostApi = "/api/media/add";
const addPricePostApi = "/api/media/price/add";
const editPricePostApi = "/api/media/price/edit";

type IEditDetail = {
  id: string;
  fans: string;
  url: string;
  type: string;
  tags: string;
  starts: string;
};

type IEditPrice = {
  id: string;
  price: string;
  position: string;
};

interface IMediaDetail {
  platform: string;
  fans: string;
  url: string;
  type: string;
  tags: string;
  starts: string;
  name: string;
}

export const insetForm = (params: { key: string }) =>
  post(insetFormApi, params);

export const getPlatFormList = () => get(platformApi);
export const getTagsList = () => get(tagsApi);
export const getMediaPrice = (params: { id: string }) =>
  get(mediaPriceDetailAPi, params);
export const getMediaDetail = (params: { id: string }) =>
  get(mediaDetailAPi, params);
export const editMediaDetail = (params: IEditDetail) =>
  post(editDetailPostApi, params);
export const addMediaDetail = (params: IMediaDetail) =>
  post(addMediaPostApi, params);
export const addPrice = (params: IEditPrice) => post(addPricePostApi, params);
export const editPrice = (params: IEditPrice) => post(editPricePostApi, params);
export const getMediaList = (params: { platform: string; tag: string }) =>
  get(MediaListApi, params);
