const commonEvent = {
  init() {
    this.headerEvent();
    this.searchEvent();
    this.faqEvent();
  },

  headerEvent() {
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

    // 스크롤 시 헤더 고정 및 탭 반응
    const header = document.querySelector('.search-header-wrap');
    const tabs = document.querySelectorAll('.tab-content');
    const searchFooter = document.querySelector('.search-footer');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      tabs.forEach(tab => {
        if (tab.classList.contains('active')) {
          if (currentScroll <= lastScroll) {
            header.style.top = '0';
            tab.classList.add('is-radius');
            searchFooter?.classList.add('is-radius');
          } else {
            header.style.top = '-151px';
            tab.classList.remove('is-radius');
            searchFooter?.classList.remove('is-radius');
          }
        }
      });
    
    });

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
  faqEvent() {
    $(".faq__question").on("click", function (e) {
      e.preventDefault();
      $(this).next('.faq__answer').slideToggle(300).parent().toggleClass('on').siblings('li').removeClass('on').children('.faq__answer').slideUp(300);
    });
  
    // select
    let $customSelect = $(".select--custom");
    let $selectBox = $customSelect.find(".select__box");
    let $selectOptions = $customSelect.find(".select__options");
    let $select = $customSelect.find("select");

    // 옵션 리스트 생성
    $select.find("option").each(function () {
      let value = $(this).val();
      let text = $(this).text();
      $selectOptions.append(`<div data-value="${value}">${text}</div>`);
    });

    // 선택 영역 클릭 시 옵션 토글
    $selectBox.on("click", function () {
        $selectOptions.toggle();
    });

    // 옵션 클릭 시 값 변경
    $selectOptions.on("click", "div", function () {
      let value = $(this).data("value");
      let text = $(this).text();
      $selectBox.text(text).addClass("selected");
      $selectBox.text(text);
      $select.val(value).trigger("change"); // select 값 변경 트리거
      $selectOptions.hide();
    });
      // 키보드 네비게이션 추가
    let currentIndex = -1;
    $selectBox.on("keydown", function (e) {
        let $items = $selectOptions.find("div");
        if (e.key === "ArrowDown") {
            currentIndex = (currentIndex + 1) % $items.length;
        } else if (e.key === "ArrowUp") {
            currentIndex = (currentIndex - 1 + $items.length) % $items.length;
        } else if (e.key === "Enter") {
            $items.eq(currentIndex).trigger("click");
        }
        $items.removeClass("active").eq(currentIndex).addClass("active");
    });

    // 외부 클릭 시 옵션 닫기
    $(document).on("click", function (e) {
      if (!$(e.target).closest(".select--custom").length) {
          $selectOptions.hide();
      }
    });
    
  }
};
