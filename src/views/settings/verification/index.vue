<template>
  <div>
    <section class="section section-qr">
      <div class="wrapper">
        <div class="qr-block qr-block_mod">
          <div class="qr-left">
            <h2>Статус верификации</h2>
            <ul class="varif__list">
              <li class="varif__item complete">
                <div class="varif-step"></div>
                <div class="varif-text">Скачать приложение</div>
              </li>
              <li class="varif__item complete">
                <div class="varif-step"></div>
                <div class="varif-text">Отправить данные</div>
              </li>
              <li class="varif__item active">
                <div class="varif-step"></div>
                <div class="varif-text">Мы проверяем ваши документы …</div>
              </li>
              <li class="varif__item">
                <div class="varif-step"></div>
                <div class="varif-text">Вы прошли верификацию</div>
              </li>
            </ul>
          </div>
          <div class="qr-right">
            <h2>QR Код</h2>
            <div class="qr-flex">
              <div class="qr-pic">
                <img src="@/img/main/qr-code.jpg" alt="img" />
              </div>
              <div class="qr-text">
                <p>
                  Что бы пройти верификацию, вам нужно скачать приложение для Android или iOS, и просто следовать
                  инструкции. Это займет не больше 5 минут.
                </p>
                <p>Просто следовать инструкции. Это займет не больше 5 минут.</p>
                <p>Что бы пройти верификацию, вам нужно скачать приложение для Android или iOS</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section section-apps">
      <div class="wrapper">
        <h2>Приложение для прохождения верификации</h2>
        <p class="qr-apps__text">
          Что бы пройти верификацию, вам нужно скачать приложение для Android или iOS, и просто
          следовать инструкции.
          Это займет не больше 5 минут.
        </p>
        <ul class="qr-apps__list">
          <li class="qr-apps__item">
            <div class="qr-apps__info">
              <a href="#" class="btn">Play Market</a>
              <p>Что бы скачать приложение, нажмите на кнопку или просканируйте QR-код</p>
            </div>
            <div class="qr-apps__pic">
              <img src="@/img/main/qr-code-small.jpg" alt="img" />
            </div>
          </li>
          <li class="qr-apps__item">
            <div class="qr-apps__info">
              <a href="#" class="btn disabled">App Store</a>
              <p>Что бы скачать приложение, нажмите на кнопку или просканируйте QR-код</p>
            </div>
            <div class="qr-apps__pic">
              <img src="@/img/main/qr-code-small.jpg" alt="img" />
            </div>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
