import test from 'ava';
import { Server } from 'mock-socket';


class ChatApp {
    messages: any[];
    connection: WebSocket;

    constructor(url: any) {
        this.messages = [];
        this.connection = new WebSocket(url);

        this.connection.onmessage = (event: any) => {
            this.messages.push(event.data);
        };
    }

    sendMessage(message: string) {
        this.connection.send(message);
    }
}

test.cb('that chat app can be mocked', (t: any) => {
    const fakeURL = 'ws://localhost:8080';
    const mockServer = new Server(fakeURL);

    mockServer.on('connection', socket => {
        socket.on('message', data => {
            t.is(data, 'test message from app', 'we have intercepted the message and can assert on it');
            socket.send('test message from mock server');
        });
    });

    const app = new ChatApp(fakeURL);
    app.sendMessage('test message from app'); // NOTE: this line creates a micro task

    // NOTE: this timeout is for creating another micro task that will happen after the above one
    setTimeout(() => {
        t.is(app.messages.length, 1);
        t.is(app.messages[0], 'test message from mock server', 'we have subbed our websocket backend');
        mockServer.stop(t.done);
    }, 100);
});