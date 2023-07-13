import React from "react";
import { Title } from "~/components/title/title.component";
import { Container, StyledLink, SwiperContainer } from "./home.styled";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from 'swiper/react';

export const HomeView: React.FC = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Container>
      <Title title={t('title')} />
      <StyledLink to='/products'>{t('products')}</StyledLink>
      <div>
        <StyledLink to={`/?lng=en`}>English 🇬🇧</StyledLink>
        <StyledLink to={`/?lng=pl`}>Polski 🇵🇱</StyledLink>
      </div>
      <SwiperContainer>
        <Swiper style={{ height: '100%' }} slidesPerView={1}>
          {[1,2,3,4,5].map((index: number): JSX.Element => (
            <SwiperSlide key={index}>
              <img src={`./assets/bg-${index}.jpg`} alt={`bg-${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
            </SwiperSlide>
          ))}
        </Swiper>
      </SwiperContainer>
    </Container>
  )
}