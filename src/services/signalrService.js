import * as signalR from "@microsoft/signalr";

let connection = null;

export async function startConnection(onReceiveResults) {
    if (
        connection &&
        connection.state !== signalR.HubConnectionState.Disconnected
    ) {
        return;
    }

    connection = new signalR.HubConnectionBuilder()
        .withUrl("http://localhost:8080/pollhub")
        .withAutomaticReconnect()
        .build();

    connection.on("ReceiveResults", onReceiveResults);

    try {
        await connection.start();
        console.log("SignalR connected.");
    } catch (error) {
        console.error("SignalR connection failed:", error);
        throw error;
    }
}

export async function joinPoll(code) {
    if (
        connection &&
        connection.state === signalR.HubConnectionState.Connected
    ) {
        await connection.invoke("JoinPoll", code.toUpperCase());
    }
}

export async function stopConnection() {
    if (connection) {
        await connection.stop();
        connection = null;
    }
}