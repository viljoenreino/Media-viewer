// Owners: Reino Viljoen, Athanasios Rigopoulos, Vlad Omete

var mediaViewer = (function () {
  var $mediaViewerExist = $('.media-viewer');
    
  var $mv = $(".media-viewer");
  var $item = $mv.find("li");

  var $prevBtn, $nextBtn, $ic, $g, $gItem, $gItemLink;

  var mediaviewertitle = 'Reino Viljoen';
  var modal = '<div class="modal fade media-viewer-cont" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"><div class="modal-dialog modal-lg" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalLabel">Photos of Clinic name</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button></div><div class="modal-body"><button class="prevbtn btn" data-direction="prev"><svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 30C14.4772 30 10 25.5228 10 20C10 14.4772 14.4772 10 20 10C25.5228 10 30 14.4772 30 20C30 25.5228 25.5228 30 20 30Z" stroke="#3B8BEA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M20 24L16 20L20 16" stroke="#3B8BEA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M24 20H16" stroke="#3B8BEA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button><button class="nextbtn btn" data-direction="next"><svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 30C14.4772 30 10 25.5228 10 20C10 14.4772 14.4772 10 20 10C25.5228 10 30 14.4772 30 20C30 25.5228 25.5228 30 20 30Z" stroke="#3B8BEA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M20 24L16 20L20 16" stroke="#3B8BEA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M24 20H16" stroke="#3B8BEA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button><div class="image-preview-cont"><div class="image-counter"></div><img src="" class="land" width="100%" height="auto"><div class="caption-cont"><div class="row"><div class="col"></div></div></div></div></div><div class="modal-footer"><div class="media-gallery-cont"><ul></ul></div></div></div></div></div>';

  $item.on('mouseup', _selectedItem);

  _render();
  _cacheDom();
  _bindEvents();
  _imageCounter();

  function _cacheDom() {
    $prevBtn = $(".prevbtn");
    $nextBtn = $(".nextbtn");
    $ic = $(".image-counter");
    $g = $('.media-gallery-cont');
    $gItem = $g.find('li');
    $gItemLink = $gItem.find("a");
  }

  function _bindEvents() {
    $nextBtn.on("mouseup", _nextImage);
    $prevBtn.on("mouseup", _prevImage);
    $gItemLink.on("mouseup", _scrollList);
  }

  function _render() {
    if ($mediaViewerExist) {
      $(modal).appendTo('body');
      $item.each(function () {
        var viewImg = $(this).find('img').data("view");
        var titleImg = $(this).find('img').data("title");
        var srcImg = $(this).find('img').attr("src");
        var descriptionImg = $(this).find('img').data("description");
        var imageItem = '<li><a role="button"><img src="' + srcImg + '" data-view="' + viewImg + '" data-title="' + titleImg + '" data-description="' + descriptionImg + '" class="' + viewImg + '" width="100%" height="auto" alt="' + srcImg + '"></a></li>';
        $(imageItem).appendTo('.media-gallery-cont ul');
      });
      if (mediaviewertitle != '') {
        $('.modal-title').html(mediaviewertitle);
      }
    }
  }
  //image counter
  function _imageCounter() {
    var imageNum = $gItem.length;
    var indexNum = $g.find('ul').find('.active').index() + 1;
    $ic.html('Image ' + indexNum + '/' + imageNum);
  }
    
  function _selectedItem() {
    var $btnnum = $(this).index();
    $('#exampleModal').modal('show');
    setTimeout(function () {
      $(".media-gallery-cont li").removeClass("active");
      $(".media-gallery-cont li").eq($btnnum).addClass("active");
      $(".media-gallery-cont ul").scrollCenter(".active", 300);
      _updateImageCaption();
      _imageCounter();
    }, 160);
  }

  function _scrollList() {
    $(".media-gallery-cont li").removeClass("active");
    $(this).closest('li').addClass("active");
    $(".media-gallery-cont ul").scrollCenter(".active", 300);
    var selectedImg = $('img', this).attr('src');
    var viewImg = $('img', this).data("view");
    var titleImg = $('img', this).data("title");
    var descriptionImg = $('img', this).data("description");
    $('.image-preview-cont img').attr('src', selectedImg).attr('class', viewImg);
    if ((titleImg != '' && titleImg != 'undefined') || (descriptionImg != '' && descriptionImg != 'undefined')) {
      $('.caption-cont').removeClass('d-none').addClass('d-block');
    }else{
      $('.caption-cont').removeClass('d-block').addClass('d-none');
    }
    $('.caption-cont .col').html('');
    if (titleImg != '' && titleImg != 'undefined') {
      $('<h6>' + titleImg + '</h6>').appendTo('.caption-cont .col');
    }
    if (descriptionImg != '' && descriptionImg != 'undefined') {
      $('<p>' + descriptionImg + '</p>').appendTo('.caption-cont .col');
    }
    _imageCounter();
  }

  function _nextImage() {
    if (!$(".media-gallery-cont li.active").is(':last-child')) {
      $(".media-gallery-cont li.active").removeClass('active').next('li').addClass("active");
      $(".media-gallery-cont ul").scrollCenter(".active", 300);
      _updateImageCaption();
      _imageCounter();
    }
  }

  function _prevImage() {
    if (!$(".media-gallery-cont li.active").is(':first-child')) {
      $(".media-gallery-cont li.active").removeClass('active').prev('li').addClass("active");
      $(".media-gallery-cont ul").scrollCenter(".active", 300);
      _updateImageCaption();
      _imageCounter();
    }
  }

  function _updateImageCaption() {
    var selectedImg = $(".media-gallery-cont li.active img").attr('src');
    var viewImg = $(".media-gallery-cont li.active img").data("view");
    var titleImg = $(".media-gallery-cont li.active img").data("title");
    var descriptionImg = $(".media-gallery-cont li.active img").data("description");
    if ((titleImg != '' && titleImg != 'undefined') || (descriptionImg != '' && descriptionImg != 'undefined')) {
      $('.caption-cont').removeClass('d-none').addClass('d-block');
    }else{
      $('.caption-cont').removeClass('d-block').addClass('d-none');
    }
    $('.caption-cont .col').html('');
    if (titleImg != '' && titleImg != 'undefined') {
      $('<h6>' + titleImg + '</h6>').appendTo('.caption-cont .col');
    }
    if (descriptionImg != '' && descriptionImg != 'undefined') {
      $('<p>' + descriptionImg + '</p>').appendTo('.caption-cont .col');
    }
    $('.image-preview-cont img').attr('src', selectedImg).attr('class', viewImg);
  }


  $.fn.scrollCenter = function (elem, speed) {
    var active = $(this).find(elem);
    var activeWidth = active.width() / 2;
    var pos = active.position().left - activeWidth;
    var elpos = $(this).scrollLeft();
    var elW = $(this).width();
    pos = pos + elpos - (elW / 2) + 150;
    $(this).animate({
      scrollLeft: pos
    }, speed == undefined ? 1000 : speed);
    return this;
  };


})();
