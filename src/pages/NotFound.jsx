import Navbar from "../components/Navbar";

export default function NotFound() {
    return (
        <>
            <Navbar />
            <div className="container mt-5 text-center">
                <h1>404</h1>
                <p>Page Not Found</p>
            </div>
        </>
    );
}