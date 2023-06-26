const express = require("express");
const {
  fetchRankingById,
  fetchRankingRegionById,
  fetchRankingArchiveById
} = require("../api");
const router = express.Router();

const rankingPartitions = [
  {tid: 1, typename: "动画"}, {tid: 13, typename: "番剧"}, {tid: 168, typename: "国创"},
  {tid: 3, typename: "音乐"}, {tid: 129, typename: "舞蹈"}, {tid: 4, typename: "游戏"},
  {tid: 36, typename: "科技"}, {tid: 188, typename: "数码"}, {tid: 160, typename: "生活"},
  {tid: 119, typename: "鬼畜"}, {tid: 155, typename: "时尚"}, {tid: 5, typename: "娱乐"},
  {tid: 181, typename: "影视"}, {tid: 177, typename: "纪录片"},
  {tid: 23, typename: "电影"}, {tid: 11, typename: "电视剧"}
]

router.get("/ranking/partitions", (req, res, next) => {
  const resData = {
    code: "1",
    msg: "success",
    data: rankingPartitions
  }
  res.send(resData);
});

router.get("/ranking/region", (req, res, next) => {
  const rId = req.query.rId;
  const day = req.query.day;
  if (rId == 1) {
    let resData = {
      code: "1",
      msg: "success"
    }
    resData.data = [
      /*
      {
        aid: ,
        title: "",
        play: 0,
        pic: "",
        video_review: ,
        duration: ,
        author: ""
      }
      */
      {
        aid: 267981866,
        title: "【公开课】股票、期权基础知识（全20讲）投资理财必看",
        play: 63550,
        pic: "http://i2.hdslb.com/bfs/archive/30e05b2cb543f0977113d47f07d85f370a656637.jpg",
        video_review: 199,
        duration: 18293,
        author: "复利的奇迹ETF基金理财",
        videos: 21
      },
      {
        aid: 267981866,
        title: "【公开课】股票、期权基础知识（全20讲）投资理财必看",
        play: 63550,
        pic: "http://i2.hdslb.com/bfs/archive/30e05b2cb543f0977113d47f07d85f370a656637.jpg",
        video_review: 199,
        duration: 18293,
        author: "复利的奇迹ETF基金理财",
        videos: 21
      },
      {
        aid: 267981866,
        title: "【公开课】股票、期权基础知识（全20讲）投资理财必看",
        play: 63550,
        pic: "http://i2.hdslb.com/bfs/archive/30e05b2cb543f0977113d47f07d85f370a656637.jpg",
        video_review: 199,
        duration: 18293,
        author: "复利的奇迹ETF基金理财",
        videos: 21
      },
      {
        aid: 267981866,
        title: "【公开课】股票、期权基础知识（全20讲）投资理财必看",
        play: 63550,
        pic: "http://i2.hdslb.com/bfs/archive/30e05b2cb543f0977113d47f07d85f370a656637.jpg",
        video_review: 199,
        duration: 18293,
        author: "复利的奇迹ETF基金理财",
        videos: 21
      }
    ]
    res.send(resData);
  } else {
    fetchRankingRegionById(rId, day).then((data) => {
      let resData = {
        code: "1",
        msg: "success"
      }
      if (data.code === 0) {
        resData.data = data.data;
      } else {
        resData.code = "0";
        resData.msg = "fail";
      }
      res.send(resData);
    }).catch(next);
  }
  
});

router.get("/ranking/archive", (req, res, next) => {
  let tId = req.query.tId;
  let p = req.query.p;
  fetchRankingArchiveById(tId, p).then((data) => {
    let resData = {
      code: "1",
      msg: "success"
    }
    if (data.code === 0) {
      resData.data = data.data;
    } else {
      resData.code = "0";
      resData.msg = "fail";
    }
    res.send(resData);
  }).catch(next);
});

router.get("/ranking/:rId", (req, res, next) => {
  fetchRankingById(req.params.rId).then((data) => {
    let resData = {
      code: "1",
      msg: "success"
    }
    if (data.code === 0) {
      resData.data = data.data;
    } else {
      resData.code = "0";
      resData.msg = "fail";
    }
    res.send(resData);
  }).catch(next);
});

module.exports = router;
