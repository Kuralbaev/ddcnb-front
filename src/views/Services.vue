<template>
  <div>
    <main>
      <!-- ===== Заголовок страницы ===== -->
      <section class="hero hero--page">
        <div class="container">
          <div class="frame reveal">
            <div class="frame__rulers" aria-hidden="true">
              <span class="ruler"><i></i>140 px</span>
              <span class="ruler"><i></i>530 px</span>
              <span class="ruler"><i></i>610 px</span>
            </div>

            <div class="mission">
              <p class="hero__eyebrow">
                <span class="tick" aria-hidden="true"></span>каталог сервисов
              </p>
              <h1 class="mission__title">
                Наши <span class="mission__stroke">услуги</span>
              </h1>
              <p class="mission__sub">
                Четыре направления, которые обеспечивают цифровую устойчивость
                Национального Банка и&nbsp;организаций его системы.
              </p>
            </div>

            <div class="hero__footline" aria-hidden="true">
              <span>контакт-центр</span>
              <span>портал закупок</span>
              <span>технологический оператор</span>
              <span>единый центр IT-услуг</span>
            </div>
          </div>
        </div>
      </section>

      <!-- ===== Услуги: вкладки ===== -->
      <section class="svc">
        <div class="container svc__layout">
          <aside
            class="svc__tabs reveal"
            role="tablist"
            aria-label="Список услуг"
          >
            <button
              class="svc-tab is-active"
              role="tab"
              aria-selected="true"
              aria-controls="svc-panel-1"
              id="svc-tab-1"
              type="button"
            >
              <span class="svc-tab__num">/01</span>
              <span class="svc-tab__name">Контакт-центр 1477</span>
              <span class="svc-tab__arrow" aria-hidden="true">→</span>
            </button>
            <button
              class="svc-tab"
              role="tab"
              aria-selected="false"
              aria-controls="svc-panel-2"
              id="svc-tab-2"
              type="button"
            >
              <span class="svc-tab__num">/02</span>
              <span class="svc-tab__name">Оператор портала закупок</span>
              <span class="svc-tab__arrow" aria-hidden="true">→</span>
            </button>
            <button
              class="svc-tab"
              role="tab"
              aria-selected="false"
              aria-controls="svc-panel-3"
              id="svc-tab-3"
              type="button"
            >
              <span class="svc-tab__num">/03</span>
              <span class="svc-tab__name">Технологический оператор</span>
              <span class="svc-tab__arrow" aria-hidden="true">→</span>
            </button>
            <button
              class="svc-tab"
              role="tab"
              aria-selected="false"
              aria-controls="svc-panel-4"
              id="svc-tab-4"
              type="button"
            >
              <span class="svc-tab__num">/04</span>
              <span class="svc-tab__name">Единый центр IT-услуг</span>
              <span class="svc-tab__arrow" aria-hidden="true">→</span>
            </button>

            <div class="svc__tabs-note" aria-hidden="true">
              <span class="people__tile-value">04</span>
              <p>направления в едином стандарте качества ISO 9001</p>
            </div>
          </aside>

          <div class="svc__panels reveal" style="--d: 0.1s">
            <!-- /01 Контакт-центр -->
            <article
              class="svc-panel is-active"
              role="tabpanel"
              id="svc-panel-1"
              aria-labelledby="svc-tab-1"
            >
              <header class="svc-panel__head">
                <span class="svc-panel__index">/01</span>
                <h2 class="svc-panel__title">Контакт-центр 1477</h2>
                <p class="svc-panel__lead">
                  Единый контакт-центр Национального Банка РК оказывает
                  пользователям консультационную и техническую поддержку по
                  административной отчётности, работе с цифровыми сервисами и
                  информационными ресурсами Национального Банка.
                </p>
              </header>

              <div class="svc-value">
                <span class="svc-value__label">Ценность</span>
                <p>
                  Обеспечивает доступность сервисов НБ РК, снижает нагрузку на
                  профильные подразделения и формирует единый стандарт
                  обслуживания клиентов.
                </p>
              </div>

              <div class="svc-cols">
                <div class="svc-block">
                  <h3 class="svc-block__title">Кому предоставляется</h3>
                  <ul class="svc-list">
                    <li>участникам финансового рынка</li>
                    <li>организациям системы Национального Банка РК</li>
                    <li>пользователям цифровых сервисов НБ РК</li>
                  </ul>
                </div>
                <div class="svc-block">
                  <h3 class="svc-block__title">Состав услуги</h3>
                  <ul class="svc-list">
                    <li>приём и обработка входящих обращений по номеру 1477</li>
                    <li>
                      консультирование по процессам сдачи административной
                      отчётности
                    </li>
                    <li>
                      поддержка пользователей веб-порталов и информационных
                      систем НБ РК
                    </li>
                    <li>информационно-справочные услуги</li>
                    <li>маршрутизация обращений в профильные подразделения</li>
                  </ul>
                </div>
              </div>

              <div class="svc-block">
                <h3 class="svc-block__title">Уровень сервиса (SLA)</h3>
                <div class="svc-sla">
                  <div class="svc-sla__item">
                    <b>09:00–18:30</b>
                    <span>доступность сервиса</span>
                  </div>
                  <div class="svc-sla__item">
                    <b>По регламенту</b>
                    <span>время первичного ответа</span>
                  </div>
                  <div class="svc-sla__item">
                    <b>По категории</b>
                    <span>срок обработки — зависит от критичности запроса</span>
                  </div>
                  <div class="svc-sla__item">
                    <b>Постоянно</b>
                    <span>контроль качества обслуживания</span>
                  </div>
                </div>
              </div>

              <footer class="svc-foot">
                <div class="svc-foot__channel">
                  <span class="svc-foot__label">Как обратиться</span>
                  <b class="svc-foot__phone">1477</b>
                  <span
                    >бесплатно на территории Республики Казахстан, со всех
                    стационарных и мобильных телефонов</span
                  >
                </div>
                <div class="svc-foot__dept">
                  <span class="svc-foot__label"
                    >Ответственное подразделение</span
                  >
                  <p>
                    Департамент дистанционного обслуживания, Контакт-центр
                    Национального Банка РК (в составе АО «Центр цифрового
                    развития НБ РК»)
                  </p>
                </div>
              </footer>
            </article>

            <!-- /02 Портал закупок -->
            <article
              class="svc-panel"
              role="tabpanel"
              id="svc-panel-2"
              aria-labelledby="svc-tab-2"
              hidden
            >
              <header class="svc-panel__head">
                <span class="svc-panel__index">/02</span>
                <h2 class="svc-panel__title">Оператор портала закупок</h2>
                <p class="svc-panel__lead">
                  Операционное сопровождение портала закупок Национального Банка
                  РК: от регистрации участников до проведения процедур. Более 25
                  лет на рынке — опыт, проверенный государственными сервисами.
                </p>
              </header>

              <div class="svc-value">
                <span class="svc-value__label">Ценность</span>
                <p>
                  Прозрачность и непрерывность закупочных процедур, равный
                  доступ поставщиков и единая цифровая среда для заказчиков
                  системы НБ РК.
                </p>
              </div>

              <div class="svc-cols">
                <div class="svc-block">
                  <h3 class="svc-block__title">Кому предоставляется</h3>
                  <ul class="svc-list">
                    <li>Национальному Банку РК и организациям его системы</li>
                    <li>поставщикам товаров, работ и услуг</li>
                    <li>участникам закупочных процедур</li>
                  </ul>
                </div>
                <div class="svc-block">
                  <h3 class="svc-block__title">Состав услуги</h3>
                  <ul class="svc-list">
                    <li>регистрация и сопровождение участников портала</li>
                    <li>проведение и поддержка закупочных процедур</li>
                    <li>техническая поддержка пользователей</li>
                    <li>развитие функциональности и интеграции портала</li>
                  </ul>
                </div>
              </div>

              <div class="svc-block">
                <h3 class="svc-block__title">Уровень сервиса (SLA)</h3>
                <div class="svc-sla">
                  <div class="svc-sla__item">
                    <b>24/7</b>
                    <span>доступность портала</span>
                  </div>
                  <div class="svc-sla__item">
                    <b>2020</b>
                    <span>в промышленной эксплуатации</span>
                  </div>
                  <div class="svc-sla__item">
                    <b>По регламенту</b>
                    <span>сроки обработки обращений</span>
                  </div>
                  <div class="svc-sla__item">
                    <b>Постоянно</b>
                    <span>мониторинг и контроль качества</span>
                  </div>
                </div>
              </div>

              <footer class="svc-foot">
                <div class="svc-foot__channel">
                  <span class="svc-foot__label">Как обратиться</span>
                  <b class="svc-foot__phone">portal.ddcnb.kz</b>
                  <span
                    >поддержка пользователей — через контакт-центр 1477</span
                  >
                </div>
                <div class="svc-foot__dept">
                  <span class="svc-foot__label"
                    >Ответственное подразделение</span
                  >
                  <p>
                    Департамент сопровождения портала закупок АО «Центр
                    цифрового развития НБ РК»
                  </p>
                </div>
              </footer>
            </article>

            <!-- /03 Технологический оператор -->
            <article
              class="svc-panel"
              role="tabpanel"
              id="svc-panel-3"
              aria-labelledby="svc-tab-3"
              hidden
            >
              <header class="svc-panel__head">
                <span class="svc-panel__index">/03</span>
                <h2 class="svc-panel__title">
                  Технологический оператор данных
                </h2>
                <p class="svc-panel__lead">
                  Профессиональная обработка, хранение и управление информацией
                  в защищённой инфраструктуре: дата-центры, резервирование,
                  контроль целостности и доступности данных.
                </p>
              </header>

              <div class="svc-value">
                <span class="svc-value__label">Ценность</span>
                <p>
                  Надёжное хранение и непрерывная доступность критически важных
                  данных финансового сектора при соблюдении требований
                  информационной безопасности.
                </p>
              </div>

              <div class="svc-cols">
                <div class="svc-block">
                  <h3 class="svc-block__title">Кому предоставляется</h3>
                  <ul class="svc-list">
                    <li>Национальному Банку РК</li>
                    <li>дочерним организациям и структурам НБ РК</li>
                    <li>
                      государственным информационным системам финансового
                      сектора
                    </li>
                  </ul>
                </div>
                <div class="svc-block">
                  <h3 class="svc-block__title">Состав услуги</h3>
                  <ul class="svc-list">
                    <li>
                      обработка и хранение данных в защищённых дата-центрах
                    </li>
                    <li>резервное копирование и восстановление</li>
                    <li>администрирование баз данных и хранилищ</li>
                    <li>обеспечение целостности и доступности информации</li>
                  </ul>
                </div>
              </div>

              <div class="svc-block">
                <h3 class="svc-block__title">Уровень сервиса (SLA)</h3>
                <div class="svc-sla">
                  <div class="svc-sla__item">
                    <b>24/7</b>
                    <span>режим работы инфраструктуры</span>
                  </div>
                  <div class="svc-sla__item">
                    <b>Гео-резерв</b>
                    <span>резервирование критичных систем</span>
                  </div>
                  <div class="svc-sla__item">
                    <b>По регламенту</b>
                    <span>время реакции на инциденты</span>
                  </div>
                  <div class="svc-sla__item">
                    <b>ISO 9001</b>
                    <span>стандарт управления качеством</span>
                  </div>
                </div>
              </div>

              <footer class="svc-foot">
                <div class="svc-foot__channel">
                  <span class="svc-foot__label">Как обратиться</span>
                  <b class="svc-foot__phone">info@ddcnb.kz</b>
                  <span
                    >запросы принимаются в письменном виде от уполномоченных
                    организаций</span
                  >
                </div>
                <div class="svc-foot__dept">
                  <span class="svc-foot__label"
                    >Ответственное подразделение</span
                  >
                  <p>
                    Департамент эксплуатации инфраструктуры АО «Центр цифрового
                    развития НБ РК»
                  </p>
                </div>
              </footer>
            </article>

            <!-- /04 Единый центр IT-услуг -->
            <article
              class="svc-panel"
              role="tabpanel"
              id="svc-panel-4"
              aria-labelledby="svc-tab-4"
              hidden
            >
              <header class="svc-panel__head">
                <span class="svc-panel__index">/04</span>
                <h2 class="svc-panel__title">
                  Единый центр IT-услуг / Центр инженерных компетенций
                </h2>
                <p class="svc-panel__lead">
                  Сопровождение и администрирование ИТ-систем Национального
                  Банка: разработка, внедрение, эксплуатация и развитие
                  информационных систем силами единой инженерной команды.
                </p>
              </header>

              <div class="svc-value">
                <span class="svc-value__label">Ценность</span>
                <p>
                  Единая точка ответственности за жизненный цикл ИТ-систем: от
                  проектирования до сопровождения — с накопленной за 25 лет
                  инженерной экспертизой.
                </p>
              </div>

              <div class="svc-cols">
                <div class="svc-block">
                  <h3 class="svc-block__title">Кому предоставляется</h3>
                  <ul class="svc-list">
                    <li>Национальному Банку РК</li>
                    <li>организациям системы НБ РК</li>
                    <li>
                      государственным органам — в рамках совместных проектов
                    </li>
                  </ul>
                </div>
                <div class="svc-block">
                  <h3 class="svc-block__title">Состав услуги</h3>
                  <ul class="svc-list">
                    <li>разработка и внедрение информационных систем</li>
                    <li>сопровождение и администрирование ИТ-систем</li>
                    <li>информационная безопасность и аудит</li>
                    <li>
                      инженерные компетенции: архитектура, DevOps, тестирование
                    </li>
                  </ul>
                </div>
              </div>

              <div class="svc-block">
                <h3 class="svc-block__title">Уровень сервиса (SLA)</h3>
                <div class="svc-sla">
                  <div class="svc-sla__item">
                    <b>50/24</b>
                    <span>систем разработано / в эксплуатации</span>
                  </div>
                  <div class="svc-sla__item">
                    <b>25 лет</b>
                    <span>опыта с 1996 года</span>
                  </div>
                  <div class="svc-sla__item">
                    <b>По регламенту</b>
                    <span>время реакции на инциденты</span>
                  </div>
                  <div class="svc-sla__item">
                    <b>ISO 9001</b>
                    <span>стандарт управления качеством</span>
                  </div>
                </div>
              </div>

              <footer class="svc-foot">
                <div class="svc-foot__channel">
                  <span class="svc-foot__label">Как обратиться</span>
                  <b class="svc-foot__phone">info@ddcnb.kz</b>
                  <span
                    >заявки на проекты и сопровождение — в письменном виде</span
                  >
                </div>
                <div class="svc-foot__dept">
                  <span class="svc-foot__label"
                    >Ответственное подразделение</span
                  >
                  <p>
                    Единый центр IT-услуг / Центр инженерных компетенций АО
                    «Центр цифрового развития НБ РК»
                  </p>
                </div>
              </footer>
            </article>
          </div>
        </div>
      </section>

      <!-- ===== CTA ===== -->
      <section class="cta">
        <div class="container">
          <div class="cta__box reveal">
            <h2 class="cta__title">Нужна консультация?</h2>
            <p class="cta__text">
              Позвоните в контакт-центр или напишите нам — поможем подобрать
              решение.
            </p>
            <router-link class="btn btn--primary btn--lg" to="/contacts"
              >Написать нам</router-link
            >
            <span class="cta__phone">контакт-центр — <b>1477</b></span>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer">
      <div class="container footer__inner">
        <div class="footer__brand">
          <span class="logo__mark">DDC</span>
          <p>
            АО «Центр цифрового развития»<br />Национальный Банк Республики
            Казахстан
          </p>
        </div>
        <nav class="footer__nav" aria-label="Навигация в подвале">
          <router-link to="/services">Услуги</router-link>
          <router-link to="/about">О нас</router-link>
          <router-link to="/mission">Миссия</router-link>
          <router-link to="/news">Новости</router-link>
          <router-link to="/contacts">Контакты</router-link>
        </nav>
        <div class="footer__meta">
          <p>© 1996–2026 DDC. Все права защищены.</p>
          <p>Разработано DDC</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { initDDC } from "../assets/main";

const initReveal = () => {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0 },
  );

  requestAnimationFrame(() => {
    document
      .querySelectorAll(".reveal")
      .forEach((el) => revealObserver.observe(el));
  });
};

onMounted(() => {
  initDDC();
  initReveal();
});
</script>
