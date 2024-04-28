import { createRoot } from 'react-dom/client';

//Import statement to indicate that you need to bundle the CSS file `./index.sccs` into the final bundle
import './index.scss';

//Main component (will eventually use all the others)
const MyFlixApplication = () => {
	return (
		<div className='my-flix'>
			<div>Good Morning </div>
		</div>
	);
};

//Finds the root of your app
const container = document.querySelector('#root');
const root = createRoot(container);

//Tells react to render your app in the root DOM element
root.render(<MyFlixApplication />);
