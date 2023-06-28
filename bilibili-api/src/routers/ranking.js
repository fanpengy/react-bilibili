const express = require("express");
const db = require('../db/index')
const log4js = require("../log4js");

const logger = log4js.getLogger('test');
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
  if (rId == 0) {
    db.query('select aId as aid, title, playCount as play, pic, barrageCount as video_review, duration, owner_name as author ' + 
      'from video order by aId desc', (err, data) => {
      let resData = {
        code: "1",
        msg: "success"
      }
      if (err) {
        logger.error(err)
        resData.code = "0";
        resData.msg = "fail";
      } else {
        resData.data = data;
      }
      res.send(resData);
    })
  } else {
    db.query('select aId as aid, title, playCount as play, pic, barrageCount as video_review, duration, owner_name as author ' + 
    'from video where tid = ' + rId + ' or reid = ' + rId + ' order by aId desc limit 6', (err, data) => {
    let resData = {
      code: "1",
      msg: "success"
    }
    if (err) {
      logger.error(err)
      resData.code = "0";
      resData.msg = "fail";
    } else {
      resData.data = data;
    }
    res.send(resData);
  })
  }
});

router.get("/ranking/archive", async (req, res, next) => {
  let tId = req.query.tId;
  let p = req.query.p;
  const size = 10
  const page = parseInt(p) - 1
  db.query('select aId as aid, title, playCount as play, pic, barrageCount as video_review, duration, description as "desc", owner_name as author, owner_id as mid, owner_face as face, ' + 
    'pubdate from video where reid = ' + tId + ' order by pubdate limit ' + (page * size) + ',' + size, (err, data) => {
    let resData = {
      code: "1",
      msg: "success",
      data: {}
    }
    if (err) {
      logger.error(err)
      resData.code = "0";
      resData.msg = "fail";
    } else {
      resData.data.archives = data.map((video) => {
        const stat = {}
        
        stat.view = video.play
        stat.danmaku = video.video_review
        video.stat = stat
        return video
      });
    }
    res.send(resData);
  })
});

router.get("/ranking/regions", (req, res, next) => {
  const rId = req.query.rId;
  const day = req.query.day;
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
});

router.get("/ranking/archives", (req, res, next) => {
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
