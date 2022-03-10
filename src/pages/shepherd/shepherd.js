import styles from './shepherd.module.css'
import { useContext, useState } from 'react'
import { FcSlrBackSide } from 'react-icons/fc'
import { ShepherdTour, ShepherdTourContext } from 'react-shepherd'
import 'shepherd.js/dist/css/shepherd.css'
import './shepherd.css'

const tourOptions = {
   defaultStepOptions: {
      cancelIcon: {
         enabled: true
      },
      classes: 'shepherdStep',
      popperOptions: {
         modifiers: [{
            name: 'offset',
            options: {
               offset: [0, 20]
            }
         }]
      }
   },
   useModalOverlay: true
}

const stepButtons = [{
   classes: 'shepherdButtonCancel',
   text: 'Exit',
   type: 'cancel'
}, {
   classes: 'shepherdButtonBack',
   text: 'Back',
   type: 'back'
}, {
   classes: 'shepherdButtonNext',
   text: 'Next',
   type: 'next'
}]

const steps = [{
   arrow: true,
   attachTo: {
      element: '#shepherdStep1',
      on: 'right'
   },
   buttons: stepButtons,
   text: [<StepBody text="Step 1 text body rendered with react component" />],
   title: 'Step 1 title'
}, {
   arrow: true,
   attachTo: {
      element: '#shepherdStep2',
      on: 'left'
   },
   buttons: stepButtons,
   text: `
      <div style="border: 2px solid red; padding: 4px;">
         Back to the 90's
      </div>
   `,
   title: 'Step 2 title'
}, {
   arrow: true,
   id: 'stepLast',
   text: 'This is the last step floating in the middle.',
   title: 'Tour end'
}]

const stepsAlt = [{
   arrow: true,
   attachTo: {
      element: '#shepherdStep3',
      on: 'bottom'
   },
   buttons: stepButtons,
   text: 'Alternative tour step 1',
   title: 'Step 1 title'
}, {
   arrow: true,
   attachTo: {
      element: '#shepherdStep4',
      on: 'top'
   },
   buttons: stepButtons,
   text: 'Alternative tour step 2',
   title: 'Step 2 title'
}]

const stepsReference = {
   steps1: steps,
   steps2: stepsAlt
}

function StepBody(text) {
   return (
      <div className="">
         {text}
      </div>
   )
}

export default function Shepherd() {
   const [steps, setSteps] = useState('steps1')

   return (
      <>
         <div className="">
            <button className="" onClick={() => setSteps('steps1')}>
               Steps 1
            </button>
            <button className="" onClick={() => setSteps('steps2')}>
               Steps 2
            </button>
            On: {steps}
         </div>
         <div className={styles.gridContainer}>
            <div className="" id="shepherdStep1">
               Cell 1 div
            </div>
            <span className="" id="shepherdStep4">
               Cell 2 span
            </span>
            <button className="" id="shepherdStep3">
               Cell 3 button
            </button>
            <FcSlrBackSide className={styles.iconSlr} id="shepherdStep2" />
         </div>
         <ShepherdTour
            tourOptions={tourOptions}
            steps={stepsReference[steps]}
         >
            <StartTour />
         </ShepherdTour>
      </>
   )
}

function StartTour() {
   const tour = useContext(ShepherdTourContext)

   return (
      <div className="">
         <button onClick={tour.start}>
            start tour
         </button>
      </div>
   )
}
