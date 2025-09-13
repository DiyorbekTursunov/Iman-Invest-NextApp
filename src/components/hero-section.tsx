"use client";

import { useLanguage } from "@/hooks/use-language";
import Image from "next/image";

export function HeroSection() {
  const { t } = useLanguage();

  // Format text with line breaks
  const formatText = (text: string) => {
    return text.split("\n").map((line, index) => (
      <span key={index}>
        {line}
        {index < text.split("\n").length - 1 && <br />}
      </span>
    ));
  };

  return (
    <section className="hero">
      <div className="haro__container">
        <div className="hero__info">
          <h1 className="hero__title">{t.hero.title}</h1>
          <p className="hero__text">{formatText(t.hero.text)}</p>
          {/* <Image
            src="/img/signature.avif"
            alt="signature"
            width={363}
            height={111}
            loading="lazy"
            className="hero__signature"
          /> */}
          <div className="hero__name">
            <h3 className="hero__name-title">{t.hero.signature.name}</h3>
            <p className="hero__name-text">{t.hero.signature.position}</p>
          </div>
        </div>
        <Image
          src="/img/hero.avif"
          alt="hero"
          className="hero__img"
          width={900}
          height={900}
          loading="lazy"
        />

        <Image
          src="/img/shape.avif"
          alt="hero"
          className="hero__shape"
          width={900}
          height={900}
          loading="lazy"
        />
        <div className="hero_bottom">
          {/* <Image
            src="/img/heroMob.avif"
            alt="Hero"
            width={459}
            height={418}
            className="hero__mob-img"
          /> */}
          <div className="hero__mob-bottom">
            {/* <Image
            src="/img/signature.avif"
            alt="signature"
            width={166}
            height={51}
            loading="lazy"
            className="hero__mob-bottom-img"
          /> */}
            <div className="hero__mob-info">
              <h3 className="hero__mob-bottom-title">
                {t.hero.signature.name.split(" ").map((name, index) => (
                  <span key={index}>
                    {name}
                    {index === 0 && <br />}
                    {index > 0 &&
                      index < t.hero.signature.name.split(" ").length - 1 &&
                      " "}
                  </span>
                ))}
              </h3>
              <p className="hero__mob-bottom-text">{t.hero.signature.position}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
