import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import pollService from "../services/pollService";

export default function VotePoll() {
    const { code } = useParams();
    const navigate = useNavigate();

    const [poll, setPoll] = useState(null);
    const [selectedOptionId, setSelectedOptionId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        loadPoll();
    }, [code]);

    const loadPoll = async () => {
        try {
            const response = await pollService.getPoll(code);
            setPoll(response.data);
        } catch (error) {
            console.error(error);
            alert("Poll not found, closed, or expired.");
        } finally {
            setLoading(false);
        }
    };

    const getVoterToken = () => {
        const storageKey = `poll-voter-${code}`;

        let voterToken = localStorage.getItem(storageKey);

        if (!voterToken) {
            voterToken = crypto.randomUUID();
            localStorage.setItem(storageKey, voterToken);
        }

        return voterToken;
    };

    const submitVote = async () => {
        if (selectedOptionId === null) {
            alert("Please choose an option.");
            return;
        }

        setSubmitting(true);

        try {
            await pollService.vote(
                code,
                selectedOptionId,
                getVoterToken()
            );

            navigate(`/results/${code}`, {
                state: {
                    voted: true
                }
            });
        } catch (error) {
            console.error(error);

            const responseData = error.response?.data;

            if (typeof responseData === "string") {
                alert(responseData);
            } else {
                alert("Unable to submit vote.");
            }
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <h3 className="text-center mt-5">
                Loading...
            </h3>
        );
    }

    if (!poll) {
        return (
            <h3 className="text-center mt-5">
                Poll not found.
            </h3>
        );
    }

    return (
        <>
            <Navbar />

            <div className="container mt-5">
                <div className="card shadow">
                    <div className="card-body">
                        <h2>{poll.question}</h2>

                        <hr />

                        {poll.options.map((option) => (
                            <div
                                className="form-check mb-3"
                                key={option.id}
                            >
                                <input
                                    id={`option-${option.id}`}
                                    type="radio"
                                    className="form-check-input"
                                    name="vote"
                                    checked={
                                        selectedOptionId === option.id
                                    }
                                    onChange={() =>
                                        setSelectedOptionId(option.id)
                                    }
                                />

                                <label
                                    className="form-check-label"
                                    htmlFor={`option-${option.id}`}
                                >
                                    {option.text}
                                </label>
                            </div>
                        ))}

                        <button
                            type="button"
                            className="btn btn-success"
                            onClick={submitVote}
                            disabled={submitting}
                        >
                            {submitting
                                ? "Submitting..."
                                : "Submit Vote"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}