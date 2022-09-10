import { Stage, Sprite, PixiComponent, useTick } from '@inlet/react-pixi'
import * as PIXI3D from 'pixi3d'
import {useState} from 'react'

// cobbled together based on...
// https://api.pixi3d.org/index.html
// https://reactpixi.org/custom-components

// we create a react-pixi custom component to wrap the pxi3d objects
const Cube = PixiComponent('Cube', {
  // and simply modify the example in the pixi3d api link inside create
  create: props => {
    // instantiate something and return it.
    // for instance:
    const {rotY} = props

    const cube = new PIXI3D.Mesh3D.createCube()
    cube.rotationQuaternion.setEulerAngles(0,rotY, 0)

    // we should be able to wrap this in a custom component also... but not a react-pixi one i think
    PIXI3D.LightingEnvironment.main.lights.push(
      Object.assign(new PIXI3D.Light(), { 
        type: "point", 
        intensity: 10, 
        range: 5, 
        x: 1, 
        y: 0, 
        z: 3,
      }
    ))
    PIXI3D.LightingEnvironment.main.lights.push(
      Object.assign(new PIXI3D.Light(), { 
        type: "point", 
        intensity: 6, 
        range: 5, 
        x: -2, 
        y: 0, 
        z: 3,
        // color: new PIXI3D.Color(6, 6, 12),
      }
    ))

    return cube
  },
  didMount: (instance, parent) => {
    // apply custom logic on mount
  },
  willUnmount: (instance, parent) => {
    // clean up before removal
  },
  applyProps: (instance, oldProps, newProps) => {
    // props changed
    // apply logic to the instance
    const {rotY} = newProps
    instance.rotationQuaternion.setEulerAngles(0,rotY, 0)
  },
  config: {
    // destroy instance on unmount?
    // default true
    destroy: true,
    /// destroy its children on unmount?
    // default true
    destroyChildren: true,
  },
})

// One can only use useTick in a component that only returns the thing to be animated... which is unfortunate
const SpinningCube = () => {
  const [itemRotation, setItemRotation] = useState(0);
  useTick(delta => {
    setItemRotation(itemRotation + 1) 
  })

  return (
    <Cube rotY={itemRotation} />
  )
}

const App = () => {
  return (
    <Stage>
      <Sprite image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png" x={220} y={200} scale={2} />
      <SpinningCube />
      <Sprite image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png" x={400} y={200} />
    </Stage>
  )
}

export default App;
