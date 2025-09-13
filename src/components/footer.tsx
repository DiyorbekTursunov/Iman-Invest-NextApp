"use client";

import { useLanguage } from "@/hooks/use-language";
import Image from "next/image";

export function Footer() {
  const { t } = useLanguage();

  const formatText = (text: string) => {
    return text.split("\n").map((line, index) => (
      <span key={index}>
        {line}
        {index < text.split("\n").length - 1 && <br />}
      </span>
    ));
  };

  return (
    <footer className="footer" id="footer">
      <div className="footer-container">
        <h2 className="footer-title">{t.footer.title}</h2>
        <div className="footer-box">
          <div className="footer-cards">
            <p className="footer-cards-title-top">{t.footer.phone}</p>
            <a className="footer-cards-num" href="tel:+998 78 113 00 30">
              +998 78 113 00 30
            </a>
          </div>
          <div className="footer-cards">
            <p className="footer-cards-title">{t.footer.social}</p>
            <div className="footer-cards-box">
              <a
                href="https://x.com/ra_rahmatov"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
              >
                <svg
                  width={21}
                  height={18}
                  viewBox="0 0 21 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.5375 0H19.758L12.723 7.6239L21 18H14.52L9.441 11.7082L3.636 18H0.4125L7.9365 9.84269L0 0.00141865H6.645L11.229 5.75126L16.5375 0ZM15.405 16.1728H17.19L5.67 1.73219H3.756L15.405 16.1728Z"
                    fill="#ffffff"
                  />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/rustam_rakhmatulloh/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
              >
                <svg
                  width={42}
                  height={42}
                  viewBox="0 0 31 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M24.9728 11.4376C24.9615 10.6645 24.8185 9.89745 24.5448 9.17434C24.0658 7.93954 23.0904 6.96313 21.8556 6.48514C21.1417 6.21653 20.3869 6.07252 19.6229 6.05617C18.6404 6.01226 18.3289 6 15.8348 6C13.3406 6 13.021 6 12.0456 6.05617C11.2826 6.07252 10.5279 6.21653 9.81399 6.48514C8.57918 6.96313 7.60278 7.93954 7.12479 9.17434C6.85618 9.88826 6.71114 10.643 6.69685 11.406C6.65293 12.3895 6.63965 12.701 6.63965 15.1952C6.63965 17.6893 6.63965 18.008 6.69685 18.9844C6.71217 19.7483 6.85618 20.5021 7.12479 21.218C7.6038 22.4518 8.57918 23.4282 9.81501 23.9062C10.5259 24.184 11.2806 24.3413 12.0466 24.3658C13.0302 24.4097 13.3417 24.423 15.8358 24.423C18.3299 24.423 18.6496 24.423 19.625 24.3658C20.3879 24.3505 21.1427 24.2065 21.8576 23.9379C23.0925 23.4589 24.0678 22.4825 24.5468 21.2487C24.8155 20.5337 24.9595 19.78 24.9748 19.015C25.0187 18.0325 25.032 17.721 25.032 15.2258C25.0299 12.7317 25.0299 12.4151 24.9728 11.4376ZM15.8286 19.9117C13.2201 19.9117 11.107 17.7986 11.107 15.1901C11.107 12.5815 13.2201 10.4684 15.8286 10.4684C18.4351 10.4684 20.5503 12.5815 20.5503 15.1901C20.5503 17.7986 18.4351 19.9117 15.8286 19.9117ZM20.7383 11.3947C20.1285 11.3947 19.6372 10.9025 19.6372 10.2937C19.6372 9.68501 20.1285 9.19273 20.7383 9.19273C21.346 9.19273 21.8382 9.68501 21.8382 10.2937C21.8382 10.9025 21.346 11.3947 20.7383 11.3947Z"
                    fill="#ffffff"
                  />
                  <path
                    d="M15.8278 18.2592C17.5217 18.2592 18.8949 16.886 18.8949 15.1921C18.8949 13.4982 17.5217 12.125 15.8278 12.125C14.1339 12.125 12.7607 13.4982 12.7607 15.1921C12.7607 16.886 14.1339 18.2592 15.8278 18.2592Z"
                    fill="#ffffff"
                  />
                </svg>
              </a>
              <a
                href="https://t.me/rustam_rakhmatulloh"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
              >
                <svg
                  width={42}
                  height={42}
                  viewBox="0 0 31 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.916 23.3439L13.2578 18.1807L22.6322 9.73395C23.0472 9.35555 22.5467 9.17246 21.9974 9.50203L10.426 16.8136L5.42142 15.2268C4.34728 14.9216 4.33507 14.177 5.66555 13.6399L25.1589 6.1209C26.0499 5.7181 26.9043 6.34061 26.5626 7.70771L23.2425 23.3439C23.0106 24.4547 22.3392 24.7232 21.4115 24.2105L16.3582 20.4754L13.9291 22.8312C13.6484 23.112 13.4165 23.3439 12.916 23.3439Z"
                    fill="#ffffff"
                  />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@rustamrahmatulloh"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
              >
                <svg
                  width={42}
                  height={42}
                  viewBox="0 0 31 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.7391 18.3586V11.5784L19.7188 14.9686L13.7391 18.3586ZM27.0403 9.44494C26.7772 8.45753 26.0019 7.67999 25.0176 7.4161C23.2334 6.93652 16.079 6.93652 16.079 6.93652C16.079 6.93652 8.92465 6.93652 7.14044 7.4161C6.1561 7.67999 5.38081 8.45753 5.11773 9.44494C4.63965 11.2346 4.63965 14.9685 4.63965 14.9685C4.63965 14.9685 4.63965 18.7023 5.11773 20.492C5.38081 21.4794 6.1561 22.2569 7.14044 22.5209C8.92465 23.0004 16.079 23.0004 16.079 23.0004C16.079 23.0004 23.2334 23.0004 25.0176 22.5209C26.0019 22.2569 26.7772 21.4794 27.0403 20.492C27.5184 18.7023 27.5184 14.9685 27.5184 14.9685C27.5184 14.9685 27.5184 11.2346 27.0403 9.44494Z"
                    fill="#ffffff"
                  />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/rustamrahmatov/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
              >
                <svg
                  width={42}
                  height={42}
                  viewBox="0 0 31 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.6813 5H10.598C8.41219 5 6.63965 6.77254 6.63965 8.95833V20.0417C6.63965 22.2275 8.41219 24 10.598 24H21.6813C23.8679 24 25.6396 22.2275 25.6396 20.0417V8.95833C25.6396 6.77254 23.8679 5 21.6813 5ZM12.9729 20.0417H10.598V11.3333H12.9729V20.0417ZM11.7854 10.3295C11.0207 10.3295 10.4001 9.70408 10.4001 8.933C10.4001 8.16192 11.0207 7.5365 11.7854 7.5365C12.5502 7.5365 13.1708 8.16192 13.1708 8.933C13.1708 9.70408 12.551 10.3295 11.7854 10.3295ZM22.4729 20.0417H20.0979V15.6052C20.0979 12.9388 16.9313 13.1407 16.9313 15.6052V20.0417H14.5563V11.3333H16.9313V12.7306C18.0364 10.6834 22.4729 10.5322 22.4729 14.6908V20.0417Z"
                    fill="#ffffff"
                  />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h3 className="footer-cards-title-time">
              {t.footer.workTime.title}
            </h3>
            <p className="footer-cards-works-text">
              {t.footer.workTime.schedule}
            </p>
          </div>
        </div>
        <div className="footer-button-cards">
          <h3 className="footer-cards-title-button">
            {t.footer.address.title}
          </h3>
          <a
            href="#"
            className="footer-cards-adres"
            dangerouslySetInnerHTML={{
              __html: t.footer.address.text.replace(/\n/g, "<br />"),
            }}
          />
        </div>
        <p className="footer-cards-button">{formatText(t.footer.copyright)}</p>

        <div className="footer-box-imgs">
          <Image
            className="footer-cards-img"
            src="/img/footer.png"
            alt="footer"
            width={852}
            height={684}
            loading="lazy"
          />
        </div>
      </div>
    </footer>
  );
}
