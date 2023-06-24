import { useEffect, useState } from 'react';
import { Room } from '../../models/Room';
import { useRoomStore } from '../../stores/RoomStore';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { GameResultsDTO } from './DTOs/GameResultsDTO';
import { GameState } from '../../models/GameState';

// let connection: HubConnection | null = null;

const useGameHubConnection = () => {

    const { setRoom, setIsHubConnected, setPlayersTurnId, setWinnersId, setGameState, gameId, playerId } = useRoomStore();
    const [connection, setConnection] = useState<HubConnection | null>(null);


    useEffect(() => {
        console.log("useGameHubConnection");
        const newConnection = new HubConnectionBuilder()
            .withUrl(`${import.meta.env.VITE_APP_DEV_URL}/gamehub`)
            .withAutomaticReconnect()
            .build();
        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (connection) {
            connection
                .start()
                .then(() => { console.log('Connection started!'); setIsHubConnected(true) })
                .catch((err) => console.log('Error establishing connection: ', err));
        }

        connection?.on('NotifynewPlayer', (updatedRoom: Room) => {
            setRoom(updatedRoom);
            console.log("newPlayer: ", updatedRoom);
        });

        connection?.on('NotifyStartGame', (updatedRoom: Room) => {
            setRoom(updatedRoom);
            setGameState(GameState.PLAYING);
            setPlayersTurnId(updatedRoom.currentPlayer.playerId);
        });

        connection?.on('NotifyCardDrawn', (updatedRoom: Room) => {
            setRoom(updatedRoom);
        });

        connection?.on('NotifyNextTurn', (updatedRoom: Room) => {
            setRoom(updatedRoom);
            setPlayersTurnId(updatedRoom.currentPlayer.playerId)
        });

        connection?.on('NotifyFinishRound', (gameResultsDTO: GameResultsDTO) => {
            setRoom(gameResultsDTO.game);
            setWinnersId(gameResultsDTO.winnersId);
            setGameState(GameState.AFTER_GAME);
            setPlayersTurnId("finish")
        });

        connection?.on('NotifyPlayerExitGame', (updatedRoom: Room) => {
            setRoom(updatedRoom);
        });

        connection?.on('NotifyNewRound', (updatedRoom: Room) => {
            setRoom(updatedRoom);
            setGameState(GameState.PLAYING);
            setWinnersId(null);
            setPlayersTurnId(updatedRoom.currentPlayer.playerId)
        });


        return () => {
            connection?.off('JoinGame');
            connection?.off('UpdateCards');
        };
    }, [connection]);





    const JoinGame = async () => {
        await connection?.invoke('JoinGame', gameId);
    };

    const startGame = async () => {
        await connection?.invoke('ReciveStartGame', gameId);
    };

    const playerDrawCard = async () => {
        await connection?.invoke('ReciveCardDrawn', gameId, playerId);
    };

    const nextTurn = async () => {
        await connection?.invoke('ReciveNextTurn', gameId);
    };

    const FinishRound = async () => {
        await connection?.invoke('ReciveFinishRound', gameId);
    };

    const playAnotherRound = async () => {
        await connection?.invoke('RecivePlayAnotherRound', gameId);
    };

    const PlayerExitGame = async () => {
        setRoom(null);
        setGameState(GameState.BEFORE_GAME);
        setWinnersId(null);
        setPlayersTurnId("")
        sessionStorage.clear()
        await connection?.invoke('RecivePlayerExitGame', gameId, playerId);
    };

    return {
        JoinGame,
        startGame,
        playerDrawCard,
        nextTurn,
        FinishRound,
        playAnotherRound,
        PlayerExitGame
    };

};


export default useGameHubConnection;
