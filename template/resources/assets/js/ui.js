$(document).ready(function () {
  // 파일 선택 버튼 클릭 시, 해당하는 파일 입력을 클릭하게 만듦
  $('.file__btn').on('click', function() {
    var fileInputId = $(this).data('file-input');
    $('#' + fileInputId).click();
  });

  // 파일이 선택되면, 해당하는 텍스트 입력에 파일 이름을 표시
  $('.file__input').on('change', function() {
    var fileNameDisplayId = '#file-name-display' + this.id.replace('file', '');
    var fileName = $(this).prop('files')[0]?.name || '첨부파일';
    $(fileNameDisplayId).val(fileName);
  });

  // Open popup
  $(".btn__pop-open").on("click", function () {
    const targetId = $(this).data("popup-target"); // data-popup-target 값을 가져옴
    const $targetPopup = $(`#${targetId}`); // 해당 ID의 팝업을 선택
    if ($targetPopup.length) {
      $targetPopup.closest(".pop__overlay").fadeIn(300); // 배경을 표시
      $targetPopup.addClass("active"); // 팝업 표시
    }
  });

  // Close popup
  $(".btn__pop-close").on("click", function (e) {
    if ($(e.target).is(".btn__pop-close")) {
      $(e.target).closest(".pop__overlay").fadeOut(300); // 배경 숨기기
      $(e.target).closest(".popup").removeClass("active"); // 팝업 숨기기
    }
  });

  // Tab
  $(document).on("click", ".tab__lists li", function () {
    let $this = $(this);
    let $tabList = $this.closest(".tab__lists");

    // 같은 tab__lists 내에서만 active 클래스 관리
    $tabList.find("li").removeClass("active");
    $this.addClass("active");

    // tab__lists--scroll이 있을 경우 클릭한 요소를 가운데 정렬
    if ($tabList.hasClass("tab__lists--scroll")) {
      let $tabInner = $tabList.find(".tab__inner");
      let tabInnerWidth = $tabInner.outerWidth(); // 스크롤 가능한 영역의 너비
      let tabScrollLeft = $tabInner.scrollLeft(); // 현재 스크롤 위치
      let elemOffset = $this.position().left + tabScrollLeft; // 클릭한 요소의 왼쪽 위치
      let elemWidth = $this.outerWidth(); // 클릭한 요소의 너비
      let scrollTo = elemOffset - (tabInnerWidth / 2) + (elemWidth / 2);

      // 🔹 스크롤 범위를 벗어나지 않도록 보정
      let maxScrollLeft = $tabInner[0].scrollWidth - tabInnerWidth;
      if (scrollTo < 0) scrollTo = 0; // 왼쪽 끝을 넘지 않도록 설정
      if (scrollTo > maxScrollLeft) scrollTo = maxScrollLeft; // 오른쪽 끝을 넘지 않도록 설정

      console.log('tabScrollLeft:', tabScrollLeft, 'scrollTo:', scrollTo);

      // 부드러운 스크롤 이동
      $tabInner.animate({ scrollLeft: scrollTo }, 300);
    }
  });

  // FAQ
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

  // // 외부 클릭 시 옵션 닫기
  // $(document).on("click", function (e) {
  //     if (!$(e.target).closest(".select--custom").length) {
  //         $selectOptions.hide();
  //     }
  // });
});