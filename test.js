import { WebSocket, Server } from 'mock-socket';
global.WebSocket = WebSocket;
const url = "ws://whatever/ws"

const mockServer = new Server(url);
mockServer.on('connection', socket => {
    socket.on('message', data => {
        socket.send('test message from mock server');
    });
});

import test from 'ava';

import { Delimited, JSON } from "./serialization";

test('delimited', t => {
    let p = new Delimited()

    let msg = p.serialize({ type: "a", data: "b", id: "c"})
    console.log(msg)
	t.pass();
});

test('bar', async t => {
	const bar = Promise.resolve('bar');
	t.is(await bar, 'bar');
});