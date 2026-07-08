<template>
  <main>
    <!-- ===== Заголовок ===== -->
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
              <span class="tick" aria-hidden="true"></span>/ свяжитесь с нами /
            </p>
            <h1 class="mission__title">
              Всегда готовы ответить на&nbsp;ваши
              <span class="mission__stroke">вопросы</span>
            </h1>
            <p class="mission__sub">
              Консультации по сервисам, сотрудничество, обращения — выберите
              удобный канал связи или&nbsp;напишите нам напрямую.
            </p>
          </div>

          <div class="hero__footline" aria-hidden="true">
            <span>астана</span>
            <span>контакт-центр 1477</span>
            <span>info@ddcnb.kz</span>
            <span>пн–пт 09:00–18:30</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== Контакты + форма ===== -->
    <section class="contacts">
      <div class="container contacts__grid">
        <div class="contacts__info reveal">
          <div class="contact-card">
            <span class="contact-card__label">Наше местоположение</span>
            <p class="contact-card__value">
              Z05T8F6, Республика Казахстан,<br />г. Астана, проспект Мәңгілік
              Ел, 57А
            </p>
            <a
              class="contact-card__link"
              href="https://2gis.kz/astana/search/Мәңгілік%20Ел%2057А"
              target="_blank"
              rel="noopener"
              >Открыть на карте <i>→</i></a
            >
          </div>

          <div class="contact-card">
            <span class="contact-card__label">Контакт-центр</span>
            <p class="contact-card__value contact-card__value--big">1477</p>
            <p class="contact-card__note">
              бесплатно по Казахстану со стационарных и мобильных телефонов,
              пн–пт 09:00–18:30
            </p>
          </div>

          <div class="contact-card">
            <span class="contact-card__label">Электронная почта</span>
            <a
              class="contact-card__value contact-card__value--link"
              href="mailto:info@ddcnb.kz"
              >info@ddcnb.kz</a
            >
          </div>

          <div class="contact-card">
            <span class="contact-card__label">Социальные сети</span>
            <div class="contact-card__socials">
              <a
                href="https://www.instagram.com/bsbnb.kz/"
                aria-label="Instagram"
                target="_blank"
                >Instagram</a
              >
              <a href="" aria-label="Facebook">Facebook</a>
              <a href="#" aria-label="LinkedIn">LinkedIn</a>
            </div>
          </div>
        </div>

        <form
          ref="formRef"
          class="contact-form reveal"
          style="--d: 0.1s"
          novalidate
          @submit.prevent="handleSubmit"
        >
          <h2 class="contact-form__title">Напишите нам</h2>
          <p class="contact-form__sub">
            Заполните форму — ответим в ближайшее время.
          </p>

          <div class="contact-form__grid">
            <label class="field">
              <span class="field__label">ФИО</span>
              <input
                class="field__input"
                type="text"
                name="name"
                autocomplete="name"
                required
              />
            </label>
            <label class="field">
              <span class="field__label">Email</span>
              <input
                class="field__input"
                type="email"
                name="email"
                autocomplete="email"
                required
              />
            </label>
            <label class="field">
              <span class="field__label">Моб. телефон</span>
              <input
                class="field__input"
                type="tel"
                name="phone"
                autocomplete="tel"
                inputmode="tel"
                placeholder="+7 (___) ___-__-__"
                required
                :value="phone"
                @input="onPhoneInput"
              />
            </label>
            <label class="field">
              <span class="field__label">Тема вопроса</span>
              <select class="field__input" name="topic" required>
                <option value="" selected disabled>Выберите тему</option>
                <option>Портал закупок</option>
                <option>Контакт-центр 1477</option>
                <option>IT-услуги и сопровождение</option>
                <option>Сотрудничество</option>
                <option>Другое</option>
              </select>
            </label>
            <label class="field field--full">
              <span class="field__label">Вопрос</span>
              <textarea
                class="field__input field__input--area"
                name="message"
                rows="5"
                required
              ></textarea>
            </label>
          </div>

          <div class="contact-form__actions">
            <button
              class="btn btn--primary btn--lg"
              type="submit"
              :disabled="isSubmitting || isSuccess"
            >
              {{ isSubmitting ? "Отправка…" : "Отправить данные" }}
            </button>
            <p class="contact-form__consent">
              Нажимая кнопку, вы соглашаетесь на обработку персональных данных.
            </p>
          </div>

          <p v-if="submitError" class="contact-form__error" role="alert">
            {{ submitError }}
          </p>

          <p v-show="isSuccess" class="contact-form__success">
            Спасибо! Ваше обращение принято — мы свяжемся с вами в ближайшее
            время.
          </p>
        </form>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { initDDC } from "../assets/main";
import { api } from "@/api";
import type { FeedbackPayload } from "@/dto/feedback";
import { formatKzPhone, isKzPhoneComplete } from "@/helpers/phoneMask";

const formRef = ref<HTMLFormElement | null>(null);
const phone = ref("");
const isSubmitting = ref(false);
const isSuccess = ref(false);
const submitError = ref("");

const onPhoneInput = (event: Event) => {
  const input = event.target as HTMLInputElement;
  phone.value = formatKzPhone(input.value);
  input.value = phone.value;
};

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

const handleSubmit = async () => {
  const form = formRef.value;
  if (!form) return;

  if (!isKzPhoneComplete(phone.value)) {
    submitError.value = "Введите номер телефона полностью.";
    return;
  }

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const formData = new FormData(form);
  const payload: FeedbackPayload = {
    fio: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: phone.value,
    type: String(formData.get("topic") ?? ""),
    question: String(formData.get("message") ?? ""),
  };

  isSubmitting.value = true;
  submitError.value = "";

  try {
    await api.post("/feedbacks", { data: payload });
    isSuccess.value = true;
    phone.value = "";
    form.reset();
  } catch {
    submitError.value =
      "Не удалось отправить обращение. Попробуйте позже или позвоните 1477.";
  } finally {
    isSubmitting.value = false;
  }
};

onMounted(() => {
  initDDC();
  initReveal();
});
</script>

<style scoped>
.contact-form__error {
  margin-top: 20px;
  padding: 16px 20px;
  border-left: 3px solid #c0392b;
  background: rgba(192, 57, 43, 0.08);
  font-size: 13px;
  line-height: 1.6;
  color: var(--ink);
}
</style>
