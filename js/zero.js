(function ($) {
    // 为所有 a标签 含class toThere 锚点跳转添加动画效果
    $(".toThere").bind("click touch",function(){
        //根据a标签的href转换为id选择器，获取id元素所处的位置，并高度减50px（这里根据需要自由设置）
        $('html,body').animate({scrollTop: ($($(this).attr('href')).offset().top)},600);
        return false;
    });

    //ocean theme
    // Search ------------
    let $searchWrap = $('.search-form-wrap'),
        isSearchAnim = false,
        searchAnimDuration = 200;

    let startSearchAnim = function () {
        isSearchAnim = true;
    };

    let stopSearchAnim = function (callback) {
        setTimeout(function () {
            isSearchAnim = false;
            callback && callback();
        }, searchAnimDuration);
    };

    $('.nav-item-search').on('click', function () {
        if (isSearchAnim) return;
        startSearchAnim();
        $searchWrap.addClass('on');
        stopSearchAnim(function () {
            $('.local-search-input').focus();
        });
    });

    $(document).mouseup(function (e) {
        let _con = $('.local-search');
        if (!_con.is(e.target) && _con.has(e.target).length === 0) {
            $searchWrap.removeClass('on');
        }
    });

    // 移动设备侦测
    let isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };
    // 建议在移动端不初始化，其实 /search.xml 文件还挺大的，  /blog/ 是自己的博客地址，根目录就直接/
    if ($('.local-search').size() && !isMobile.any()) {
        $.getScript('/js/search.js', function () {
            searchFunc('/search.xml', 'local-search-input', 'local-search-result');
        });
    }

    // Share ------------
    $('body').on('click', function () {
        $('.article-share-box.on').removeClass('on');
    }).on('click', '.article-share-link', function (e) {
        e.stopPropagation();

        let $this = $(this),
            url = $this.attr('data-url'),
            encodedUrl = encodeURIComponent(url),
            id = 'article-share-box-' + $this.attr('data-id'),
            offset = $this.offset();
        let box
        if ($('#' + id).length) {
            let box = $('#' + id);

            if (box.hasClass('on')) {
                box.removeClass('on');
                return;
            }
        } else {
            let html = [
                '<div id="' + id + '" class="article-share-box">',
                '<input class="article-share-input" value="' + url + '">',
                '<div class="article-share-links">',
                '<a href="https://twitter.com/intent/tweet?url=' + encodedUrl + '" class="article-share-twitter" target="_blank" title="Twitter"></a>',
                '<a href="https://www.facebook.com/sharer.php?u=' + encodedUrl + '" class="article-share-facebook" target="_blank" title="Facebook"></a>',
                '<a href="http://pinterest.com/pin/create/button/?url=' + encodedUrl + '" class="article-share-pinterest" target="_blank" title="Pinterest"></a>',
                '<a href="https://plus.google.com/share?url=' + encodedUrl + '" class="article-share-google" target="_blank" title="Google+"></a>',
                '</div>',
                '</div>'
            ].join('');

            box = $(html);
            $('body').append(box);
        }
        $('.article-share-box.on').hide();

        box.css({
            top: offset.top + 25,
            left: offset.left
        }).addClass('on');
    }).on('click', '.article-share-box', function (e) {
        e.stopPropagation();
    }).on('click', '.article-share-box-input', function () {
        $(this).select();
    }).on('click', '.article-share-box-link', function (e) {
        e.preventDefault();
        e.stopPropagation();

        window.open(this.href, 'article-share-box-window-' + Date.now(), 'width=500,height=450');
    });

    // fancybox
    if ($.fancybox) {
        $('[data-fancybox]').fancybox({
            protect: true
        });
    }

    // lazyload
    $('.lazy').lazyload();

    //
    $(document).ready(function ($) {
        $('.anchor').click(function (event) {
            event.preventDefault();
            $('html,body').animate({scrollTop: $(this.hash).offset().top}, 500);
        });
    });

    // To top
    (function ($) {
        // When to show the scroll link
        // higher number = scroll link appears further down the page
        let upperLimit = 1000;

        // Our scroll link element
        let scrollElem = $('#totop');

        // Scroll to top speed
        let scrollSpeed = 1600;

        // Show and hide the scroll to top link based on scroll position
        scrollElem.hide();
        $(window).scroll(function () {
            let scrollTop = $(document).scrollTop();
            if (scrollTop > upperLimit) {
                $(scrollElem).stop().fadeTo(300, 1); // fade back in
            } else {
                $(scrollElem).stop().fadeTo(300, 0); // fade out
            }
        });

        // Scroll to top animation on click
        $(scrollElem).click(function () {
            $('html, body').animate({scrollTop: 0}, scrollSpeed);
            return false;
        });
    })(jQuery);

    // Mobile nav
    let $content = $('.content'),
        $sidebar = $('.sidebar'),
        isMobileNavAnim = false,
        mobileNavAnimDuration = 200;

    let startMobileNavAnim = function () {
        isMobileNavAnim = true;
    };

    let stopMobileNavAnim = function () {
        setTimeout(function () {
            isMobileNavAnim = false;
        }, mobileNavAnimDuration);
    };

    $('.navbar-toggle').on('click', function () {
        if (isMobileNavAnim) return;
        startMobileNavAnim();
        $content.toggleClass('on');
        $sidebar.toggleClass('on');
        stopMobileNavAnim();
    });

    $($content).on('click', function () {
        if (isMobileNavAnim || !$content.hasClass('on')) return;
        $content.removeClass('on');
        $sidebar.removeClass('on');
    });

})(jQuery);
