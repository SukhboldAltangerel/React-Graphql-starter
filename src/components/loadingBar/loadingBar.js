import React from 'react'
import { useIsFetching } from 'react-query'
import { Transition, animated } from 'react-spring'
import styles from './loadingBar.module.css'

export default function LoadingBar() {
   const isFetching = useIsFetching()

   return (
      <Transition
         items={!!isFetching}
         from={{ opacity: 0 }}
         enter={{ opacity: 1 }}
         leave={{ opacity: 0 }}
      >
         {(anims, item) => item &&
            <animated.div className={styles.loadingBar} styles={anims} />
         }
      </Transition>

   )
}
