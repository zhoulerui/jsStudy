// 防止底层滚动
let scrollTop = 0;
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

    // 模拟使用开始
    $('.yi-loading').removeClass('hide').next('dl').hide();
    setTimeout(() => {
        $('.yi-loading').addClass('hide').next('dl').show();
    }, 1000);
    // 模拟使用结束
}
function popHide() {
    $('div').removeClass('open');
    bodyfixed(false);

    // 模拟使用开始
    $('.yi-loading').next('dl').hide();
    setTimeout(() => {
        $('.yi-loading').removeClass('hide');
    }, 100);
    // 模拟使用结束
}

// 黑色半透明遮罩层
function maskBlock(maskClass) {
    $(`${maskClass}`).animate({ 'opacity': '1' }, 200).show();
    setTimeout(function () { $(`${maskClass}`).show() }, 210);
}
function maskHide(maskClass) {
    $(`${maskClass}`).animate({ 'opacity': '0' }, 100);
    setTimeout(function () { $(`${maskClass}`).hide() }, 110);
}

// 打开省市弹层ID
$('#cityButton').on('click', function () {
    popBlock('#cityPopup');
    maskBlock('.yi-popup-mask');
});

// 点击黑色透明层关闭弹层
$('.yi-popup-mask,.yi-mask,.popupClose').on('touchstart', function (e) {
    popHide();
    maskHide('.yi-popup-mask');
});

// 返回省份
$('.yi-popup').on('click', '.pop-back', function () {
    $(this).parents('.list-box').parent().removeClass('open');
});

// 点击省份展开市
$('.yi-province').on('click', '.lst', function () {
    if ($('.yi-province').next('.yi-city').length == 1) {
        $(this).parents('.pop-scroll').next('.pop-scroll').addClass('open');
    } else {
        popHide();
        maskHide('.yi-popup-mask');

        $('#cityButton').text('一级城市 — ' + $(this).find('.txt').text()); // demo使用，跟进当前需求改写
    }
});
// 替换城市文案为当前点击的文字
$('.yi-city').on('click', '.lst', function () {
    popHide();
    maskHide('.yi-popup-mask');

    $('#cityButton').text('二级城市 — ' + $(this).find('.txt').text());  // demo使用，跟进当前需求改写
});
// 




// 选择车品牌
$('#carButton').on('click', function () {
    popBlock('#carPopup');
    maskBlock('.yi-popup-mask');
});

// 车品牌展开对应车型
$('.yi-carbrand').on('click', '.lst:not(".all")', function () {
    if ($('.yi-carbrand').next('.yi-carmodel').length == 1) {
        $(this).parents('.pop-scroll').next('.pop-scroll').addClass('open');
    } else {
        $('#carButton .img').attr('src', $(this).find('.car-logo').attr('src')).css({ 'width': 'auto', 'margin-left': '50%', 'transform': 'translateX(-50%)' });
        $('#carButton .title').text($(this).find('.car-name').text());
        popHide();
        maskHide('.yi-popup-mask');
    }
});
$('.yi-carbrand').on('click', '.all', function () {
    $('#carButton .img').attr('src', $(this).find('.car-logo').attr('src')).css({ 'width': 'auto', 'margin-left': '50%', 'transform': 'translateX(-50%)' });
    $('#carButton .title').text($(this).find('.car-name').text());
    popHide();
    maskHide('.yi-popup-mask');
});
// 替换图片及文案
$('.yi-carmodel').on('click', '.lst', function () {
    $('#carButton .img').attr('src', $(this).find('.car-img').attr('src'));
    $('#carButton .title').text($(this).find('.car-name').text());
    $('#carButton .price').show();
    popHide();
    maskHide('.yi-popup-mask');
});


// 选择经销商
$('#dealerButton').on('click', function () {
    popBlock('#dealerPopup')
    maskBlock('.yi-mask')
});





// close
$('.close, .btnok, .btnno,.yi-mask').on('click', function () {
    $('.yi-modal').hide();
    maskHide('.yi-mask');
    bodyfixed(false);
});








// topButton	rightButton		bottomButton	leftButton		divTRBL
const fixed = {};
fixed.msg = function (msgDiv, msgDirection) {
    $(`${msgDiv + msgDirection}`).addClass('open');
    maskBlock('.yi-mask');
    bodyfixed(true);
};

$('#topButton').on('click', function () {
    fixed.msg('.divTRBL', '.translT');
});
$('#rightButton').on('click', function () {
    fixed.msg('.divTRBL', '.translR');
});
$('#bottomButton').on('click', function () {
    fixed.msg('.divTRBL', '.translB');
});
$('#leftButton').on('click', function () {
    fixed.msg('.divTRBL', '.translL');
});




$('.divTRBL').on('click', '.close', function () {
    $(this).parents('.divTRBL').removeClass('open');
    bodyfixed(false);
})









// var demoH = $(window).outerHeight();
// var popH = $('.demo_popup').outerHeight();
// var zhanw = demoH - popH;
// $('.demoBtn').click(function () {
//     $('.demo_mask').show();
//     $('.demo_popup').addClass('open').css('padding-bottom', '100px');
//     bodyfixed(true);
//     $('.demo_zhanw').css('height', zhanw)
// });

// $('.demo_mask').click(function () {
//     $('.demo_mask').hide();
//     $('.demo_zhanw').css('height', '0');
//     $('.demo_popup').removeClass('open').css('padding-bottom', '20px');
//     bodyfixed(false);
// });
