import { AnyAction, Dispatch } from "redux";
import { setVideoInfo } from "../actions";
import { getVideoInfo, getPlayUrl } from "../../api/video";
import { createVideoByDetail } from "../../models/Video";

export default function getVideoDetail(aId: number, cId?: number) {
  return (dispatch: Dispatch<AnyAction>) => {
    return getVideoInfo(aId).then(async (result) => {
      if (result.code === "1") {
        const video = createVideoByDetail(result.data);
        video.cId = cId ? cId : result.data.pages[0].cid
        await getPlayUrl(aId, video.cId).then((r) => {
          video.url = r.data.durl[0].url;
          const index = result.data.pages.findIndex((v) => v.cid == video.cId)
          if (index != -1) {
            video.duration = result.data.pages[index].duration
          }
        });
        dispatch(setVideoInfo(video));
      }
    });
  };
}
