import React, { memo } from 'react'
import { SliderContainer } from './style'
import SwiperCore, { Pagination, Autoplay } from 'swiper'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/swiper-bundle.min.css'

SwiperCore.use([Pagination, Autoplay]);

export default memo(function Slider(props) {
  const { bannerList } = props;

  // useEffect 异步
  // useEffect(() => {
  //   if (bannerList.length && !sliderSwiper) {
  //     let newSliderSwiper = new Swiper(".slider-container", {
  //       loop: true,
  //       autoplay: true,
  //       disableOnInteraction: false, // 触碰后不会停止自动切换
  //       pagination: {el: '.swiper-pagination'},
  //     });
  //     setSliderSwiper(newSliderSwiper);
  //   }
  // }, [bannerList.length, sliderSwiper]);

  return (
    <SliderContainer>
      <div className="before"></div>
      <Swiper
        slidesPerView={1} //同屏显示多少个swiper滑块
        initialSlide={1} //默认展示第几个滑块
        loop={true} //是否开启无限轮播
        pagination={{ clickable: true }} //开启分页器操作
        observer={true} //修改swiper自己或子元素时，自动初始化swiper(如果数据是请求下来的一定要重新初始化)
        observeParents={true} //修改swiper的父元素时，自动初始化swiper(如果数据是请求下来的一定要重新初始化)
        autoplay={true} //自动轮播开启
        className="slider-container"
      >
        {
          bannerList.map((item,index)=> {
            return (
              <SwiperSlide key={index}>
                <img  src={item.imageUrl} width="100%" height="100%" alt="推荐" />
              </SwiperSlide>
            )
          })
        }
      </Swiper>
    </SliderContainer>
  )
})
