import Peer from "simple-peer";
import {Socket} from "socket.io-client";

/**
 * @typedef RemotePeer
 * @property {string} id
 * @property {Peer} peer
 * @property {Object} answer
 * @property {MediaStream} videoStream
 * @property {HTMLVideoElement} videoElement
 */

/**
 * @typedef LocalPeer
 * @property {string} id
 * @property {Peer} peer
 */

/**
 * @typedef AppState
 * @property {string} meeting_id
 * @property {Socket} socket
 * @property {string} server_id
 * @property {boolean} server_connected
 * @property {MediaStream} user_video_stream
 * @property {HTMLVideoElement} user_video_element
 * @property {LocalPeer[]} local_peers
 * @property {RemotePeer[]} remote_peers
 * @property {boolean} sharing_screen
 * @description State for the app
 */