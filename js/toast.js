let toastTimer;

/**
 * 
 * @param {String} msg 消息
 * @param {Object} config 配置
 * @param {Function} config.do 立即执行的函数
 * @param {Function} config.cb 成功关闭后的回调函数
 * @param {Number} config.t 时常，单位ms，默认为1500ms
 * @param {Boolean} config.isShowConfirmBtn 是否展示确定按钮
 */
function toast(msg, config = {}) {
  let toastTips = getToastDom();
  if (config.do) config.do();
  toastTips.innerHTML = `${msg}<div class=\"toast-confirm\" id=\"toast-confirm\">确定</div>`;
  let toastConfirmBtn = document.getElementById('toast-confirm');
  clearTimeout(toastTimer);
  if (config.isShowConfirmBtn) {
    toastConfirmBtn.style.display = 'inline-block';
    toastConfirmBtn.onclick = () => { toastConfirm(config) }
  } else {
    toastConfirmBtn.style.display = 'none';
  }
  toastTips.style.display = 'inline-block';
  toastTimer = setTimeout(() => {
    toastTips.style.display = 'none';
    if (config.cb) {
      config.toastCb()
    }
  }, config.t || 1500)
}

function toastConfirm(config = { }) {
  clearTimeout(toastTimer);
  let toastTips = getToastDom();
  toastTips.style.display = 'none';
  config.toastCb && config.toastCb();
}

function getToastDom() {
  if (document.getElementById('toast-tips')) {
    return document.getElementById('toast-tips');
  }
  const styleDom = document.createElement('style');
  styleDom.innerHTML = `
  .toast-tips {
    top: 9vh;
    right: 0;
    left: 0;
    margin: auto;
  }
  .toast-tips {
    position: fixed;
    padding: 8px;
    width: 30vh;
    height: 18vh;
    min-width: 200px;
    min-height: 140px;
    background-color: black;
    font-size: 16px;
    color: white;
    font-weight: 400;
    text-align: center;
    border: 2px solid white;
    border-radius: 16px;
    opacity: .8;
    z-index: 999;
  }

  .toast-confirm {
    bottom: 0;
    width: 100%;
    position: absolute;
    height: 25px;
    left: 0;
    border-top: 2px solid;
    cursor: pointer;
    z-index: 999;
  }

  .toast-confirm:active {
    opacity: .6;
  }
  `
  document.body.appendChild(styleDom);
  const toastTipsDom = document.createElement('div');
  toastTipsDom.className = 'toast-tips';
  toastTipsDom.id = 'toast-tips';
  toastTipsDom.style.display = 'none';
  toastTipsDom.innerHTML = `<div class="toast-confirm" id="toast-confirm">确定</div>`
  document.body.appendChild(toastTipsDom)
  return toastTipsDom;
}
