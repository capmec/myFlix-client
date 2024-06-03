import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'

//Import statement to indicate that you need to bundle the CSS file `./indexscss` into the final bundle
import { MainView } from './components/main-view/main-view'
import { Container } from 'react-bootstrap'
import './index.scss'

const Bflix = () => {
  return (
    <Container>
      <MainView />
    </Container>
  )
}

//Finds the root of your app
const container = document.querySelector('#root')
const root = createRoot(container)

//Tells react to render your app in the root DOM element
root.render(<Bflix />)
