import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Home() {
    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <div className="text-center">
                    <h1 className="display-4 fw-bold">
                        Poll & Survey Builder
                    </h1>

                    <p className="lead mt-3">
                        Create polls, share links and collect votes in real time.
                    </p>

                    <Link
                        to="/create"
                        className="btn btn-primary btn-lg mt-3"
                    >
                        Create Your First Poll
                    </Link>
                </div>
            </div>
        </>
    );

}