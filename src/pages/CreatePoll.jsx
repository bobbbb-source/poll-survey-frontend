import { useState } from "react";
import Navbar from "../components/Navbar";
import pollService from "../services/pollService";

export default function CreatePoll() {
    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState(["", ""]);
    const [loading, setLoading] = useState(false);
    const addOption = () => {
        if (options.length >= 6)
            return;

        setOptions([
            ...options,
            ""
        ]);
    };

    const updateOption = (index, value) => {
        const temp = [...options];
        temp[index] = value;
        setOptions(temp);
    };

    const removeOption = (index) => {
        if (options.length <= 2)
            return;

        setOptions(options.filter((_, i) => i !== index));
    };

    const createPoll = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const response = await pollService.createPoll({
                question,
                options
            });

            localStorage.setItem(
                `creatorToken_${response.data.code}`,
                response.data.creatorToken
            );

            const pollLink = `${window.location.origin}/poll/${response.data.code}`;

            await navigator.clipboard.writeText(pollLink);

            alert(
                `Poll Created Successfully!
                Share Link:
                ${pollLink}
                (The link has been copied to your clipboard.)`);
        }

        catch {
            alert("Failed to create poll.");
        }

        finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <div className="card shadow">
                    <div className="card-body">
                        <h2>Create Poll</h2>

                        <form onSubmit={createPoll}>
                            <div className="mb-3">
                                <label className="form-label">
                                    Question
                                </label>

                                <input
                                    className="form-control"
                                    value={question}
                                    onChange={(e) =>
                                        setQuestion(e.target.value)
                                    }
                                    required
                                />
                            </div>

                            <h5>Options</h5>
                            {
                                options.map((option, index) => (
                                    <div
                                        className="input-group mb-2"
                                        key={index}
                                    >
                                        <input
                                            className="form-control"
                                            value={option}
                                            onChange={(e) =>
                                                updateOption(
                                                    index,
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />

                                        {
                                            options.length > 2 && (
                                                <button
                                                    type="button"
                                                    className="btn btn-danger"
                                                    onClick={() =>
                                                        removeOption(index)
                                                    }
                                                >
                                                    Remove
                                                </button>
                                            )
                                        }
                                    </div>
                                ))
                            }
                            {
                                options.length < 6 && (
                                    <button
                                        type="button"
                                        className="btn btn-secondary mt-2"
                                        onClick={addOption}
                                    >
                                        Add Option
                                    </button>
                                )
                            }
                            <hr />

                            <button
                                className="btn btn-primary"
                                disabled={loading}
                            >
                                {
                                    loading
                                        ? "Creating..."
                                        : "Create Poll"
                                }
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}