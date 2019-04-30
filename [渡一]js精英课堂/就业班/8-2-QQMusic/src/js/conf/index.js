/* global $ */
// let VConsole = require('./vconsole.min');
// let vConsole = new VConsole();
let scrollTop = 0,
  // ?CityId=201&&CityName=北京市&&BrandId=Member030&&BrandName=上汽大众&&PeriodId=1
  urlCityName = getUrlParam('CityName') || null, //'全部城市',
  urlCityId = getUrlParam('CityId') || 0, //城市标识，默认为0找全国
  urlBrandId = getUrlParam('BrandId') || null, //品牌标识，默认为null找全品牌
  urlBrandName = getUrlParam('BrandName') || null, //'全部品牌',
  urlPeriodId = getUrlParam('PeriodId') || 1,
  cityDataID = getUrlParam('CityId') || 0,
  carDataID = getUrlParam('BrandId') || null,
  ajaxListUrl = '//link.easypass.cn/PartnerStar/star2019/Weekly/WeekStarRankList', //列表接口
  ajaxCityUrl = '//frontapi.easypass.cn/commoninterface/', //城
  // 分页相关
  clientH = $(window).height(), //获取可视区窗口高度
  bodyH = $('body').height() || $('html').height() || $(document).height(), //获取总内容长度
  HasNextPage = false, //判断是否还有分页  bool 类型
  canIload = false, //可以触发加载新页的锁，节流用。
  // listNum = 20, //每页展示条数
  // countNum = 0, //总条数
  // countPage = 0, //总页数，减去当前页数可判断是否还有下一页
  pageNum = 0; //当前页数，加载下一页前需要+1，0为默认的第一页

// 初始化调取接口
$('#cityButton').attr('data-id', urlCityId);
if (urlBrandName != 'null' && urlBrandName != null) {
  $('#carButton').text(urlBrandName);
}
if (urlBrandId != 'null' && urlBrandId != null) {
  $('#carButton').attr('data-id', urlBrandId);
}
if (urlCityName != 'null' && urlCityName != null) {
  $('#cityButton').text(urlCityName);
}

ajaxListData({
  keyid: pageNum, //后端接收keyid时，默认0表示首页
  PeriodId: urlPeriodId, //周期标识[number]
  CityId: urlCityId, //城市id
  BrandId: urlBrandId //品牌id
});
ajaxProvinceData();
shareLink += '?PeriodId=' + urlPeriodId;
// console.log(shareLink);
// console.log({
//   keyid: pageNum, //后端接收keyid时，默认0表示首页
//   PeriodId: urlPeriodId, //周期标识[number]
//   CityId: urlCityId, //城市id
//   BrandId: urlBrandId //品牌id
// });
// console.log('location', window.location);
// 下拉加载分页
window.onscroll = function () {
  let scrollT = $(document).scrollTop(); //获取当前滚动距离
  // console.log(scrollT, (bodyH - clientH)-10, canIload, HasNextPage)
  if (scrollT >= (bodyH - clientH)-10 && canIload && HasNextPage) {
    // console.log('触发加载')
    $('.loading').show();
    // 触底加载
    canIload = false;
    // 调用加载
    // pageNum++;
    ajaxListData({
      keyid: pageNum, //默认0=首页
      PeriodId: urlPeriodId, //周期标识
      CityId: cityDataID, //城市id
      BrandId: carDataID //品牌id
    })
  }
}

// 防止底层滚动
function bodyfixed(isFixed) {
  let $body = $(document.body);
  if (isFixed) {
    scrollTop = $(document).scrollTop();
    $body.css('overflow', 'hidden').css('position', 'fixed').css('width', '100%');
    $(document.body).css('top', -scrollTop);
  } else {
    $body.css('overflow', 'inherit').css('position', 'inherit');
    $(document).scrollTop(scrollTop);
  }
}

function popBlock(popID) {
  $(`${popID}`).addClass('open');
  bodyfixed(true);
}

function popHide() {
  $('div').removeClass('open');
  bodyfixed(false);
}

// 黑色半透明遮罩层
function maskBlock(maskClass) {
  $(`${maskClass}`).animate({
    'opacity': '1'
  }, 200).show();
  setTimeout(function () {
    $(`${maskClass}`).show()
  }, 210);
}

function maskHide(maskClass) {
  $(`${maskClass}`).animate({
    'opacity': '0'
  }, 100);
  setTimeout(function () {
    $(`${maskClass}`).hide()
  }, 110);
}

// 获取url
function getUrlParam(k) {
  let regExp = new RegExp('([?]|&)' + k + '=([^&]*)(&|$)','i');
  let result = window.location.href.match(regExp);
  // console.log(k,regExp,result)
  if (result) {
    return decodeURIComponent(result[2]);
  } else {
    return null;
  }
}

// 列表接口
function ajaxListData(params) {
  $.ajax({
    type: 'POST',
    url: ajaxListUrl,
    data: params,
    async: false,
    dataType: 'json',
    success: function success(data) {
      // console.log('接口数据:', data);
      if (typeof data !== 'undefined') {
        if (data.result == 1) {
          $('.rank_nodate').hide().text('');
          var res = data.RetValue,
            tempHtml = '',
            newList = res.DasAccountList,
            len = newList.length;
          HasNextPage = res.HasNextPage; // 判断是否还有分页
          // countNum = res.WeekStarCount; //总条数
          // countPage = Math.ceil(countNum / listNum); //总页数 
          pageNum = res.KeyId;
          $('.Month').text(res.Month);
          $('.WeekNo').text(res.WeekNo);
          $('.sel-tip span').text(res.WeekStarCount).removeClass('op');
          $('.sel-tip').removeClass('op');
          $('.rank-time').removeClass('op');
          shareTitle += ` 2019年${res.Month}月第${res.WeekNo}周`; //修改分享标题
          if (len > 0) {
            for (let i = 0; i < len; i++) {
              tempHtml += `<dl class="rank-item" id="${newList[i].DasAccountId}">`
              tempHtml += `<dt class="dt_num" >${newList[i].Num}</dt>`
              tempHtml += `<dd class="dd_pic"><div class="img-box"><img class="img" src="${newList[i].DisplayUserPicUrl}"></div></dd>`
              tempHtml += '<dd class="dd_info">'
              tempHtml += `<h2 class="name-box"><span class="msg">本周活跃度平均分</span><span class="name">${newList[i].DasAccountName}</span></h2>`
              tempHtml += `<div class="info_bot"><span class="num_big">${newList[i].ActiveAvgPoints}<small>分</small></span>`
              tempHtml += `<p class="diz">${newList[i].DealerShortName}</p>`
              tempHtml += '</div></dd></dl>'
            }
            $('.rank-list').append(tempHtml);
            if (HasNextPage) { //总页数-当前页数可判断是否还有下一页
              canIload = true; //加载第二页后放开按钮
              $('.list-more').text('正在加载 ...');
            } else {
              canIload = false;
              $('.list-more').text('');
            }
            bodyH = $('body').height() || $('html').height() || $(document).height(); //获取总内容长度
          } else {
            // 空数据
            $('.rank_nodate').show();
            $('.list-more').text('');
          }
          $('.loading').hide();
        } else {
          $('.rank_nodate').show().text('数据加载失败');
          $('.loading').hide();
        }
      }
    },
    error: function (err) {
      $('.loading').hide();
      $('.rank_nodate').show().text('数据加载失败');
      // console.log(err.status, err.statusText, err);
    }
  });
}

// 省份接口
// 排序
function sortarr(arr) {
  var len = arr.length - 1;
  for (var i = 0; i < len; i++) {
    for (var j = 0; j < len - i; j++) {
      if (arr[j].FirstChar > arr[j + 1].FirstChar) {
        var temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}
var firstChar = '';

function ajaxProvinceData() {
  $.ajax({
    type: 'GET',
    url: ajaxCityUrl + 'GetProvinceInfo',
    dataType: 'jsonp',
    success: function success(data) {
      if (typeof data !== 'undefined') {
        sortarr(data); //城市排序
        // console.log('data', data);
        let ProvinceHtml = '',
          len = data.length;
        // console.log(newArr)
        ProvinceHtml += `<dt class="all" data-id="0"><span>全部城市</span></dt>`
        for (let i = 0; i < len; i++) {
          if (firstChar != data[i].FirstChar) {
            // 首字母一样的放在同一个循环里
            ProvinceHtml += `<dt class="tit"><span>${data[i].FirstChar}</span></dt>`
            firstChar = data[i].FirstChar;
          }
          ProvinceHtml += `<dd class="lst" data-id="${data[i].ID}"><p class="txt">${data[i].Name}</p></dd>`
        }
        $('.yi-province .list-box').append(ProvinceHtml);
      }
    }
  });
}


// 市级接口
function ajaxCityData(PRName, PRId) {

  $.ajax({
    type: 'GET',
    url: `${ajaxCityUrl}GetCityInfo/?p=${PRId}`,
    async: false,
    dataType: 'jsonp',
    success: function success(data) {
      if (typeof data !== 'undefined') {
        $('.yi-city .list-box').html('');
        let cityHtml = '',
          len = data.length;
        cityHtml += `<dt class="tit pop-back"><span>${PRName}</span></dt>`
        for (let i = 0; i < len; i++) {
          cityHtml += `<dd class="lst" data-id="${data[i].ID}"><p class="txt">${data[i].ShowName}</p></dd>`
        }
        $('.yi-city .list-box').append(cityHtml);
      }
    }
  });
}



// 打开省市弹层ID
$('#cityButton').on('click', function () {
  popBlock('#cityPopup');
  maskBlock('.yi-popup-mask');
});

// 点击黑色透明层关闭弹层
$('.yi-popup-mask,.yi-mask,.popupClose').on('click', function (e) {
  popHide();
  maskHide('.yi-popup-mask');
});

// 返回省份
$('.yi-popup').on('click', '.pop-back', function () {
  $(this).parents('.list-box').parent().removeClass('open');
});

// 点击省份展开市
$('.yi-province').on('click', '.lst', function () {
  $(this).parents('.pop-scroll').next('.pop-scroll').addClass('open');
  let $thisPRName = $(this).find('.txt').html();
  let $thisPRId = $(this).attr('data-id');
  ajaxCityData($thisPRName, $thisPRId);
});
$('.yi-province').on('click', '.all', function () {
  // 切换全部城市
  let $thisPRName = $(this).find('.txt').html();
  cityDataID = $(this).attr('data-id');
  carDataID = $('#carButton').attr('data-id');
  $('#cityButton').text($(this).find('span').text()).attr('data-id', cityDataID);
  popHide();
  maskHide('.yi-popup-mask');
  $('.rank-list').html('');
  // ajaxListData(carDataID, cityDataID);
  // 切换品牌和城市后，把分页的数据重置
  $('.loading').show();
  pageNum = 0;
  ajaxListData({
    keyid: pageNum, //默认0=首页
    PeriodId: urlPeriodId, //周期标识
    CityId: cityDataID, //城市id
    BrandId: carDataID //品牌id
  });
  // console.log('CityId:' + cityDataID, ';BrandId:' + carDataID);
});


// 替换城市文案为当前点击的文字
$('.yi-city').on('click', '.lst:not(".all")', function () {
  // 切换其他城市
  cityDataID = $(this).attr('data-id');
  carDataID = $('#carButton').attr('data-id');
  $('#cityButton').text($(this).find('.txt').text()).attr('data-id', cityDataID);
  popHide();
  maskHide('.yi-popup-mask');
  $('.rank-list').html('');
  // ajaxListData(carDataID, cityDataID);
  // 切换品牌和城市后，把分页的数据重置
  $('.loading').show();
  pageNum = 0;
  ajaxListData({
    keyid: pageNum, //默认0=首页
    PeriodId: urlPeriodId, //周期标识
    CityId: cityDataID, //城市id
    BrandId: carDataID //品牌id
  });
  // console.log('CityId:' + cityDataID, ';BrandId:' + carDataID);
});

// 选择车品牌
$('#carButton').on('click', function () {
  popBlock('#carPopup');
  maskBlock('.yi-popup-mask');
});


// 车品牌展开对应车型
$('.yi-carbrand').on('click', '.lst:not(".all")', function () {
  // 切换其他品牌
  carDataID = $(this).attr('data-id');
  cityDataID = $('#cityButton').attr('data-id');
  $('#carButton').text($(this).find('.car-name').text()).attr('data-id', carDataID);
  popHide();
  maskHide('.yi-popup-mask');
  $('.rank-list').html('');
  // ajaxListData(carDataID, cityDataID);
  // 切换品牌和城市后，把分页的数据重置
  $('.loading').show();
  pageNum = 0;
  ajaxListData({
    keyid: pageNum, //默认0=首页
    PeriodId: urlPeriodId, //周期标识
    CityId: cityDataID, //城市id
    BrandId: carDataID //品牌id
  });
  // console.log('CityId:' + cityDataID, ';BrandId:' + carDataID);
});
// $('.yi-popup').on('click', '.all', function () {
// 	var $this = $(this).find('p').text();
// 	if ($this == '全部品牌') {
// 		$('#carButton').text($(this).find('.car-name').text());
// 	} else if ($this == '全部城市') {
// 		$('#cityButton').text($(this).find('.txt').text());
// 	}
// 	popHide();
// 	maskHide('.yi-popup-mask');
// });