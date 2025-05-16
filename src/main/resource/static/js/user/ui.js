// 나의 가임력 체크
function initCommonSurveySelectEvent(surveyId, noneSelector, diseaseSelector) {
  const $container = $(`#${surveyId}`);
  const $noneButton = $container.find(noneSelector);
  const $diseaseButtons = $container.find(diseaseSelector);

  $noneButton.on("click", function () {
    const isSelected = $(this).hasClass("selected");
    $(this).toggleClass("selected");

    if (!isSelected) {
      $diseaseButtons.prop("disabled", true).removeClass("selected");
    } else {
      $diseaseButtons.prop("disabled", false);
    }
  });

  $diseaseButtons.on("click", function () {
    $(this).toggleClass("selected");

    const anySelected = $diseaseButtons.toArray().some(btn =>
      $(btn).hasClass("selected")
    );

    if (anySelected) {
      $noneButton.prop("disabled", true).removeClass("selected");
    } else {
      $noneButton.prop("disabled", false);
    }
  });
}

const swiperInit = () => {
  const swiperEl = document.querySelector('.cheering-box.swiper');
  if (!swiperEl) return; // 요소가 없으면 초기화 하지 않음

  new Swiper(swiperEl, {
    loop: true,
    slidesPerView: 1,
    autoHeight: true,
    spaceBetween: 20,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
};

const uiEvent = {
  init() {
    this.menuSlideEvent();
    this.searchEvent();
    this.scrollEvent();
    this.accordionEvent();
    this.commentToggleEvent();
    this.selectCustomEvent();
    this.pageOnloadEvent();
    this.infertilityAassistanceEvent();
    this.popupEvent();
    this.loginButtonEvent();
    this.initTabEvent(); // 탭
    this.initSubTabEvent(); // 서브탭

    // 나의 가임력 체크 설문조사 복수 버튼 선택
    initCommonSurveySelectEvent("survey04", '[data-type="none"]', '[data-type="disease"]');
    this.initSurvey05SelectEvent();
    this.initSurvey07SelectEvent();
    initCommonSurveySelectEvent("survey08", '[data-type="none"]', '[data-type="disease"]');
    initCommonSurveySelectEvent("survey09", '[data-type="none"]', '[data-type="disease"]');
    initCommonSurveySelectEvent("survey10", '[data-type="none"]', '[data-type="disease"]');
    initCommonSurveySelectEvent("survey11", '[data-type="none"]', '[data-type="disease"]');

    this.initStepEvent('survey'); // 나의 가임력 체크 설문조사 페이지 진행
    this.initStepEvent('signup'); // 회원가입 절차

    this.initAgreementCheckboxEvent(); // 약관 동의 체크박스 이벤트

    swiperInit(); // Swiper 슬라이드 초기화

    this.initEmailSelectEvent();  // 이메일 직접입력

    this.initIdInputEvent();  // 아이디 입력 이벤트 임시 추가

    this.initWithdrawTextareaToggle();  // 기타 선택 시 textarea 보이기
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

    // 슬라이드 토글
    const $searchToggleBtn = $('button[aria-label="검색"]');
    const $searchHeader = $('.main--search-header');

    // 초기에 숨기기 (transition: top 방식 사용 시 필요 없음)
    $searchHeader.removeClass('active');

    // 버튼 클릭 시 토글
    $searchToggleBtn.on('click', function (e) {
      e.stopPropagation();
      $searchHeader.toggleClass('active');
    });

    // 헤더 내부 클릭 시 닫힘 방지
    $searchHeader.on('click', function (e) {
      e.stopPropagation();
    });

    // 문서 클릭 시 헤더 영역 밖이면 슬라이드업
    $(document).on('click', function () {
      if ($searchHeader.hasClass('active')) {
        $searchHeader.removeClass('active');
      }
    });

    // 뒤로가기 버튼 클릭 시 닫기
    $('.btn--back').on('click', function () {
      $searchHeader.removeClass('active');
    });
  },

  scrollEvent() {
    const header = document.querySelector('.search-header-wrap');
    const tabs = document.querySelectorAll('.tab-content');
    const searchFooter = document.querySelector('.search-footer');
    const spacer = document.querySelector('.spacer');
    let lastScroll = 0;
  
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      const spacerHeight = spacer?.offsetHeight || 0;
  
      // 셀렉트박스 닫기
      $(".select__options").hide();
  
      if (currentScroll === 0) {
        searchFooter?.classList.add('is-radius');
        tabs.forEach(tab => {
          if (tab.classList.contains('active')) {
            header.style.top = '0';
            tab.classList.add('is-radius');
          }
        });
      } else {
        searchFooter?.classList.remove('is-radius');
        tabs.forEach(tab => {
          if (tab.classList.contains('active')) {
            header.style.top = `-${spacerHeight}px`;
            tab.classList.remove('is-radius');
          }
        });
      }
  
      lastScroll = currentScroll;
    });
  },
  accordionEvent() {
    $(".faq__question").on("click", function (e) {
      e.preventDefault();
      const $question = $(this);
      const $parent = $question.closest("li");
      const $answer = $parent.find(".faq__answer");
  
      if (!$answer.is(":animated")) {
        $answer.slideToggle(300);
        $parent.toggleClass("on").siblings("li").removeClass("on").find(".faq__answer").slideUp(300);
      }
    });
  
    $(".accordian__list").removeClass("on").find(".accordian__answer").hide();
  
    $(".accordian_btn").on("click", function (e) {
      // checkbox 클릭 막기
      if ($(e.target).is('input[type="checkbox"]')) {
        e.preventDefault();
        return;
      }
      const $this = $(this);
      const $parentLi = $this.closest(".accordian__list");
      const $answer = $parentLi.find(".accordian__answer");
  
      if (!$answer.is(":animated")) {
        $answer.slideToggle(300);
        $parentLi.toggleClass("on");
      }
    });
  },

  commentToggleEvent() {
    // 댓글 답글 보기/접기
    $(".comment_button").on("click", function (e) {
      e.preventDefault();
      const $commentList = $(this).closest('.comment__list');
      const $answerBox = $commentList.find('.comment__answer');
  
      $answerBox.slideToggle(300);
      $commentList.toggleClass('on');
    });

    // 댓글 접기 버튼 클릭 시 닫기
    $(".comment__answer_header").on("click", function (e) {
      e.preventDefault();
      const $commentList = $(this).closest('.comment__list');
      const $answerBox = $commentList.find('.comment__answer');
  
      $answerBox.slideUp(300);
      $commentList.removeClass('on');
    });
  },

  selectCustomEvent() {

    $(".select--custom").not(".email-select").each(function () {
      const $customSelect = $(this);
      const $selectBox = $customSelect.find(".select__box");
      const $selectOptions = $customSelect.find(".select__options");
      const $select = $customSelect.find("select");
  
      $selectBox.on("click", function (e) {
        e.stopPropagation();
        $(".select__options").not($selectOptions).hide();
        $selectOptions.toggle();
      });
  
      $selectOptions.on("click", "div", function () {
        const value = $(this).data("value");
        const html = $(this).html();
        $selectBox.html(html).addClass("selected");
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
  },
  initSurvey05SelectEvent() {
    const $container = $("#survey05");
    const $noneType01 = $container.find('[data-type="none-type01"]');
    const $noneType02 = $container.find('[data-type="none-type02"]');
    const $noneButtons = $noneType01.add($noneType02);
    const $diseaseButtons = $container.find('[data-type="disease"]');

    // none-type01 클릭 시
    $noneType01.on("click", function () {
      const isSelected = $(this).hasClass("selected");
      $(this).toggleClass("selected");

      if (!isSelected) {
        // 다른 버튼 전부 비활성화 및 선택 해제
        $noneType02.prop("disabled", true).removeClass("selected");
        $diseaseButtons.prop("disabled", true).removeClass("selected");
      } else {
        // 초기화
        $noneType02.prop("disabled", false);
        $diseaseButtons.prop("disabled", false);
      }
    });

    // none-type02 클릭 시
    $noneType02.on("click", function () {
      const isSelected = $(this).hasClass("selected");
      $(this).toggleClass("selected");

      if (!isSelected) {
        $noneType01.prop("disabled", true).removeClass("selected");
        $diseaseButtons.prop("disabled", true).removeClass("selected");
      } else {
        $noneType01.prop("disabled", false);
        $diseaseButtons.prop("disabled", false);
      }
    });

    // 질환 선택 버튼
    $diseaseButtons.on("click", function () {
      $(this).toggleClass("selected");

      const anySelected = $diseaseButtons.toArray().some(btn =>
        $(btn).hasClass("selected")
      );

      if (anySelected) {
        $noneButtons.prop("disabled", true).removeClass("selected");
      } else {
        $noneButtons.prop("disabled", false);
      }
    });
  },
  initSurvey07SelectEvent() {
    const $container = $("#survey07");
    const $buttons = $container.find('[data-type="disease"]');
  
    $buttons.on("click", function () {
      $(this).toggleClass("selected");
    });
  },
  initAgreementCheckboxEvent() {
    const $allAgree = $('#checkboxAll');
    const $checkboxes = $('input.checkbox03').not($allAgree);

    $allAgree.on('change', function () {
      const checked = this.checked;
      $checkboxes.prop('checked', checked);
    });
  
    $checkboxes.on('change', function () {
      const allChecked = $checkboxes.length === $checkboxes.filter(':checked').length;
      $allAgree.prop('checked', allChecked);
    });
  },
  initEmailSelectEvent() {
    const $selectWrapper = $('.email-select');
    const $selectBox = $selectWrapper.find('.select__box');
    const $selectOptions = $selectWrapper.find('.select__options');
    const $directInputWrapper = $selectWrapper.find('.direct-input-wrapper');
    const $directInput = $directInputWrapper.find('.email-direct-input');
  
    $selectBox.on('click', function (e) {
      e.stopPropagation();
      $('.select__options').not($selectOptions).hide();
      $selectOptions.toggle();
    });
  
    $selectOptions.on('click', 'div[data-value]', function (e) {
      e.stopPropagation();
      const value = $(this).data('value');
      const label = $(this).text();
  
      if (value === 'direct') {
        $selectBox.hide();
        $directInputWrapper.show();
        $directInput.val('').focus();
      } else {
        $selectBox.html(label).addClass('selected').show();
        $directInputWrapper.hide();
        $selectOptions.hide();
      }
    });
  
    $directInput.on('click', function (e) {
      e.stopPropagation();
      $selectOptions.show();
    });
  
    $(document).on('click', function () {
      $selectOptions.hide();
    });  
  },
  initStepEvent(prefix) {
    const firstStep = $(`div[id^='${prefix}']`).last();
    $(`div[id^='${prefix}']`).hide();
    firstStep.show();
  
    $(document).on('click', `.${prefix}-next-btn`, function () {
      const $current = $(this).closest(`div[id^='${prefix}']`);
      const nextId = $(this).data(`${prefix}-target`);
      const $next = $(`#${nextId}`);
  
      if ($next.length) {
        $current.fadeOut(300, () => $next.fadeIn(300));
      }
    });
  
    $(document).on('click', `.${prefix}-prev-btn`, function () {
      const $current = $(this).closest(`div[id^='${prefix}']`);
      const prevId = $(this).data(`${prefix}-target`);
      const $prev = $(`#${prevId}`);
  
      if ($prev.length) {
        $current.fadeOut(300, () => $prev.fadeIn(300));
      }
    });
  },
  initIdInputEvent() {
    const $input = $('#signup04 input[type="text"]');
    const $checkBtn = $('#signup04 .pop-btn');
    const $nextBtn = $('#signup04 .signup-next-btn');
  
    $input.on('input', function () {
      const hasText = $(this).val().trim().length > 0;
  
      if (hasText) {
        $checkBtn.removeClass('bg--grayAA').addClass('bg--primary');
        $nextBtn.prop('disabled', false);
      } else {
        $checkBtn.removeClass('bg--primary').addClass('bg--grayAA');
        $nextBtn.prop('disabled', true);
      }
    });
  },
  initWithdrawTextareaToggle() {
    const $selectBox = $('#withdraw-reason');
    const $options = $selectBox.siblings('.select__options').find('div');
    const $textareaApp = $('.withdraw-reason-textarea.reason--app');
    const $textareaEtc = $('.withdraw-reason-textarea.reason--etc');

    // 처음에 모두 숨기기
    $textareaApp.hide();
    $textareaEtc.hide();

    $options.on('click', function () {
      const selectedValue = $(this).data('value');

      // 선택된 텍스트로 셀렉트 박스 텍스트 변경
      $selectBox.text($(this).text());

      // 조건별로 textarea 보여주기
      if (selectedValue === '다른어플 이용') {
        $textareaApp.show();
        $textareaEtc.hide();
      } else if (selectedValue === '기타') {
        $textareaApp.hide();
        $textareaEtc.show();
      } else {
        $textareaApp.hide();
        $textareaEtc.hide();
      }
    });
  },
  initTabEvent() {
    const $tabButtons = $(".tab__b .btn");
    const $tabPanels = $(".tab-panel");

    $tabButtons.on("click", function () {
      const target = $(this).data("content");

      $tabButtons.removeClass("on");
      $(this).addClass("on");

      $tabPanels.removeClass("active");
      $("#" + target).addClass("active");
    });
  },
  initSubTabEvent() {
    const $subTabButtons = $(".sub-tab__b .btn");

    $subTabButtons.on("click", function () {
      const target = $(this).data("subcontent");

      // 버튼 on/off
      $subTabButtons.removeClass("on");
      $(this).addClass("on");

      // 콘텐츠 패널 전환
      $(".sub-tab-panel").removeClass("active");
      $(`.sub-tab-panel[data-subcontent="${target}"]`).addClass("active");
    });
  },
};
