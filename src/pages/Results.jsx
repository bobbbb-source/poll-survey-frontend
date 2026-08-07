import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import ResultChart from "../components/ResultChart";
import pollService from "../services/pollService";
import {
    startConnection,
    joinPoll,
    stopConnection
} from "../services/signalrService";

export default function Results() {
    const { code } = useParams();

    const creatorToken =
        localStorage.getItem(`creatorToken_${code}`);

    const isCreator = Boolean(creatorToken);

    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(true);
    const [closing, setClosing] = useState(false);
    const [isClosed, setIsClosed] = useState(false);

    useEffect(() => {
        const initialisePage = async () => {
            await loadResults();

            try {
                await startConnection((updatedResults) => {
                    setResults(updatedResults);
                });

                await joinPoll(code);
            } catch (error) {
                console.error(
                    "SignalR connection failed:",
                    error
                );
            }
        };

        initialisePage();

        return () => {
            stopConnection();
        };
    }, [code]);

    const loadResults = async () => {
        try {
            const response =
                await pollService.getResults(code);

            setResults(response.data);
        } catch (error) {
            console.error(error);
            alert("Unable to load results.");
        } finally {
            setLoading(false);
        }
    };

    const closePoll = async () => {
        if (!creatorToken) {
            alert("Only the poll creator can close this poll.");
            return;
        }

        const confirmed = window.confirm(
            "Are you sure you want to close this poll? No more votes will be accepted."
        );

        if (!confirmed) {
            return;
        }

        setClosing(true);

        try {
            await pollService.closePoll(
                code,
                creatorToken
            );

            setIsClosed(true);

            alert("Poll closed successfully.");
        } catch (error) {
            console.error(error);

            const message = error.response?.data;

            if (typeof message === "string") {
                alert(message);
            } else {
                alert("Unable to close poll.");
            }
        } finally {
            setClosing(false);
        }
    };

    if (loading) {
        return (
            <h3 className="text-center mt-5">
                Loading results...
            </h3>
        );
    }

    if (!results) {
        return (
            <h3 className="text-center mt-5">
                Results not found.
            </h3>
        );
    }

    return (
        <>
            <Navbar />

            <div className="container mt-5">
                <div className="card shadow">
                    <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h2>Poll Results</h2>

                            {isCreator && (
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={closePoll}
                                    disabled={
                                        closing ||
                                        isClosed
                                    }
                                >
                                    {isClosed
                                        ? "Poll Closed"
                                        : closing
                                            ? "Closing..."
                                            : "Close Poll"}
                                </button>
                            )}
                        </div>

                        {isClosed && (
                            <div className="alert alert-warning">
                                This poll is closed. No more votes can be submitted.
                            </div>
                        )}

                        <ResultChart
                            results={results}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}  