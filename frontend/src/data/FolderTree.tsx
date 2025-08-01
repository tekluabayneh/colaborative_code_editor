import {Node } from "../types/Node"
const generateId = () => crypto.randomUUID(); 
export const fileTree: Node[] = [
    {
        
        folderid:generateId(),
        name: 'Home',
        nodes: [
            {
                folderid:generateId(),
                name: 'Movies',
                nodes: [
                    {
                        folderid:generateId(),
                        name: 'Action',
                        nodes: [
                            {
                                folderid:generateId(),
                                name: '2000s',
                                nodes: [
                                    { name: 'Gladiator.mp4' },
                                    { name: 'The-Dark-Knight.mp4' },
                                ],
                            },
                            {

                                folderid:generateId(),
                                name: '2010s', nodes: [] },
                        ],
                    },
                    {
                        folderid:generateId(),
                        name: 'Comedy',
                        nodes: [{ name: '2000s', nodes: [{ name: 'Superbad.mp4' }] }],
                    },
                    {
                        folderid:generateId(),
                        name: 'Drama',
                        nodes: [
                            {
                                folderid:generateId(),
                                name: '2000s', nodes: [{ name: 'American-Beauty.mp4' }] },
                        ],
                    },
                ],
            },
            {
                folderid:generateId(),
                name: 'Music',
                nodes: [
                    {
                        folderid:generateId(),
                        name: 'Rock', nodes: [] },
                    {
                        folderid:generateId(),
                        name: 'Classical', nodes: [] },
                ],
            },
            { 

                folderid:generateId(),
                name: 'Pictures', nodes: [] },
            {
                folderid:generateId(),
                name: 'Documents',
                nodes: [],
            },
            { name: 'passwords.txt' },
        ],
    },
];
