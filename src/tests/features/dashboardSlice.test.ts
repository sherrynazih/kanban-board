import { Card } from '../../features/card/cardSlice';
import reducers, { dashboardSlice } from '../../features/dashboard/dashboardSlice';

describe('dashboard reducer', () => {

    beforeAll(() => {

    });

    it('initial state set correctly', () => {
        expect(reducers(undefined, { type: '' })).toEqual({ cards: [] });
    });

    describe('add card action', () => {
        const cards = [
            {
                id: 1,
                title: "Card Title 1",
                description: "Card Description 1",
                assignedTo: "Sherry Younan",
                status: {
                    name: "To Do",
                    color: "#f59e0b",
                },
            },
            {
                id: 2,
                title: "Card Title 2",
                description: "Card Description 2",
                assignedTo: "Sherry Younan",
                status: {
                    name: "To Do",
                    color: "#f59e0b",
                },
            }
        ]
        const newCard: Card = {
            id: 123,
            title: "New Card Title",
            description: "New Card Description",
            assignedTo: "Sherry Younan",
            status: {
                name: "To Do",
                color: "#f59e0b",
            },
        }

        const state = {cards: cards};
        const action = dashboardSlice.actions.addCard(newCard);
        it('runs correctly', () => {
            expect(reducers(state, action)).toEqual({ cards: [...cards, newCard] });
        })
        it('new cards length', () => {
            expect(reducers(state, action).cards).toHaveLength(3);
        })
        it('new card included', () => {
            expect(reducers(state, action).cards).toContainEqual(newCard);
        })
        it('new card included in the correct index', () => {
            expect(reducers(state, action).cards[2]).toEqual(newCard);
        })
        it('new card has correct data', () => {
            expect(reducers(state, action).cards[2].id).toEqual(123);
            expect(reducers(state, action).cards[2].title).toEqual("New Card Title");
            expect(reducers(state, action).cards[2].description).toEqual("New Card Description");
            expect(reducers(state, action).cards[2].assignedTo).toEqual("Sherry Younan");
            expect(reducers(state, action).cards[2].status).toEqual({
                name: "To Do",
                color: "#f59e0b",
            });
        })
    });

    describe('delete card action', () => {
        const cards = [
            {
                id: 1,
                title: "Card Title 1",
                description: "Card Description 1",
                assignedTo: "Sherry Younan",
                status: {
                    name: "To Do",
                    color: "#f59e0b",
                },
            },
            {
                id: 2,
                title: "Card Title 2",
                description: "Card Description 2",
                assignedTo: "Sherry Younan",
                status: {
                    name: "To Do",
                    color: "#f59e0b",
                },
            }
        ]

        const state = {cards: cards};
        const action = dashboardSlice.actions.deleteCard({id: 2});
        it('runs correctly', () => {
            expect(reducers(state, action)).toEqual({ cards: cards.filter(x => x.id !== 2) });
        })
        it('new cards length', () => {
            expect(reducers(state, action).cards).toHaveLength(1);
        })
    });

    describe('edit card action', () => {
        const cards = [
            {
                id: 1,
                title: "Card Title 1",
                description: "Card Description 1",
                assignedTo: "Sherry Younan",
                status: {
                    name: "To Do",
                    color: "#f59e0b",
                },
            },
            {
                id: 2,
                title: "Card Title 2",
                description: "Card Description 2",
                assignedTo: "Sherry Younan",
                status: {
                    name: "To Do",
                    color: "#f59e0b",
                },
            }
        ]

        const editedCard: Card = {
            id: 1,
            title: "Card Title 1 - edited",
            description: "Card Description 1",
            assignedTo: "Sherry Younan",
            status: {
                name: "To Do",
                color: "#f59e0b",
            },
        }

        const state = {cards: cards};
        const action = dashboardSlice.actions.editCard(editedCard);

        it('runs correctly', () => {
            expect(reducers(state, action).cards[0]).toEqual(editedCard);
        })
        it('new cards length', () => {
            expect(reducers(state, action).cards).toHaveLength(2);
        })
        it('edited card has correct data', () => {
            expect(reducers(state, action).cards[0].id).toEqual(1);
            expect(reducers(state, action).cards[0].title).toEqual("Card Title 1 - edited");
            expect(reducers(state, action).cards[0].description).toEqual("Card Description 1");
            expect(reducers(state, action).cards[0].assignedTo).toEqual("Sherry Younan");
            expect(reducers(state, action).cards[0].status).toEqual({
                name: "To Do",
                color: "#f59e0b",
            });
        })
    });

    describe('update card user action', () => {
        const cards = [
            {
                id: 1,
                title: "Card Title 1",
                description: "Card Description 1",
                assignedTo: "Sherry Younan",
                status: {
                    name: "To Do",
                    color: "#f59e0b",
                },
            },
            {
                id: 2,
                title: "Card Title 2",
                description: "Card Description 2",
                assignedTo: "Sherry Younan",
                status: {
                    name: "To Do",
                    color: "#f59e0b",
                },
            }
        ]

        const state = {cards: cards};
        const action = dashboardSlice.actions.updateCardUser({id: 1, newUser: "John Tadros"});

        it('runs correctly', () => {
            expect(reducers(state, action).cards.find(x => x.id === 1)?.assignedTo).toEqual("John Tadros");
        })
        it('new cards length', () => {
            expect(reducers(state, action).cards).toHaveLength(2);
        })
    });

    describe('update card status action', () => {
        const cards = [
            {
                id: 1,
                title: "Card Title 1",
                description: "Card Description 1",
                assignedTo: "Sherry Younan",
                status: {
                    name: "To Do",
                    color: "#f59e0b",
                },
            },
            {
                id: 2,
                title: "Card Title 2",
                description: "Card Description 2",
                assignedTo: "Sherry Younan",
                status: {
                    name: "To Do",
                    color: "#f59e0b",
                },
            }
        ]

        const state = {cards: cards};
        const action = dashboardSlice.actions.updateCardStatus({id: 1, newStatus: {
            name: "In Progress",
            color: "#4f46e5",
        }});

        it('runs correctly', () => {
            expect(reducers(state, action).cards.find(x => x.id === 1)?.status).toEqual({
                name: "In Progress",
                color: "#4f46e5",
            });
        })
        it('new cards length', () => {
            expect(reducers(state, action).cards).toHaveLength(2);
        })
    });
});
