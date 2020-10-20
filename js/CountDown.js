// 倒计时方法
function CountDown(startTime) {
  this.id = null
  this.oldTime = null

  this.startTimeStamp = new Date(startTime.replace(/-/g, "/")).getTime() //直播开始时间（ 时间戳）

  this.zero0 = (num) => {
    return num >= 10 ? num : "0" + num
  }
  this.createDown = (cb) => {
    this.clearDown()
    var nowTimeStamp = new Date().getTime(); //现在时间（时间戳）
    var time = parseInt((this.startTimeStamp - nowTimeStamp) / 1000); //距离结束的毫秒数
    // 获取天、时、分、秒
    let day = parseInt(time / (60 * 60 * 24));
    let hou = parseInt(time % (60 * 60 * 24) / 3600);
    let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
    let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
    day = this.zero0(day)
    hou = this.zero0(hou)
    min = this.zero0(min)
    sec = this.zero0(sec)
    let countdownTime = {
      day,
      hou,
      min,
      sec
    }
    if (time > 0) {
      if (this.oldTime !== time) {
        cb && cb(countdownTime)
        this.oldTime = time
      }
      let id = setTimeout(() => {
        this.createDown(cb)
      }, 1000);
      this.id = id
      return {
        countdownTime,
        id
      }
    } else {
      cb && cb(false)
      return false
    }
  }
  this.clearDown = () => {
    clearTimeout(this.id)
  }
}