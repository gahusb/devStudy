// 검색창 제어
const searchEl = document.querySelector('.search');
const searchInputEl = searchEl.querySelector('input');
// 검색창 요소를 클릭하면 실행
searchEl.addEventListener('click', function () {
    searchInputEl.focus();
});
// 검색창 요소 내부 실제 input 요소에 포커스되면 실행
searchInputEl.addEventListener('focus', function () {
    searchEl.classList.add('focused');
    searchInputEl.setAttribute('placeholder', '통합검색');
});
// 검색창 요소 내부 실제 input 요소에서 포커스가 해제(블러)되면 실행
searchInputEl.addEventListener('blur', function () {
    searchEl.classList.remove('focused');
    searchInputEl.setAttribute('placeholder', '');
});

// 페이지 스크롤에 따른 요소 제거
const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top');
// 페이지에 스크롤 이벤트를 추가!
// 스크롤이 지나치게 자주 발생하는 것을 조절(throttle, 일부러 부하를 줌)
window.addEventListener('scroll', _.throttle(function () {
    // 페이지 스크롤 위치가 500px이 넘으면,
    if(window.scrollY > 500) {
        // 배지 숨기기
        // gsap.to(요소, 지속시간, 옵션);
        gsap.to(badgeEl, .6, {
            opacity: 0,
            display: 'none'
        });
        // 버튼 보이기!
        gsap.to(toTopEl, .2, {
            x: 0
        });
    } else {
        // 배지 보이기
        gsap.to(badgeEl, .6, {
            opacity: 1,
            display: 'block'
        });
        // 버튼 숨기기!
        gsap.to(toTopEl, .2, {
            x: 100
        });
    }
}, 300));
// _.throttle(함수, 시간)

toTopEl.addEventListener('click', function () {
    gsap.to(window, .7, {
        scrollTo: 0
    });
});

// 순서대로 나타나는 기능
const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function (fadeEl, index) {
    // gsap.to(요소, 지속시간, 옵션);
    gsap.to(fadeEl, 1, {
        delay: (index + 1) * .7,    // 0.7 1.4 2.1 2.8
        opacity: 1,
    });
});


// 슬라이드 요소 관리
// new Swiper(선택자, 옵션)
new Swiper('.notice-line .swiper-container', {
    direction: 'vertical',
    autoplay: true,
    loop: true
});
new Swiper('.promotion .swiper-container', {
    slidersPerView: 3,  // 한번에 보여줄 슬라이드 개수
    spaceBetween: 10,   // 슬라이드 사이 여백
    centeredSlides: true,   // 1번 슬라이드가 가운데 보이기
    loop: true,
    autoplay: {
        delay: 5000
    },
    pagination: {
        el: '.promotion .swiper-pagination',    // 페이지 번호 요소 선택자
        clickable: true // 사용자의 페이지 번호 요소 제어 가능 여부
    },
    navigation: {
        prevEl: '.promotion .swiper-prev',
        nextEl: '.promotion .swiper-next'
    }
});
new Swiper('.awards .swiper-container', {
    autoplay: true,
    loop: true,
    spaceBetween: 30,
    slidesPerView: 5,
    navigation: {
        prevEl: '.awards .swiper-prev',
        nextEl: '.awards .swiper-next',
    }
});

// Promotion 슬라이드 토글 기능
const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false;
promotionToggleBtn.addEventListener('click', function () {
    isHidePromotion = !isHidePromotion
    if(isHidePromotion) {
        // 숨김 처리!
        promotionEl.classList.add('hide');
    } else {
        // 보임 처리!
        promotionEl.classList.remove('hide');
    }
});


// 부유하는 요소 관리
// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
    // `.toFixed()`를 통해 반환된 문자 데이터를,
    // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
    return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}
// 부유하는 요소를 만드는 함수
function floatingObject(selector, delay, size) {
    gsap.to(
        selector,   // 선택자
        random(1.5, 2.5),   // 애니메이션 동작 시간
        {   // 옵션
            y: size,
            repeat: -1,
            yoyo: true,
            ease: Power1.easeInOut,
            delay: random(0, delay)
        }
    );
}
floatingObject('.floating1', 1, 15);
floatingObject('.floating2', .5, 15);
floatingObject('.floating3', 1.5, 20);


// 요소가 화면에 보여짐 여부에 따른 요소 관리
const spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach(function (spyEl) {
    new ScrollMagic
        .Scene({
            triggerElement: spyEl,  // 보여짐 여부를 감시할 요소를 지정한다
            triggerHook: .8
        })
        .setClassToggle(spyEl, 'show')
        .addTo(new ScrollMagic.Controller());
});

// 올해가 몇 년도인지 계산
const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear();    // 2022