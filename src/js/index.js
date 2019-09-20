$(document).ready(function() {
    $('.owl-carousel').owlCarousel({
        loop:false,
        margin:10,
        items: 1,
    });

    const $checkout = YandexCheckoutUI(123456, {
        language: 'ru',
        domSelector: '.checkout-form',
        amount: '189.00'
    });
})