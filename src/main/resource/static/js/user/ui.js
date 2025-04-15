const uiEvent = {
  init() {
    this.menuSlideEvent();
    this.searchEvent();
    this.scrollEvent();
    this.tabEvent();
    this.accordionEvent();
    this.selectCustomEvent();
    this.pageOnloadEvent();
    this.infertilityAassistanceEvent();
    this.popupEvent();
    this.loginButtonEvent();
  },

  menuSlideEvent() {
    // 메뉴 슬라이드
    const gnb = document.querySelector('.gnb');
    const menuBtn = document.querySelector('.menu-open-btn');
    const closeBtn = document.querySelector('.gnb .close-btn');

    if (!gnb || !menuBtn || !closeBtn) {
      console.warn('필요한 요소를 찾지 못했습니다.');
      return;
    }

    menuBtn.addEventListener('click', () => {
      gnb.classList.add('open');
    });

    closeBtn.addEventListener('click', () => {
      gnb.classList.remove('open');
    });
  },
  
  searchEvent() {
    // 검색 input 텍스트 초기화 버튼
    const input = document.querySelector('.search__box .input__search');
    const clearBtn = document.querySelector('.search__box .btn__clear');

    if (input && clearBtn) {
      input.addEventListener('input', () => {
        clearBtn.style.display = input.value.trim() ? 'block' : 'none';
      });

      clearBtn.addEventListener('click', () => {
        input.value = '';
        clearBtn.style.display = 'none';
        input.focus();
      });
    }
  },

  scrollEvent() {
    // 스크롤 시 헤더 고정 및 탭 반응
    const header = document.querySelector('.search-header-wrap');
    const tabs = document.querySelectorAll('.tab-content');
    const searchFooter = document.querySelector('.search-footer');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      // 스크롤시 셀렉트 박스 닫기
      $(".select__options").hide();

      if (currentScroll <= lastScroll) {
        searchFooter?.classList.add('is-radius');
      } else {
        searchFooter?.classList.remove('is-radius');
      }

      tabs.forEach(tab => {
        if (tab.classList.contains('active')) {
          if (currentScroll <= lastScroll) {
            header.style.top = '0';
            tab.classList.add('is-radius');
          } else {
            header.style.top = '-151px';
            tab.classList.remove('is-radius');
          }
        }
      });
    });
  },

  tabEvent() {
    // 탭 전환
    const tabLinks = document.querySelectorAll('.tab-menu');
    const tabContents = document.querySelectorAll('.tab-content');

    tabLinks.forEach((tab) => {
      tab.addEventListener('click', () => {
        const contentId = tab.querySelector('span')?.dataset.content;
        if (!contentId) return;

        tabLinks.forEach((btn) => btn.classList.remove('active'));
        tab.classList.add('active');

        tabContents.forEach((content) => content.classList.remove('active'));
        document.getElementById(contentId)?.classList.add('active');
      });
    });
  },

  accordionEvent() {
    $(".faq__question").on("click", function (e) {
      e.preventDefault();
      $(this).next('.faq__answer').slideToggle(300).parent().toggleClass('on').siblings('li').removeClass('on').children('.faq__answer').slideUp(300);
    });
  },

  selectCustomEvent() {

    $(".select--custom").each(function () {
      const $customSelect = $(this);
      const $selectBox = $customSelect.find(".select__box");
      const $selectOptions = $customSelect.find(".select__options");
      const $select = $customSelect.find("select");
  
      // 옵션 리스트 생성
      $select.find("option").each(function () {
        const value = $(this).val();
        const text = $(this).text();
        $selectOptions.append(`<div data-value="${value}">${text}</div>`);
      });
  
      // 선택 영역 클릭 시 옵션 토글
      $selectBox.on("click", function (e) {
        e.stopPropagation();
        // 모든 옵션 닫고 현재 것만 토글
        $(".select__options").not($selectOptions).hide();
        $selectOptions.toggle();
      });
  
      // 옵션 클릭 시 값 변경
      $selectOptions.on("click", "div", function () {
        const value = $(this).data("value");
        const text = $(this).text();
        $selectBox.text(text).addClass("selected");
        $select.val(value).trigger("change");
        $selectOptions.hide();
      });
  
      // 키보드 네비게이션
      let currentIndex = -1;
      $selectBox.on("keydown", function (e) {
        const $items = $selectOptions.find("div");
        if (e.key === "ArrowDown") {
          currentIndex = (currentIndex + 1) % $items.length;
        } else if (e.key === "ArrowUp") {
          currentIndex = (currentIndex - 1 + $items.length) % $items.length;
        } else if (e.key === "Enter") {
          $items.eq(currentIndex).trigger("click");
        }
        $items.removeClass("active").eq(currentIndex).addClass("active");
      });
    });
  
    // 외부 클릭 시 옵션 닫기
    $(document).on("click", function () {
      $(".select__options").hide();
    });
  },

  pageOnloadEvent() {
    // 새로고침시 스크롤 맨위로
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };

    // 브라우저가 자동으로 스크롤 위치 복원 막기
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  },
  
  infertilityAassistanceEvent() {
    // 리스트 클릭하면 팝업 열기
    const searchLinks = document.querySelectorAll('.search_list li a');
    const $listPopup = $('.list_popup'); // jQuery 객체
    const $popupOverlay = $listPopup.closest(".pop__overlay");

    searchLinks.forEach(link => {
      link.addEventListener('click', function () {
        $popupOverlay.fadeIn(300);
        $listPopup.css('display', 'flex');
        $listPopup.addClass("active");
      });
    });

    // 닫기 버튼 누르면 팝업 닫기
    const closeBtn = document.querySelector('.pop_close_btn');
    closeBtn?.addEventListener('click', function () {
      $popupOverlay.fadeOut(300);
      $listPopup.removeClass("active");
    });
  },
  popupEvent() {
    // 팝업 공통 닫기
    $(".btn__pop-close").on("click", function (e) {
      if ($(e.target).is(".btn__pop-close")) {
        $(e.target).closest(".pop__overlay").fadeOut(300);
        $(e.target).closest(".popup").removeClass("active");
      }
    });

    // 팝업 공통 열기
    // $(".btn__pop-open").on("click", function () {
    //   const targetId = $(this).data("popup-target");
    //   const $targetPopup = $(`#${targetId}`);
    //   if ($targetPopup.length) {
    //     $targetPopup.closest(".pop__overlay").fadeIn(300);
    //     $targetPopup.addClass("active");
    //   }
    // });
    // 로그인 버튼 클릭 이벤트
    $('.pop-btn').on('click', function (e) {
      e.preventDefault();
      const targetId = $(this).data("popup-target");
      const $targetPopup = $(`#${targetId}`);
      const $popupOverlay = $targetPopup.closest(".pop__overlay");
  
      // 아이디나 비밀번호가 빈 값일 경우 팝업 열기

        $popupOverlay.fadeIn(300);
        $targetPopup.addClass("active");
    });
  },

  loginButtonEvent() {
    // 닫기 버튼 이벤트
    $('.pop_close_btn').on('click', function (e) {
      const $overlay = $(this).closest('.pop__overlay');
      const $popup = $(this).closest('.popup');
  
      $overlay.fadeOut(300);
      $popup.removeClass('active');
    });
  
    // 로그인 버튼 클릭 이벤트
    $('.login-btn').on('click', function (e) {
      e.preventDefault();
  
      const userId = $(".form-input[type='text']").val().trim();
      const password = $(".form-input[type='password']").val().trim();
      const targetId = $(this).data("popup-target");
      const $targetPopup = $(`#${targetId}`);
      const $popupOverlay = $targetPopup.closest(".pop__overlay");
  
      // 아이디나 비밀번호가 빈 값일 경우 팝업 열기
      if (userId === "" || password === "") {
        $popupOverlay.fadeIn(300);
        $targetPopup.addClass("active");
        return;
      }
  
    });
  }
};
