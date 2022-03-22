import styles from './recursive.module.css'

export function Recursive({ number = 1 }) {
   const paddingLeft = `${number * 4}px`

   return (
      <div className="" style={{ paddingLeft }}>
         Component number: {number}
         {number < 10 &&
            <Recursive number={number + 1} />
         }
      </div>
   )
}
