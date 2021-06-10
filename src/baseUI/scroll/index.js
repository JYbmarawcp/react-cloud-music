import React, { forwardRef, useState, useEffect, useRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

import BScroll from "@better-scroll/core"
import styled from 'styled-components'

const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const Scroll = forwardRef((props, ref) => {
  const [bScroll, setBScroll] = useState();

  const scrollContaninerRef = useRef();

  const { pullUp, pullDown, onScroll } = props;

  useEffect(() => {
    const scroll = new BScroll(scrollContaninerRef.current, {
      probeType: 3,
      click: true
    })
    setBScroll(scroll);
    return () => {
      setBScroll(null);
    }
  }, []);

  // 给实例绑定 scroll 事件
  useEffect(() => {
    if (!bScroll || !onScroll) return;
    bScroll.on('scroll', (scroll) => {
      onScroll(scroll);
    })
    return () => {
      bScroll.off('scroll');
    }
  }, [onScroll, bScroll]);

  // 每次重新渲染都要刷新实例，防止无法滑动
  useEffect(() => {
    if (bScroll) {
      bScroll.refresh();
    }
  });

  useImperativeHandle(ref, () => ({
    refresh() {
      if (bScroll) {
        bScroll.refresh();
        bScroll.scrollTo(0, 0);
      }
    },
    getBScroll() {
      if (bScroll) {
        return bScroll
      }
    }
  }));

  return (
    <ScrollContainer ref={scrollContaninerRef}>
      {props.children}
    </ScrollContainer>
  )
})

Scroll.PropTypes = {
  onScroll: PropTypes.func
}

export default Scroll;