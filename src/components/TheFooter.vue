<template>
  <footer class="footer">
    <div class="wrapper">
      <div class="footer-wrap">
        <div class="footer__column">
          <TheLogo />
          <div class="footer__text">
            <p>Децентрализованная peer 2 peer биржа обмена криптовалют (BTC, ETH) на фиат.</p>
            <p>А также безопасный децентрализованный криптокошелек.</p>
          </div>
        </div>
        <div class="footer__column">
          <h6>Мы в цифрах</h6>
          <ul class="footer__list">
            <li class="footer__item">
              <div class="points-icon">
                <span class="icon-refresh" style="font-size: 21px;"></span>
              </div>
              <div>
                <div class="points-main">$ 5 000 200 124</div>
                <p>Оборот в USD в сутки</p>
              </div>
            </li>
            <li class="footer__item">
              <div class="points-icon">
                <span class="icon-refresh" style="font-size: 21px;"></span>
              </div>
              <div>
                <div class="points-main">500 000</div>
                <p>Сделок в сутки по UTC</p>
              </div>
            </li>
            <li class="footer__item">
              <div class="points-icon" style="font-size: 21px;">
                <span class="icon-credit-card"></span>
              </div>
              <div>
                <div class="points-main">1 200 500 000</div>
                <p>Выплаченно рефералам</p>
              </div>
            </li>
          </ul>
        </div>
        <div class="footer__column">
          <h6>Контакты</h6>
          <ul class="footer__list footer__list_mb">
            <li class="footer__item">
              <div class="points-icon" style="font-size: 18px;">
                <span class="icon-mail"></span>
              </div>
              <div>
                <div class="points-main">
                  <a href="mailto:Coinsshop@gmail.com">Coinsshop@gmail.com</a>
                </div>
                <p>Почта</p>
              </div>
            </li>
            <li class="footer__item">
              <div class="points-icon" style="font-size: 24px;">
                <span class="icon-phone"></span>
              </div>
              <div>
                <div class="points-main">
                  <a href="tel:88002227459">8 (800) 222-74-59</a>
                </div>
                <p>Телефон</p>
              </div>
            </li>
          </ul>
          <ul class="footer-soc__list">
            <li class="footer-soc__item">
              <a href="#" class="footer-soc__link" style="font-size: 9px;">
                <span class="icon-vk"></span>
              </a>
            </li>
            <li class="footer-soc__item">
              <a href="#" class="footer-soc__link" style="font-size: 14px;">
                <span class="icon-facebook"></span>
              </a>
            </li>
            <li class="footer-soc__item">
              <a href="#" class="footer-soc__link" style="font-size: 19px;">
                <span class="icon-instagram"></span>
              </a>
            </li>
            <li class="footer-soc__item">
              <a href="#" class="footer-soc__link" style="font-size: 13px;">
                <span class="icon-telegram"></span>
              </a>
            </li>
          </ul>
        </div>
        <div class="footer__column footer__column_pt">
          <a href="#" class="btn">Смартконтракт</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import TheLogo from "@/components/TheLogo";

export default {
  components: {
    TheLogo
  }
};
</script>