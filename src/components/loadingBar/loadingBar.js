import React from 'react'
import { useIsFetching, useIsMutating } from 'react-query'
import { Transition, animated } from 'react-spring'
import styles from './loadingBar.module.css'

export default function LoadingBar() {
   const isFetching = useIsFetching()
   const isMutating = useIsMutating()

   return (
      <Transition
         items={!!isFetching || !!isMutating}
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
