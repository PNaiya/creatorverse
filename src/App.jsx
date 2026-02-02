import { useRoutes, Link } from 'react-router-dom';
import ShowCreators from './pages/ShowCreators.jsx';
import ViewCreator from './pages/ViewCreator.jsx';
import AddCreator from './pages/AddCreator.jsx';
import EditCreator from './pages/EditCreator.jsx';

function App() {
    const routes = useRoutes([
        { path: '/', element: <ShowCreators /> },
        { path: '/creators/new', element: <AddCreator /> },
        { path: '/creators/:id', element: <ViewCreator /> },
        { path: '/creators/:id/edit', element: <EditCreator /> },
    ]);

    return (
        <main className="container">
            <header>
                <h1>Creatorverse</h1>
                <nav>
                    <Link to="/">Home</Link>{' '}
                    <Link to="/creators/new">Add Creator</Link>
                </nav>
            </header>

            {routes}
        </main>
    );
}

export default App;