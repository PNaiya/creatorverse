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
        <main
            className="container"
            style={{
                maxWidth: "1100px",
                margin: "0 auto",
                padding: "0 1rem"
            }}
        >
            <header
                style={{
                    textAlign: "center",
                    padding: "2rem 0",
                    borderBottom: "1px solid #eee",
                    marginBottom: "2rem"
                }}
            >
                <h1 style={{ margin: 0, fontSize: "2.5rem" }}>Creatorverse</h1>
                <p style={{ marginTop: "0.5rem", color: "#666" }}>
                    Your curated universe of digital creators
                </p>

                <nav style={{ marginTop: "1rem" }}>
                    <Link to="/" style={{ marginRight: "1rem" }}>Home</Link>
                    <Link to="/creators/new">Add Creator</Link>
                </nav>
            </header>

            {routes}
        </main>
    );
}

export default App;